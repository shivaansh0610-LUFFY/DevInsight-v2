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
          <h3>Authenticity<br/>Engine</h3>
          <p>Detect true engineering talent and problem-solving skills versus purely AI-generated code over extended timelines.</p>
        </div>
        <div className={`${styles.featureCard} ${styles.limeCard}`}>
          <div className={styles.featureIndex}>02.</div>
          <h3>Growth<br/>Trajectory</h3>
          <p>Track developer evolution by analyzing commit complexity and project scope expansion dynamically.</p>
        </div>
        <div className={`${styles.featureCard} ${styles.purpleCard}`}>
          <div className={styles.featureIndex}>03.</div>
          <h3>Technical<br/>Depth</h3>
          <p>Map out full developer maturity and holistic systems thinking beyond standard language syntax limits.</p>
        </div>
      </section>
    </main>
  );
}
