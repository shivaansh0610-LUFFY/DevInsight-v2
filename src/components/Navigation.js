"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../app/page.module.css";
import WaitlistModal from "./WaitlistModal";

export default function Navigation() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className={styles.navContainer}>
      <nav className={styles.navBar}>
        <div className={styles.navLogo}>
          <div className={styles.navLogoIcon}>
            <Image 
              src="/logo.png" 
              alt="DevInsight Logo" 
              width={40} 
              height={40} 
              style={{ objectFit: 'contain' }}
            />
          </div>
          DevInSight
        </div>
        
        <div className={styles.navLinks}>
          <Link href="/" className={styles.navLink}>Home</Link>
          <Link href="#about" className={styles.navLink}>About Us</Link>
          <Link href="#technology" className={styles.navLink}>Technology</Link>
        </div>
        
        <div className={styles.navActions}>
          <button 
            className={styles.ctaButton}
            onClick={() => setIsModalOpen(true)}
          >
            Request Invite
          </button>
        </div>
      </nav>

      <WaitlistModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
