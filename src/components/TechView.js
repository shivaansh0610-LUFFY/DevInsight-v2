"use client";

import styles from "../app/page.module.css";

export default function TechView() {
  return (
    <div className={styles.techSection} style={{ padding: '2rem 0', textAlign: 'left' }}>
      <div className={styles.techHeader} style={{ textAlign: 'left', marginBottom: '3rem' }}>
        <h2 className={styles.techTitle} style={{ fontSize: '2.5rem' }}>The Intelligence <span className="text-hollow">Stack</span></h2>
        <p className={styles.techSubtitle}>How we process thousands of commits in milliseconds.</p>
      </div>

      <div className={styles.techGrid} style={{ gridTemplateColumns: '1fr', gap: '2rem' }}>
        <div className={`${styles.techPillar} ${styles.pillar1}`} style={{ alignItems: 'flex-start', textAlign: 'left' }}>
          <div className={styles.techIconWrapper} style={{ width: '60px', height: '60px', fontSize: '1.5rem' }}>📡</div>
          <h3>Data Ingestion</h3>
          <p>We leverage native GraphQL APIs to securely parse 365-day user contribution topologies.</p>
        </div>

        <div className={`${styles.techPillar} ${styles.pillar2}`} style={{ alignItems: 'flex-start', textAlign: 'left' }}>
          <div className={styles.techIconWrapper} style={{ width: '60px', height: '60px', fontSize: '1.5rem' }}>🧠</div>
          <h3>AI Processing Core</h3>
          <p>Custom inference mapping passes syntax trees through an advanced Language Model.</p>
        </div>

        <div className={`${styles.techPillar} ${styles.pillar3}`} style={{ alignItems: 'flex-start', textAlign: 'left' }}>
          <div className={styles.techIconWrapper} style={{ width: '60px', height: '60px', fontSize: '1.5rem' }}>⚡</div>
          <h3>Realtime Output</h3>
          <p>Our React DOM Matrix dynamically visualizes the computed intelligence cohorts.</p>
        </div>
      </div>
    </div>
  );
}
