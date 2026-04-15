"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import styles from "../app/report/[username]/page.module.css";
import AnimatedCounter from "./AnimatedCounter";
import CursorGlow from "./CursorGlow";

const TechRadar = dynamic(() => import("./TechRadar"), { ssr: false });
const EngineeringMomentum = dynamic(() => import("./EngineeringMomentum"), { ssr: false });
const StackDistribution = dynamic(() => import("./StackDistribution"), { ssr: false });

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

export default function DashboardClient({ data }) {
  const getIntensity = (count) => {
    if (count === 0) return styles.level0;
    if (count <= 2) return styles.level1;
    if (count <= 5) return styles.level2;
    if (count <= 10) return styles.level3;
    if (count <= 15) return styles.level4;
    return styles.level5;
  };

  return (
    <div className={styles.dashboardContainer}>
      <CursorGlow />
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className={styles.header}>
          <div className={styles.avatarWrapper}>
            <Image 
              src={data.profile.avatar_url} 
              alt={`${data.profile.login} Avatar`} 
              width={120} 
              height={120} 
              className={styles.avatar} 
            />
          </div>
          <div className={styles.userInfo}>
            <h1 className={styles.userName}>{data.profile.name || data.profile.login}</h1>
            <p className={styles.userHandle}>
              <span className={styles.atSymbol}>@</span>{data.profile.login} 
              {data.profile.location && <span className={styles.locationDivider}>•</span>}
              <span className={styles.locationText}>{data.profile.location}</span>
            </p>
            
            <div className={styles.statsBar}>
              <div className={styles.statItem}>
                <span className={styles.statValue}>
                  <AnimatedCounter to={data.profile.public_repos} />
                </span>
                <span className={styles.statLabel}>Repositories</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>
                  <AnimatedCounter to={data.profile.followers} />
                </span>
                <span className={styles.statLabel}>Followers</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>
                  <AnimatedCounter to={data.totalStars} />
                </span>
                <span className={styles.statLabel}>Stars</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className={styles.bentoGrid}>
          {/* Engine 1: Authenticity (AI Powered) */}
          <motion.div variants={itemVariants} className={`${styles.card} ${styles.authenticityCard}`}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>🧠</div>
              <h3 className={styles.cardTitle}>Authenticity Engine</h3>
            </div>
            
            <div className={styles.authenticityContent}>
              <div className={styles.scoreCircleWrapper}>
                <div className={styles.scoreCircle}>
                  <span className={styles.scoreValue}>
                    {data.aiAnalysis ? <AnimatedCounter to={data.aiAnalysis.authenticityScore} /> : '--'}
                  </span>
                  <span className={styles.scoreLabel}>Authentic score</span>
                </div>
              </div>
              
              <div className={styles.authenticityText}>
                <p>
                  {data.aiAnalysis ? data.aiAnalysis.authenticityText : "Analyzing semantic patterns..."}
                </p>
                <span className={styles.authenticityTag}>
                  {data.aiAnalysis ? data.aiAnalysis.engineeringMaturity : "Evaluating..."}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Engine 2: Growth Trajectory */}
          <motion.div variants={itemVariants} className={`${styles.card} ${styles.growthCard}`}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>🚀</div>
              <h3 className={styles.cardTitle}>Growth Trajectory</h3>
            </div>
            
            <p style={{color: '#888', fontSize: '0.9rem', marginBottom: '2rem'}}>
              Dominant Technology Stack Expansion
            </p>
            
            <div className={styles.langList}>
              {Object.entries(data.languages)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 5)
                .map(([lang, count]) => (
                  <div className={styles.langItem} key={lang}>
                    <div className={styles.langInfo}>
                      <span className={styles.langName}>{lang}</span>
                      <span className={styles.langCount}>{count} repos</span>
                    </div>
                    <div className={styles.langBar}>
                      <motion.div 
                        className={styles.langFill} 
                        initial={{ width: 0 }}
                        animate={{ width: `${(count / data.repos.length) * 100}%` }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                        style={{ 
                          background: lang === 'JavaScript' || lang === 'TypeScript' ? 'var(--primary)' : 'var(--secondary)'
                        }}
                      ></motion.div>
                    </div>
                  </div>
              ))}
            </div>
          </motion.div>

          {/* Engine 3: Technical Depth */}
          <motion.div variants={itemVariants} className={`${styles.card} ${styles.depthCard}`}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>🧠</div>
              <h3 className={styles.cardTitle}>Technical Depth</h3>
            </div>
            <div className={styles.depthContent}>
              <p style={{color: '#888', fontSize: '0.9rem', textAlign: 'center', marginBottom: '1.5rem'}}>Holistic Systems Architecture</p>
              <TechRadar languages={data.languages} />
            </div>
          </motion.div>

          {/* Engine 4: Consistency */}
          <motion.div variants={itemVariants} className={`${styles.card} ${styles.consistencyCard}`}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>🔥</div>
              <h3 className={styles.cardTitle}>Consistency Engine</h3>
            </div>
            
            <p style={{color: '#888', fontSize: '0.9rem', marginBottom: '2rem'}}>
              365-Day Real-Time Workflow Topology (via GraphQL)
            </p>
            
            <div className={styles.heatmapContainer}>
              <div className={styles.heatmapGrid}>
                {data.heatmap.map((day, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.002, duration: 0.2 }}
                    className={`${styles.heatmapCell} ${getIntensity(day.count)}`}
                    title={`${day.count} commits on ${day.date}`}
                  ></motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Engine 5: Stack Distribution */}
          <motion.div variants={itemVariants} className={`${styles.card} ${styles.distributionCard}`}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>📊</div>
              <h3 className={styles.cardTitle}>Stack Distribution</h3>
            </div>
            <div className={styles.distributionContent}>
              <p style={{color: '#888', fontSize: '0.9rem', textAlign: 'center', marginBottom: '1rem'}}>Technology Core Composition</p>
              <StackDistribution languages={data.languages} />
            </div>
          </motion.div>

          {/* Engine 6: Momentum Chart */}
          <motion.div variants={itemVariants} className={`${styles.card} ${styles.momentumCard}`}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>📈</div>
              <h3 className={styles.cardTitle}>Engineering Momentum</h3>
            </div>
            
            <p style={{color: '#888', fontSize: '0.9rem', marginBottom: '1rem'}}>
              Weekly Activity Velocity Tracking (Last 52 Weeks)
            </p>
            
            <EngineeringMomentum heatmap={data.heatmap} />
          </motion.div>
        </div>

        {/* Dashboard Footer */}
        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <div className={styles.footerLogo}>
              <div className={styles.footerLogoIcon}>
                <Image 
                  src="/logo.png" 
                  alt="DevInsight Logo" 
                  width={24} 
                  height={24} 
                  style={{ objectFit: 'contain' }}
                />
              </div>
              DevInSight
            </div>
            <p className={styles.footerText}>
              &copy; {new Date().getFullYear()} The Zero Bugs Club. All rights reserved.
            </p>
          </div>
        </footer>
      </motion.div>
    </div>
  );
}
