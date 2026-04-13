import { NextResponse } from 'next/server';
import { fetchGitHubData } from '../../../services/githubService';
import { analyzeDeveloperData } from '../../../services/analysisEngine';
import { generateAIInsight } from '../../../services/aiInsightService';

export async function POST(request) {
  try {
    const { username } = await request.json();

    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }

    // 1. Collect Data
    const githubData = await fetchGitHubData(username);

    // 2. Analyze Behavior
    const analysisData = await analyzeDeveloperData(githubData);

    // 3. Generate AI Insights
    const aiInsights = await generateAIInsight({ githubData, analysisData });

    // 4. Return Full Profile
    return NextResponse.json({
      githubProfile: githubData.profile,
      heatmap: githubData.heatmap, // Expose for rendering if needed
      analysis: analysisData,
      insights: aiInsights
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message || "Failed to analyze developer" }, { status: 500 });
  }
}
