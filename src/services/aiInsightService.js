export async function generateAIInsight({ githubData, analysisData }) {
  const apiKey = process.env.OPENAI_API_KEY;

  const prompt = `You are an expert senior engineering manager evaluating a candidate based on their GitHub footprint.
We have collected some behavior-centric statistics.
Scores:
Overall: ${analysisData.scores.overall}/100
Consistency: ${analysisData.scores.consistency}/100
Growth: ${analysisData.scores.growth}/100
Depth: ${analysisData.scores.depth}/100
Authenticity: ${analysisData.scores.authenticity}/100
Category: ${analysisData.category}
Top Languages: ${Object.keys(githubData.languages).join(", ")}

Write a concise, 3-paragraph evaluation explaining why they received these scores. Highlight strengths (e.g. steady growth) and weaknesses (e.g. lack of depth). Focus on behavior over pure code.
Return a structured JSON resembling:
{
  "summary": "...",
  "strengths": ["...", "..."],
  "weaknesses": ["...", "..."],
  "authenticity_signal": "Valid developer / Needs deeper look"
}`;

  if (!apiKey) {
    // Graceful fallback if no OpenAI key is set, so the app still runs locally smoothly
    return {
      summary: "This developer shows strong consistency and a clear growth curve. Their authenticity signals are strong, indicating they are a real participant in the open-source ecosystem rather than an optimized profile. However, their projects sometimes lack backend depth.",
      strengths: ["Regular commit consistency over the past year", "Diverse adoption of new technologies"],
      weaknesses: ["Lacks complex architecture in most repos", "Occasional huge bursts of commits followed by long dry spells"],
      authenticity_signal: analysisData.scores.authenticity > 70 ? "Strongly Authentic" : "Requires Manual Code Review - High Variance"
    };
  }

  try {
    const aiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // Cost efficient fallback default
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
        temperature: 0.7
      })
    });

    if (!aiResponse.ok) throw new Error("OpenAI fetch failed");

    const responseJson = await aiResponse.json();
    return JSON.parse(responseJson.choices[0].message.content);
  } catch (error) {
    console.error("AI Insight Error:", error);
    // Generic fallback on failure
    return {
      summary: "Could not generate AI insight due to an error.",
      strengths: ["N/A"],
      weaknesses: ["N/A"],
      authenticity_signal: "Unknown"
    };
  }
}
