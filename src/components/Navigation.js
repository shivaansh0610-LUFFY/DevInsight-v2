"use client";

import Link from "next/link";
import styles from "../app/page.module.css";

export default function Navigation() {
  return (
    <div className={styles.navContainer}>
      <nav className={styles.navBar}>
        <div className={styles.navLogo}>
          <div className={styles.navLogoIcon}>D</div>
          DevInSight
        </div>
        
        <div className={styles.navLinks}>
          <Link href="/" className={styles.navLink}>Home</Link>
          <Link href="#about" className={styles.navLink}>About Us</Link>
          <Link href="#technology" className={styles.navLink}>Technology</Link>
        </div>
        
        <div className={styles.navActions}>
          <button className={styles.ctaButton}>
            Request Invite
          </button>
        </div>
      </nav>
    </div>
  );
}
