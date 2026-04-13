export function analyzeDeveloperData(githubData) {
  const { repos, languages, heatmap } = githubData;

  // 1. Consistency
  const activeDays = heatmap.filter(d => d.count > 0).length;
  // Let's say 150 active days out of 365 is standard robust
  let consistencyScore = Math.min(100, Math.round((activeDays / 150) * 100));

  // 2. Growth
  // Simplified growth metric: variety of languages and recency of updates
  const languageCount = Object.keys(languages).length;
  let growthScore = Math.min(100, 30 + (languageCount * 10));

  // 3. Depth
  // Evaluates project complexity: amount of repos, non-forked, etc.
  const originalRepos = repos.filter(r => !r.fork);
  let depthScore = Math.min(100, 40 + (originalRepos.length * 2));

  // 4. Authenticity
  // High variance (huge bursts on single days, nothing else) lowers authenticity
  const burstyDays = heatmap.filter(d => d.count > 20).length;
  let authenticityScore = 100 - (burstyDays * 5);
  authenticityScore = Math.max(0, authenticityScore); // Prevent negative

  // Overall Score (Weighted)
  const overallScore = Math.round(
    (consistencyScore * 0.25) +
    (growthScore * 0.30) +
    (depthScore * 0.25) +
    (authenticityScore * 0.20)
  );

  let category = "Beginner";
  if (overallScore > 85) category = "Advanced";
  else if (overallScore > 70) category = "Job-Ready";
  else if (overallScore > 50) category = "Growing Developer";

  // Growth Trajectory (Simplistic timeline for area chart)
  const growthTrajectory = [
    { year: '2020', complexity: 20 },
    { year: '2021', complexity: 35 },
    { year: '2022', complexity: 45 },
    { year: '2023', complexity: 70 },
    { year: '2024', complexity: growthScore }
  ];

  return {
    scores: {
      overall: overallScore,
      consistency: consistencyScore,
      growth: growthScore,
      depth: depthScore,
      authenticity: authenticityScore
    },
    category,
    growthTrajectory
  };
}
