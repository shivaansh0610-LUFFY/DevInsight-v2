import OpenAI from "openai";

// Lazy initialization to prevent crashing if environment variables aren't loaded yet
let openaiClient = null;

function getOpenAI() {
  if (!openaiClient && process.env.OPENROUTER_API_KEY) {
    openaiClient = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
      defaultHeaders: {
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "DevInsight V2",
      }
    });
  }
  return openaiClient;
}

export async function analyzeDeveloperProfile(profile, repos, languages) {
  // Graceful fallback if no API key is provided
  if (!process.env.OPENROUTER_API_KEY) {
    return {
      authenticityScore: 85,
      authenticityText: "Waiting for OpenRouter API Key. Please add it to .env.local and restart the server.",
      engineeringMaturity: "Unknown"
    };
  }

  // Construct a concise summary of their repos to fit in context efficiently
  const repoSummary = repos.slice(0, 15).map(r => `${r.name} (${r.language || 'unknown'}): ${r.stars} stars. Desc: ${r.description || 'none'}`).join('\n');
  
  // Construct language summary
  const topLanguages = Object.entries(languages)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([lang, count]) => `${lang}: ${count} repos`)
    .join(', ');

  const systemPrompt = `You are an elite Senior Engineering Manager evaluating a developer's GitHub profile. 
Based on their stats, top recent pushed repositories, and language spread, generate an evaluation of their "Authenticity" (real engineering momentum vs just forked/AI generated noise).

Return ONLY a raw JSON object with no markdown formatting or blockquotes:
{
  "authenticityScore": number (0-100, where highly active developers with focused stacks get 85-99),
  "authenticityText": "A 2 sentence punchy evaluation of their organic coding patterns or lack thereof.",
  "engineeringMaturity": "Junior", "Mid-Level", "Senior", or "Staff"
}`;

  const userPrompt = `
Username: ${profile.login}
Public Repos: ${profile.public_repos}
Followers: ${profile.followers}

Top Languages: ${topLanguages}

Recent Repositories:
${repoSummary}
  `;

  try {
    const client = getOpenAI();
    const response = await client.chat.completions.create({
      model: "google/gemini-2.5-flash", // Extremely fast and cheap on OpenRouter, perfect for structured JSON
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      response_format: { type: "json_object" }
    });

    // Clean up the text in case the model returns markdown code blocks
    let resultText = response.choices[0].message.content.trim();
    if (resultText.startsWith("\`\`\`json")) {
        resultText = resultText.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '').trim();
    }
    
    return JSON.parse(resultText);

  } catch (error) {
    console.error("AI Analysis Error:", error);
    return {
      authenticityScore: 70,
      authenticityText: "Failed to analyze profile due to AI service error.",
      engineeringMaturity: "Unknown"
    };
  }
}
