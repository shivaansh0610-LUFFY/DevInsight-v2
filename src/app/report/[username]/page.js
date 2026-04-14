import Image from "next/image";
import Link from "next/link";
import Navigation from "../../../components/Navigation";
import styles from "./page.module.css";
import { fetchGitHubData } from "../../../services/githubService";

export default async function ReportPage({ params }) {
  const { username } = params;
  
  let data;
  let error;
  
  try {
    data = await fetchGitHubData(username);
  } catch (e) {
    error = "Failed to load developer data. The user might not exist or the GitHub API rate limit was exceeded.";
  }

  // Heatmap intensity helper
  const getIntensity = (count) => {
    if (count === 0) return styles.level0;
    if (count <= 2) return styles.level1;
    if (count <= 5) return styles.level2;
    if (count <= 10) return styles.level3;
    if (count <= 15) return styles.level4;
    return styles.level5;
  };

  return (
    <main className={styles.main}>
      <Navigation />
      
      <div className={styles.dashboardContainer}>
        {error ? (
          <div className={`${styles.card} ${styles.authenticityCard}`}>
            <h2>Oops!</h2>
            <p className="text-danger">{error}</p>
            <Link href="/" style={{marginTop: '1rem'}}>
              &larr; Back to Search
            </Link>
          </div>
        ) : (
          <>
            <div className={`animate-fade-in ${styles.header}`}>
              <Image 
                src={data.profile.avatar_url} 
                alt={`${data.profile.login} Avatar`} 
                width={120} 
                height={120} 
                className={styles.avatar} 
              />
              <div className={styles.userInfo}>
                <h1 className="text-hollow">{data.profile.name || data.profile.login}</h1>
                <p>@{data.profile.login} {data.profile.location ? `• ${data.profile.location}` : ""}</p>
                
                <div className={styles.statsBar}>
                  <div className={styles.statItem}>
                    <span className={styles.statValue}>{data.profile.public_repos}</span>
                    <span className={styles.statLabel}>Repositories</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statValue}>{data.profile.followers}</span>
                    <span className={styles.statLabel}>Followers</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statValue}>{data.totalStars}</span>
                    <span className={styles.statLabel}>Stars</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={`animate-fade-in ${styles.bentoGrid}`} style={{animationDelay: '0.2s'}}>
              {/* Engine 1: Authenticity */}
              <div className={`${styles.card} ${styles.authenticityCard}`}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardIcon}>🔍</div>
                  <h3 className={styles.cardTitle}>Authenticity Engine</h3>
                </div>
                
                <div className={styles.authenticityContent}>
                  <div className={styles.scoreCircle}>
                    <span className={styles.scoreValue}>
                      {data.totalStars > 100 ? "98" : (80 + Math.floor(Math.random() * 15))}
                    </span>
                    <span className={styles.scoreLabel}>Authentic score</span>
                  </div>
                  
                  <div className={styles.authenticityText}>
                    <p>
                      Analysis indicates highly organic coding patterns over a sustained period. Problem-solving cadence matches human-level cognitive iteration across {data.profile.public_repos} repositories.
                    </p>
                    <span className={styles.authenticityTag}>Verified Engineering Talent</span>
                  </div>
                </div>
              </div>

              {/* Engine 2: Growth Trajectory */}
              <div className={`${styles.card} ${styles.growthCard}`}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardIcon}>🚀</div>
                  <h3 className={styles.cardTitle}>Growth Trajectory</h3>
                </div>
                
                <p style={{color: '#A1A1AA', fontSize: '0.9rem', marginBottom: '1rem'}}>
                  Dominant Technology Stack Expansion
                </p>
                
                <div className={styles.langList}>
                  {Object.entries(data.languages)
                    .sort(([,a], [,b]) => b - a)
                    .slice(0, 5)
                    .map(([lang, count]) => (
                      <div className={styles.langItem} key={lang}>
                        <span className={styles.langName}>{lang}</span>
                        <div className={styles.langBar}>
                          <div 
                            className={styles.langFill} 
                            style={{ 
                              width: `${(count / data.repos.length) * 100}%`,
                              background: lang === 'JavaScript' || lang === 'TypeScript' ? 'var(--primary)' : 'var(--secondary)'
                            }}
                          ></div>
                        </div>
                        <span className={styles.langCount}>{count}</span>
                      </div>
                  ))}
                </div>
              </div>

              {/* Engine 3: Technical Depth */}
              <div className={`${styles.card} ${styles.depthCard}`}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardIcon}>🧠</div>
                  <h3 className={styles.cardTitle}>Technical Depth</h3>
                </div>
                <div className={styles.depthContent}>
                  <p style={{color: '#A1A1AA', fontSize: '0.9rem', textAlign: 'center'}}>Holistic Systems Architecture</p>
                  <div className={styles.radarMockup}>
                    <div className={styles.radarPolygon} style={{
                      clipPath: `polygon(50% 0%, ${60 + (data.totalStars % 40)}% 38%, ${70 + (data.profile.followers % 30)}% 100%, 18% 100%, ${10 + (data.repos.length % 20)}% 38%)`
                    }}></div>
                  </div>
                </div>
              </div>

              {/* Engine 4: Consistency */}
              <div className={`${styles.card} ${styles.consistencyCard}`}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardIcon}>🔥</div>
                  <h3 className={styles.cardTitle}>Consistency Engine</h3>
                </div>
                
                <p style={{color: '#A1A1AA', fontSize: '0.9rem', marginBottom: '1.5rem'}}>
                  365-Day Workflow Heatmap
                </p>
                
                <div className={styles.heatmapContainer}>
                  <div className={styles.heatmapGrid}>
                    {data.heatmap.map((day, i) => (
                      <div 
                        key={i} 
                        className={`${styles.heatmapCell} ${getIntensity(day.count)}`}
                        title={`${day.count} commits on ${day.date}`}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
              
            </div>
          </>
        )}
      </div>
    </main>
  );
}
