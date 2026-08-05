import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import idImage from './my-id.jpg';
import './App.css';

// --- THE X10THINK CRYPTOGRAPHIC CIPHER ENGINE ---
const DecoderText = ({ text, delay = 0 }) => {
  const [display, setDisplay] = useState('');
  const chars = '∑π∆∇∞∫+-_/\\|[]{}<>0123456789X';

  useEffect(() => {
    let iteration = 0;
    let interval = null;

    const start = () => {
      interval = setInterval(() => {
        setDisplay(() =>
          text
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              if (index < iteration) return text[index];
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('')
        );
        
        if (iteration >= text.length) clearInterval(interval);
        iteration += 1 / 3;
      }, 40);
    };

    const timer = setTimeout(start, delay);
    
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [text, delay]);

  return <>{display || text.replace(/[^ ]/g, '·')}</>;
};

// --- THE X10THINK 3D MAGNETIC VECTOR ENGINE ---
const MagneticBox = ({ children, layoutId, onClick, setCursorType }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const glowX = useMotionValue(-500);
  const glowY = useMotionValue(-500);

  const mouseXSpring = useSpring(x, { stiffness: 120, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 120, damping: 15 });

  const translateX = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 120, damping: 15 });
  const translateY = useSpring(useTransform(y, [-0.5, 0.5], [-12, 12]), { stiffness: 120, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const glowXSpring = useSpring(glowX, { stiffness: 200, damping: 20 });
  const glowYSpring = useSpring(glowY, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
    glowX.set(mouseX);
    glowY.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0); 
    y.set(0);
    glowX.set(-500);
    glowY.set(-500);
  };

  return (
    <motion.div
      layoutId={layoutId}
      onClick={onClick}
      className="bento-box magnetic-box"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setCursorType('click')}
      style={{ 
        rotateX, 
        rotateY, 
        x: translateX,
        y: translateY,
        transformStyle: "preserve-3d" 
      }}
    >
      <motion.div 
        className="magnetic-glow"
        style={{
          left: glowXSpring,
          top: glowYSpring,
          transform: "translate(-50%, -50%)"
        }}
      />
      <div className="magnetic-content">
        {children}
      </div>
    </motion.div>
  );
};

// --- THE X10THINK MAGNETIC BUTTON (CYBERNETIC ATTRACTOR) ---
const MagneticButton = ({ children, className, onClick, onMouseEnter, onMouseLeave, style = {} }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 180, damping: 12 });
  const springY = useSpring(y, { stiffness: 180, damping: 12 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const pullX = (e.clientX - centerX) * 0.35; // Pull strength
    const pullY = (e.clientY - centerY) * 0.35;
    x.set(pullX);
    y.set(pullY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    if (onMouseLeave) onMouseLeave();
  };

  return (
    <motion.button
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={onMouseEnter}
      className={className}
      style={{ ...style, x: springX, y: springY }}
    >
      <span className="magnetic-btn-inner" style={{ pointerEvents: 'none', display: 'inline-block' }}>
        {children}
      </span>
    </motion.button>
  );
};

// --- THE X10THINK IGNITION REACTOR (SECURITY BYPASS OVERRIDE) ---
const IgnitionButton = ({ setCursorType }) => {
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const animationRef = useRef(null);

  const startIgnition = () => {
    setCursorType('ignite'); 
    const fill = () => {
      progressRef.current += 1.2; 
      if (progressRef.current >= 100) {
        progressRef.current = 100;
        setProgress(100);
        return;
      }
      setProgress(progressRef.current);
      animationRef.current = requestAnimationFrame(fill);
    };
    animationRef.current = requestAnimationFrame(fill);
  };

  const stopIgnition = () => {
    setCursorType('default');
    cancelAnimationFrame(animationRef.current);
    
    // THE TRUSTED-EVENT BYPASS: Triggers ONLY when the user physically lets go at 100%
    if (progressRef.current >= 100) {
      window.open("https://mail.google.com/mail/?view=cm&fs=1&to=anshfyp88@gmail.com", "_blank");
      navigator.clipboard.writeText("anshfyp88@gmail.com");
      progressRef.current = 0;
      setProgress(0);
      return;
    }
    
    const drain = () => {
      progressRef.current -= 4; 
      if (progressRef.current <= 0) {
        progressRef.current = 0;
        setProgress(0);
        return;
      }
      setProgress(progressRef.current);
      animationRef.current = requestAnimationFrame(drain);
    };
    animationRef.current = requestAnimationFrame(drain);
  };

  return (
    <div 
      className="ignition-btn"
      onMouseDown={startIgnition}
      onMouseUp={stopIgnition}
      onMouseLeave={stopIgnition}
      onTouchStart={startIgnition} 
      onTouchEnd={stopIgnition}
    >
      <div className="ignition-fill" style={{ width: `${progress}%` }}></div>
      <span className="ignition-text">
        {progress >= 100 ? 'RELEASE TO INITIATE' : progress > 0 ? `UPLOADING... ${Math.floor(progress)}%` : 'HELLO@ANSH.JHA'}
      </span>
    </div>
  );
};

// --- MAIN APP COMPONENT ---
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Projects');
  const [cursorType, setCursorType] = useState('default');
  const [viewMode, setViewMode] = useState('desktop'); 
  const [selectedProject, setSelectedProject] = useState(null);
// --- PHASE 1 FIX: LAZY LOAD STATE ---
  const [isCanvasMounted, setIsCanvasMounted] = useState(false);
  const projectsData = [
  { 
    id: 'p1', 
    title: 'NEXUS Tactical Command', 
    desc: 'Real-time offline-first mesh network simulator for Society 5.0 disaster infrastructure.', 
    detail: 'Engineered a Full-Stack geospatial command center utilizing a Node.js/Express backend. Implemented Socket.io for bidirectional WebSocket telemetry with zero-latency updates. The frontend utilizes Leaflet.js and CartoDB dark matter tiles.',
    liveLink: 'https://nexus-command-erjn.onrender.com',
    repoLink: 'https://github.com/AK-projects88/nexus-mesh-network'
  },
  { 
    id: 'p2', 
    title: 'Gig Economy Logistics', 
    desc: 'Micro-economic systems analysis.', 
    detail: 'Mapped high-density delivery routes and analyzed...'
  },
  { 
    id: 'p3', 
    title: 'Volunteer Yatra', 
    desc: 'Cross-cultural field studies portal.', 
    detail: 'Designed and developed a full-stack portal connecting...'
  }
];
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 28 });

  // Physics-chained custom trails (fading geometric aura trail)
  const t1X = useSpring(cursorX, { stiffness: 350, damping: 24 });
  const t1Y = useSpring(cursorY, { stiffness: 350, damping: 24 });

  const t2X = useSpring(t1X, { stiffness: 220, damping: 20 });
  const t2Y = useSpring(t1Y, { stiffness: 220, damping: 20 });

  const t3X = useSpring(t2X, { stiffness: 140, damping: 16 });
  const t3Y = useSpring(t2Y, { stiffness: 140, damping: 16 });

  const t4X = useSpring(t3X, { stiffness: 90, damping: 13 });
  const t4Y = useSpring(t3Y, { stiffness: 90, damping: 13 });

  const t5X = useSpring(t4X, { stiffness: 55, damping: 10 });
  const t5Y = useSpring(t4Y, { stiffness: 55, damping: 10 });

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  const dragX = useMotionValue(0);
  const rotate = useTransform(dragX, [-200, 200], [-15, 15]);

  const cursorVariants = {
    default: { width: 20, height: 20, backgroundColor: "#ffffff", border: "0px solid #ffffff", mixBlendMode: "difference", color: "transparent" },
    click: { width: 65, height: 65, backgroundColor: "#ffffff", border: "0px solid #ffffff", mixBlendMode: "normal", color: "#000000" },
    drag: { width: 80, height: 80, backgroundColor: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.5)", backdropFilter: "blur(4px)", mixBlendMode: "normal", color: "#ffffff" },
    ignite: { width: 100, height: 100, backgroundColor: "#e50914", border: "0px solid #ffffff", mixBlendMode: "normal", color: "#ffffff" }
  };

  // --- STAGGERED MATRIX REVEAL VARIANTS ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 35, 
      filter: "blur(12px)",
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 14
      }
    }
  };

  const loadStaggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const loadStaggerItem = {
    hidden: { opacity: 0, y: 50, filter: "blur(15px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 70, damping: 15 }
    }
  };

 useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // 1. Reveal the UI instantly
      
      // 2. Wait 500ms for React to settle, THEN mount the heavy 3D Canvas
      setTimeout(() => setIsCanvasMounted(true), 500); 
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);

  // --- THE X10THINK 3D TOPOGRAPHIC WAVE ENGINE ---
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Mouse Parallax for 3D Camera Pan
    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e) => {
      mouse.targetX = (e.clientX - canvas.width / 2) * 0.05;
      mouse.targetY = (e.clientY - canvas.height / 2) * 0.05;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let time = 0;

    const render = () => {
      time += 0.02; // Speed of the 3D wave
      
      // Clear canvas with transparent Graphite to create a hyper-smooth feel
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth camera drag
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const fov = 400; // Field of View (Depth perspective)
      
     // 1. HIGH-PERFORMANCE DENSITY OVERRIDE
      const cols = 25; // Dropped from 35
      const rows = 25; // Dropped from 35
      const spacing = 75; // Increased from 55 to cover the same screen space
      for (let x = -cols / 2; x < cols / 2; x++) {
        for (let z = -rows / 2; z < rows / 2; z++) {
          
          let posX = x * spacing;
          let posZ = z * spacing;
          let posY = Math.sin(x * 0.15 + time) * 35 + Math.cos(z * 0.15 + time) * 35;

          let camX = posX + mouse.x * (posZ * 0.01);
          let camY = posY + mouse.y * (posZ * 0.01) + 200; 
          let camZ = posZ + 500; 

          if (camZ > 0) {
            let scale = fov / camZ;
            let screenX = camX * scale + canvas.width / 2;
            let screenY = camY * scale + canvas.height / 2;

            // THE 60FPS OPTIMIZATION: No shadowBlur, just raw size and alpha scaling
            let size = Math.max(1.2, scale * 2.5); 
            let alpha = Math.max(0.1, Math.min(1, scale * 3.0)); 

            // Pure Sky Mint color, rendered instantly
            ctx.fillStyle = `rgba(184, 247, 228, ${alpha})`; 
            ctx.fillRect(screenX, screenY, size, size); 
            
            // VERY IMPORTANT: Ensure we do NOT have shadow properties here
            ctx.shadowBlur = 0;
          }
        }
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
}, [isCanvasMounted]); // <-- We tell it to fire ONLY when the canvas actually exists
  

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) { section.scrollIntoView({ behavior: 'smooth' }); }
  };

  if (isLoading) {
    return (
      <div className="preloader">
        <motion.div className="preloader-text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}>
          Compiling Portfolio...
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      
      <div className="noise-overlay"></div>
      
      <motion.div className="custom-cursor" style={{ x: springX, y: springY }} variants={cursorVariants} animate={cursorType} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
        {cursorType === 'click' ? 'CLICK' : cursorType === 'drag' ? 'DRAG' : cursorType === 'ignite' ? 'HOLD' : ''}
      </motion.div>

      {/* Fluid Cursor Trails (Optimized to 3 for performance) */}
      {[
        { x: t1X, y: t1Y, scale: 0.85, opacity: 0.75 },
        { x: t2X, y: t2Y, scale: 0.60, opacity: 0.45 },
        { x: t3X, y: t3Y, scale: 0.35, opacity: 0.20 }
      ].map((trail, idx) => (
        <motion.div
          key={idx}
          className="custom-cursor-trail"
          style={{
            x: trail.x,
            y: trail.y,
            scale: trail.scale,
            opacity: trail.opacity,
            willChange: "transform" // Forces GPU on the cursor
          }}
        />
      ))}

    {/* --- PHASE 1 FIX: LAZY LOADED 3D KINETIC WAVE --- */}
      {isCanvasMounted && <canvas ref={canvasRef} className="kinetic-canvas"></canvas>}
      
      {/* --- PHASE 1 FIX: THE CONTRAST OVERLAY --- */}
      <div className="contrast-overlay"></div>

      <div className="view-toggle">
        {['desktop', 'tablet', 'mobile'].map((mode) => (
          <MagneticButton
            key={mode}
            className={`view-btn ${viewMode === mode ? 'active' : ''}`}
            onClick={() => setViewMode(mode)}
            onMouseEnter={() => setCursorType('click')}
            onMouseLeave={() => setCursorType('default')}
          >
            {mode === 'desktop' ? 'LAPTOP' : mode.toUpperCase()}
          </MagneticButton>
        ))}
      </div>

      <motion.div 
        className={`app-wrapper ${viewMode}`}
        variants={loadStaggerContainer}
        initial="hidden"
        animate="visible"
      >
        
        <motion.nav className="nav-bar" variants={loadStaggerItem}>
          <div className="nav-logo">ANSH.JHA</div>
          <div className="nav-links">
            <MagneticButton className="nav-link" onClick={() => scrollToSection('work')} onMouseEnter={() => setCursorType('click')} onMouseLeave={() => setCursorType('default')}>Work</MagneticButton>
            <MagneticButton className="nav-link" onClick={() => scrollToSection('about')} onMouseEnter={() => setCursorType('click')} onMouseLeave={() => setCursorType('default')}>About</MagneticButton>
            <MagneticButton className="nav-link" onClick={() => scrollToSection('contact')} onMouseEnter={() => setCursorType('click')} onMouseLeave={() => setCursorType('default')}>Contact</MagneticButton>
          </div>
        </motion.nav>

        <motion.section className="hero-section" variants={loadStaggerItem}>
          <div>
            <h1 className="hero-title">
              <span className="solid-text">
                <DecoderText text="FRONTEND" delay={2600} />
              </span>
              {/* The <br /> is GONE. Flex-column handles the stacking now. */}
              <span className="outline-text">
                <DecoderText text="DEVELOPER" delay={3200} />
              </span>
            </h1>
            <p className="hero-subtext">
              I build interactive digital experiences through mathematical modeling, strategy, and high-performance code.
            </p>
          </div>

          <div className="id-card-wrapper">
            <motion.div 
              style={{ x: dragX, rotate: rotate, transformOrigin: "top center", position: "relative", width: "100%", height: "100%", display: "flex", justifyContent: "center" }}
              initial={{ y: -1000, rotate: 15 }}
              animate={{ y: 0, rotate: 0 }}
              transition={{ type: "spring", mass: 2, damping: 12, bounce: 0.4 }}
              drag dragElastic={0.2} dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }} 
              onMouseEnter={() => setCursorType('drag')}
              onMouseLeave={() => setCursorType('default')}
            >
              <div className="lanyard"></div>
              <div className="id-card">
                <img src={idImage} alt="Ansh Jha ID" className="id-card-graphic" />
              </div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section id="work" className="portfolio-section" variants={loadStaggerItem}>
          <div className="tab-container">
            {['Projects', 'Certificates', 'Tech Stack'].map((tabName) => (
              <MagneticButton
                key={tabName}
                className={`tab-button ${activeTab === tabName ? 'active' : ''}`}
                onClick={() => setActiveTab(tabName)}
                onMouseEnter={() => setCursorType('click')}
                onMouseLeave={() => setCursorType('default')}
              >
                {tabName}
              </MagneticButton>
            ))}
          </div>
<motion.div 
            key={activeTab}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="portfolio-swiper-container"
          >
            <Swiper
              effect={'coverflow'}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={'auto'}
              mousewheel={{ forceToAxis: true }} // Lets you scroll with mouse wheel smoothly
              coverflowEffect={{
                rotate: 35,       // The polygon angle
                stretch: 0,       // Space between cards
                depth: 250,       // How far back the side cards get pushed
                modifier: 1,
                slideShadows: false, // We use our own CSS shadows
              }}
              modules={[EffectCoverflow, Mousewheel]}
              className="masterpiece-swiper"
            >
              {activeTab === 'Projects' && projectsData.map((project) => (
                <SwiperSlide key={project.id} className="master-slide">
                  <motion.div variants={itemVariants} style={{ height: '100%' }}>
                    <MagneticBox 
                      layoutId={project.id} 
                      onClick={() => setSelectedProject(project)} 
                      setCursorType={setCursorType}
                    >
                      <motion.h3 layoutId={`title-${project.id}`}>{project.title}</motion.h3>
                      <motion.p layoutId={`desc-${project.id}`} style={{color: '#a0a0a5', marginTop: '15px'}}>
                        {project.desc}
                      </motion.p>
                    </MagneticBox>
                  </motion.div>
                </SwiperSlide>
              ))}

             {/* Add similar SwiperSlides for Certificates and Tech Stack if needed */}
            </Swiper>
          </motion.div>
        </motion.section> {/* <--- ADD THIS EXACT LINE RIGHT HERE */}

        <motion.div className="marquee-container" variants={loadStaggerItem}>
          <div className="marquee-track">
            <h1>SOFTWARE ENGINEER • MATHEMATICAL STRATEGIST • SYSTEM ARCHITECT • SOFTWARE ENGINEER • MATHEMATICAL STRATEGIST • SYSTEM ARCHITECT •</h1>
          </div>
        </motion.div>

        <motion.section id="about" className="about-section" variants={loadStaggerItem}>
          <div className="about-grid">
            <div className="about-header">
              <h2>01 <br/> <span className="outline-text">THE</span><br/> PHILOSOPHY</h2>
            </div>
            <div className="about-text">
              <p>I don't just write code. I engineer digital physics.</p>
              <p>Specializing in bridging the gap between heavy mathematical models and hyper-fluid user interfaces. I build systems that don't just work—they feel alive. If an architecture isn't beautiful on a microscopic level, it isn't finished.</p>
            </div>
          </div>
        </motion.section>

        <motion.section id="contact" className="contact-command-center" variants={loadStaggerItem}>
  
  {/* LEFT FLANK: Telemetry & Status */}
  <div className="side-panel left-panel">
    <div className="data-node">
      <div className="status-indicator">
        <div className="blinking-dot"></div>
        <span>SYSTEM ONLINE</span>
      </div>
      <p className="sub-text">ACCEPTING NEW PROJECTS</p>
    </div>
    
    <div className="data-node">
      <span>SERVER NODE</span>
      <h3 className="glitch-text">INDIA // IST</h3>
      <p className="sub-text">LOCAL TIME: 12:01 PM</p>
    </div>
  </div>

  {/* CENTER: Your Existing Core */}
  <div className="contact-center">
    <h2 className="contact-title">
      INITIATE <br/> 
      <span className="outline-text">SEQUENCE</span>
    </h2>
    <IgnitionButton setCursorType={setCursorType} />
  </div>

 {/* RIGHT FLANK: Network Links with 3D Nodes */}
  <div className="side-panel right-panel">
    <a href="https://github.com/AK-projects88" target="_blank" rel="noreferrer" className="data-node link-node">
      <div className="link-content">
        <img src="/github.png" alt="GitHub" className="icon-3d" />
        <span>// GITHUB</span>
      </div>
      <div className="node-arrow">↗</div>
    </a>
    
    <a href="https://www.linkedin.com/in/ansh-jha-017683422/" target="_blank" rel="noreferrer" className="data-node link-node">
      <div className="link-content">
        <img src="/linkedin.png" alt="LinkedIn" className="icon-3d" />
        <span>// LINKEDIN</span>
      </div>
      <div className="node-arrow">↗</div>
    </a>
    
    <a href="https://x.com/AnshJha438115" target="_blank" rel="noreferrer" className="data-node link-node">
      <div className="link-content">
        <img src="/x.png" alt="X" className="icon-3d" />
        <span>// TWITTER_X</span>
      </div>
      <div className="node-arrow">↗</div>
    </a>
  </div>

</motion.section>

    </motion.div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              className="modal-content"
              layoutId={selectedProject.id} 
              onClick={(e) => e.stopPropagation()}
            >
              <MagneticButton 
                className="modal-close-btn" 
                onClick={() => setSelectedProject(null)}
                onMouseEnter={() => setCursorType('click')} 
                onMouseLeave={() => setCursorType('default')}
              >
                CLOSE [ X ]
              </MagneticButton>
              
              <motion.h2 layoutId={`title-${selectedProject.id}`} className="modal-title">
                {selectedProject.title}
              </motion.h2>
              <motion.p layoutId={`desc-${selectedProject.id}`} className="modal-subtitle">
                {selectedProject.desc}
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="modal-details"
              >
                <h3>Project Architecture</h3>
                <p>{selectedProject.detail}</p>
                <div className="modal-actions">
                  <MagneticButton className="case-study-btn" onClick={() => window.open(selectedProject.liveLink, "_blank")} onMouseEnter={() => setCursorType('click')} onMouseLeave={() => setCursorType('default')}>View Live Site</MagneticButton>
<MagneticButton className="case-study-btn outline" onClick={() => window.open(selectedProject.repoLink, "_blank")} onMouseEnter={() => setCursorType('click')} onMouseLeave={() => setCursorType('default')}>GitHub Repo</MagneticButton>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default App;