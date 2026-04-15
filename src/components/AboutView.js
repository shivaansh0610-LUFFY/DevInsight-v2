"use client";

import styles from "../app/page.module.css";

export default function AboutView() {
  return (
    <div className={styles.aboutSection} style={{ padding: '2rem 0', textAlign: 'left' }}>
      <span className={styles.manifestoLabel}>Who Are We?</span>
      <h2 className={styles.manifestoHeadline} style={{ fontSize: '3.5rem', marginBottom: '2rem' }}>
        <span className="text-hollow">We Are The </span><br />
        <span className="text-neon">Zero Bugs Club</span>
      </h2>
      <p className={styles.manifestoText} style={{ fontSize: '1.2rem', textAlign: 'left', margin: 0 }}>
        The era of generic resumes and easily gamed keyword filters is over. We built DevInsight to rip past the fluff and measure <span className={styles.manifestoHighlight}>raw engineering horsepower</span>. By aggressively analyzing GitHub commit cadence, stack expansion, and problem-solving timelines, we expose who the true 10x builders are.
      </p>
    </div>
  );
}
