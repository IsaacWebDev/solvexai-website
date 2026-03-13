'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface CodeDrop {
  id: number;
  text: string;
  x: number;
  duration: number;
  delay: number;
}

export default function CodeRain() {
  const [codeDrops, setCodeDrops] = useState<CodeDrop[]>([]);

  useEffect(() => {
    const codeSnippets = [
      "const automation = true;",
      "if (business) { automate(); }",
      "await AI.work247();",
      "return <Success />;",
      "function optimize() { ... }",
      "class Autonomous extends AI",
      "export default Future;",
      "const roi = Infinity;",
      "while(true) { grow(); }",
      "import { Innovation } from 'AI';",
    ];

    // Generate 20 code drops
    const drops: CodeDrop[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
      x: Math.random() * 100, // percentage
      duration: 10 + Math.random() * 5,
      delay: Math.random() * 5,
    }));

    setCodeDrops(drops);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {codeDrops.map((drop) => (
        <motion.div
          key={drop.id}
          className="absolute text-purple-500/30 font-mono text-sm whitespace-nowrap"
          style={{
            left: `${drop.x}%`,
          }}
          initial={{
            y: '-10%',
            opacity: 0,
          }}
          animate={{
            y: '110%',
            opacity: [0, 0.3, 0.3, 0],
          }}
          transition={{
            duration: drop.duration,
            delay: drop.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {drop.text}
        </motion.div>
      ))}
    </div>
  );
}
