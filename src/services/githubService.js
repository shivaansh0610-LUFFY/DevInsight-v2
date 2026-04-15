import { analyzeDeveloperProfile } from "./aiService";

export async function fetchGitHubData(username) {
  const token = process.env.GITHUB_TOKEN;
  const headers = token ? { Authorization: `token ${token}` } : {};

  try {
    // Fetch basic profile with 24-hour cache
    const profileRes = await fetch(`https://api.github.com/users/${username}`, { 
      headers,
      next: { revalidate: 86400 } // 24 hours
    });
    if (!profileRes.ok) throw new Error("User not found or API limit reached.");
    const profile = await profileRes.json();

    // Fetch repos (limit to 100 for speed) with 24-hour cache
    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`, { 
      headers,
      next: { revalidate: 86400 } // 24 hours
    });
    let repos = [];
    if (reposRes.ok) {
      repos = await reposRes.json();
    }

    // Process Languages & Complexity roughly
    const languages = {};
    let totalStars = 0;
    repos.forEach((repo) => {
      totalStars += repo.stargazers_count;
      if (repo.language) {
        languages[repo.language] = (languages[repo.language] || 0) + 1;
      }
    });

    // Fetch Real Contribution Heatmap via GraphQL
    let heatmap = await fetchGraphQLData(username, token);
    
    // Fallback to simulation if GraphQL fails or token is missing
    if (!heatmap) {
      heatmap = generateHeatmapActivity(repos);
    }

    // Run the actual AI Analysis from our AI Core
    const aiAnalysis = await analyzeDeveloperProfile(profile, repos, languages);

    return {
      profile,
      repos: repos.map(r => ({
        name: r.name,
        description: r.description,
        language: r.language,
        stars: r.stargazers_count,
        updated_at: r.updated_at,
        created_at: r.created_at,
        fork: r.fork
      })),
      languages,
      totalStars,
      heatmap,
      aiAnalysis
    };
  } catch (error) {
    console.error("GitHub fetch error:", error);
    throw error;
  }
}

async function fetchGraphQLData(username, token) {
  if (!token) return null;
  
  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables: { username } }),
      next: { revalidate: 86400 } // 24 hours
    });

    const result = await res.json();
    if (result.errors || !result.data?.user) return null;

    const days = [];
    result.data.user.contributionsCollection.contributionCalendar.weeks.forEach(week => {
      week.contributionDays.forEach(day => {
        days.push({
          date: day.date,
          count: day.contributionCount
        });
      });
    });
    
    return days;
  } catch (error) {
    console.error("GraphQL Fetch Error:", error);
    return null;
  }
}

function generateHeatmapActivity(repos) {
  // Simulate 365 days of activity representing a heatmap
  const days = [];
  const now = new Date();
  
  // Calculate some deterministic burstiness based on repo counts
  const bursty = repos.length > 50;

  for (let i = 365; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    
    // Randomize activity slightly to visualize consistency vs bursts
    let count = 0;
    if (bursty) {
      // Bursty devs have sparse days of 20+ commits
      count = Math.random() > 0.9 ? Math.floor(Math.random() * 25) : 0;
    } else {
      // Consistent devs have many days of 1-5 commits
      count = Math.random() > 0.4 ? Math.floor(Math.random() * 8) : 0;
    }
    
    days.push({
      date: d.toISOString().split('T')[0],
      count
    });
  }
  return days;
}
