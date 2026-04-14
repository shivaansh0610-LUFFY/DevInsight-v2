"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Navigation from "../components/Navigation";

export default function Home() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (username.trim()) {
      router.push(`/report/${username}`);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.heroBackground}></div>
      <Navigation />

      <section className={`animate-fade-in ${styles.hero}`}>
        <div className={styles.heroLeft}>
          <div className={styles.stackedHeadline}>
            <span className="text-neon">DEV</span>
            <span className="text-hollow">INSIGHT</span>
            <span className="text-hollow">V2.0</span>
          </div>

          <p className={styles.heroSubtitle}>
            Stop guessing who the best developers are. Analyze GitHub behavioral patterns, consistency, and problem-solving depth to reveal real engineering talent.
          </p>

          <form onSubmit={handleSearch} className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Enter GitHub Username..."
              className={styles.searchInput}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button type="submit" className={styles.searchButton}>
              Analyze
            </button>
          </form>
        </div>

        <div className={styles.heroRight}>
          <Image
            src="/hero-graphic.png"
            alt="Developer Architecture Hologram"
            width={600}
            height={600}
            className={styles.heroImage}
            priority
          />
        </div>
      </section>

      <section className={`animate-fade-in ${styles.featuresSection}`} style={{ animationDelay: "0.2s" }}>
        <div className={`${styles.featureCard} ${styles.pinkCard}`}>
          <div className={styles.featureIndex}>01.</div>
          <h3>Authenticity<br />Engine</h3>
          <p>Detect true engineering talent and problem-solving skills versus purely AI-generated code over extended timelines.</p>
        </div>
        <div className={`${styles.featureCard} ${styles.limeCard}`}>
          <div className={styles.featureIndex}>02.</div>
          <h3>Growth<br />Trajectory</h3>
          <p>Track developer evolution by analyzing commit complexity and project scope expansion dynamically.</p>
        </div>
        <div className={`${styles.featureCard} ${styles.purpleCard}`}>
          <div className={styles.featureIndex}>03.</div>
          <h3>Technical<br />Depth</h3>
          <p>Map out full developer maturity and holistic systems thinking beyond standard language syntax limits.</p>
        </div>
      </section>

      {/* About Us Manifesto */}
      <section id="about" className={styles.aboutWrapper}>
        <div className={styles.aboutSection}>
          <span className={styles.manifestoLabel}>Who Are We?</span>
          <h2 className={styles.manifestoHeadline}>
            <span className="text-hollow">We Are The </span><br />
            <span className="text-neon">Zero Bugs Club</span>
          </h2>
          <p className={styles.manifestoText}>
            The era of generic resumes and easily gamed keyword filters is over. We built DevInsight to rip past the fluff and measure <span className={styles.manifestoHighlight}>raw engineering horsepower</span>. By aggressively analyzing GitHub commit cadence, stack expansion, and problem-solving timelines, we expose who the true 10x builders are.
          </p>
        </div>
      </section>

      {/* Technology Architecture Section */}
      <section id="technology" className={styles.techWrapper}>
        <div className={styles.techSection}>
          <div className={styles.techHeader}>
            <h2 className={styles.techTitle}>The Intelligence <span className="text-hollow">Stack</span></h2>
            <p className={styles.techSubtitle}>How we process thousands of commits in milliseconds.</p>
          </div>

          <div className={styles.techGrid}>
            <div className={`${styles.techPillar} ${styles.pillar1}`}>
              <div className={styles.techIconWrapper}>📡</div>
              <h3>Data Ingestion</h3>
              <p>We leverage native GraphQL APIs to securely parse 365-day user contribution topologies and raw repository dependency arrays.</p>
            </div>

            <div className={`${styles.techPillar} ${styles.pillar2}`}>
              <div className={styles.techIconWrapper}>🧠</div>
              <h3>AI Processing Core</h3>
              <p>Custom inference mapping passes syntax trees through an advanced Language Model to determine behavioral problem solving capabilities.</p>
            </div>

            <div className={`${styles.techPillar} ${styles.pillar3}`}>
              <div className={styles.techIconWrapper}>⚡</div>
              <h3>Realtime Output</h3>
              <p>Our React DOM Matrix dynamically visualizes the computed intelligence cohorts into a high performance "bento box" analytic dashboard.</p>
            </div>
          </div>
        </div>
      </section>
      {/* Footer Section */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>
            <span className={styles.footerLogoIcon}>D</span> DevInSight
          </div>
          <p className={styles.footerText}>
            &copy; {new Date().getFullYear()} The Zero Bugs Club. All rights reserved.
          </p>
        </div>
      </footer>

    </main>
  );
}
