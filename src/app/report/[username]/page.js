import Link from "next/link";
import Navigation from "../../../components/Navigation";
import styles from "./page.module.css";
import { fetchGitHubData } from "../../../services/githubService";
import DashboardClient from "../../../components/DashboardClient";

export default async function ReportPage({ params }) {
  const { username } = params;
  
  let data;
  let error;
  
  try {
    data = await fetchGitHubData(username);
  } catch (e) {
    error = "Failed to load developer data. The user might not exist or the GitHub API rate limit was exceeded.";
  }

  return (
    <main style={{ background: '#0A0A0B', minHeight: '100vh' }}>
      <Navigation />
      
      {error ? (
        <div className={styles.dashboardContainer} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className={styles.card} style={{ maxWidth: '500px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#fff' }}>Oops!</h2>
            <p style={{ color: '#ef4444', marginBottom: '2rem' }}>{error}</p>
            <Link href="/" className={styles.authenticityTag} style={{ display: 'inline-block' }}>
              &larr; Back to Search
            </Link>
          </div>
        </div>
      ) : (
        <DashboardClient data={data} />
      )}
    </main>
  );
}
