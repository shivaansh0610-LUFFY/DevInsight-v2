"use client";
import { useEffect, useState } from "react";
import { animate } from "framer-motion";

export default function AnimatedCounter({ from = 0, to, duration = 2 }) {
  const [count, setCount] = useState(from);

  useEffect(() => {
    const controls = animate(from, to, {
      duration,
      onUpdate(value) {
        setCount(Math.floor(value));
      },
      ease: "circOut"
    });
    return () => controls.stop();
  }, [from, to, duration]);

  return <>{count.toLocaleString()}</>;
}
