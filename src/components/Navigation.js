"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "../app/page.module.css";
import WaitlistModal from "./WaitlistModal";
import InfoDrawer from "./InfoDrawer";

export default function Navigation() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeView, setActiveView] = useState('about'); // 'about' or 'tech'
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const toggleDrawer = (view) => {
    setActiveView(view);
    setIsDrawerOpen(true);
  };

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
          
          {isHomePage ? (
            <Link href="#about" className={styles.navLink}>About Us</Link>
          ) : (
            <button 
              className={styles.navLink} 
              onClick={() => toggleDrawer('about')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
            >
              About Us
            </button>
          )}

          {isHomePage ? (
            <Link href="#technology" className={styles.navLink}>Technology</Link>
          ) : (
            <button 
              className={styles.navLink} 
              onClick={() => toggleDrawer('tech')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
            >
              Technology
            </button>
          )}
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

      <InfoDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        view={activeView}
      />
    </div>
  );
}
