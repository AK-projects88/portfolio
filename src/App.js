import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence, useMotionTemplate, useReducedMotion, useScroll } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Mousewheel, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import Lenis from '@studio-freight/lenis';
import idFront from './my-id-front.png';
import idBack from './my-id-back.png';
import nexusImg from './nexus.png';
import gigImg from './gig.png';
import yatraImg from './yatra.png';
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
    const pullX = (e.clientX - centerX) * 0.35; 
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

// --- THE X10THINK 3D DUAL-SIDED CARD ENGINE ---
const IDCardEngine = ({ setCursorType }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(y, [-200, 200], [15, -15]), { stiffness: 200, damping: 20, mass: 1.5 });
  const rotateYDrag = useSpring(useTransform(x, [-200, 200], [-15, 15]), { stiffness: 200, damping: 20, mass: 1.5 });

  const lightX = useSpring(useTransform(x, [-200, 200], [150, -50]), { stiffness: 150, damping: 20 });
  const lightY = useSpring(useTransform(y, [-200, 200], [150, -50]), { stiffness: 150, damping: 20 });
  
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${lightX}% ${lightY}%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 25%)`;

  return (
    <div className="id-card-3d-perspective">
      <motion.div 
        className="id-card-physics-body"
        style={{ x, y, rotateX, rotateY: rotateYDrag }}
        drag
        dragElastic={0.12} 
        dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
        onMouseEnter={() => setCursorType('drag')}
        onMouseLeave={() => setCursorType('default')}
        onClick={() => setIsFlipped(!isFlipped)} 
      >
        <div className="lanyard-thread"></div>

        <div className="hardware-clip">
          <div className="hardware-hole"></div>
        </div>
        <div className="hardware-slot"></div>

        <motion.div 
          className="id-card-flip-container"
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 18, mass: 1.2 }}
        >
          {/* FRONT */}
          <div className="id-card-face id-card-front">
            <img src={idFront} alt="ID Front" />
            <motion.div className="glare-overlay" style={{ background: glareBackground }} />
          </div>
          
          {/* BACK */}
          <div className="id-card-face id-card-back">
            <img src={idBack} alt="ID Back" />
            <motion.div className="glare-overlay" style={{ background: glareBackground }} />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [bootText, setBootText] = useState('COMPILING...');
  const [activeTab, setActiveTab] = useState('Projects');
  const [cursorType, setCursorType] = useState('default');
 
  const [selectedProject, setSelectedProject] = useState(null);
  const [isCanvasMounted, setIsCanvasMounted] = useState(false);
  
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const projectsData = [
    { 
      id: 'p1', 
      title: 'NEXUS_TACTICAL_COMMAND // V.1.0', 
      desc: 'Real-time offline-first mesh network simulator for Society 5.0 disaster infrastructure.', 
      detail: 'Engineered a Full-Stack geospatial command center utilizing a Node.js/Express backend. Implemented Socket.io for bidirectional WebSocket telemetry with zero-latency updates. The frontend utilizes Leaflet.js and CartoDB dark matter tiles.',
      image: nexusImg, 
      liveLink: 'https://nexus-command-erjn.onrender.com',
      repoLink: 'https://github.com/AK-projects88/nexus-mesh-network'
    },
    { 
      id: 'p2', 
      title: 'SWARM_DISPATCH_ENGINE // V.04-26', 
      desc: 'Micro-economic systems analysis.', 
      detail: 'Mapped high-density delivery routes and analyzed fleet telemetry arrays. Captured real-world node verification sequences from March 2026 through active fleet saturation in April 2026.',
      image: gigImg 
    },
    { 
      id: 'p3', 
      title: 'YATRA_EXCHANGE // V.11-25', 
      desc: 'Cross-cultural field studies portal.', 
      detail: 'Designed and developed a full-stack portal connecting field researchers with optimal deployment regions. System handled initial volunteer exchange program routing launched on November 16, 2025.',
      image: yatraImg 
    }
  ];

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 28 });

  const t1X = useSpring(cursorX, { stiffness: 350, damping: 24 });
  const t1Y = useSpring(cursorY, { stiffness: 350, damping: 24 });
  const t2X = useSpring(t1X, { stiffness: 220, damping: 20 });
  const t2Y = useSpring(t1Y, { stiffness: 220, damping: 20 });
  const t3X = useSpring(t2X, { stiffness: 140, damping: 16 });
  const t3Y = useSpring(t2Y, { stiffness: 140, damping: 16 });

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  const cursorVariants = {
    default: { width: 20, height: 20, backgroundColor: "#ffffff", border: "0px solid #ffffff", mixBlendMode: "difference", color: "transparent" },
    click: { width: 65, height: 65, backgroundColor: "#ffffff", border: "0px solid #ffffff", mixBlendMode: "normal", color: "#000000" },
    drag: { width: 80, height: 80, backgroundColor: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.5)", backdropFilter: "blur(4px)", mixBlendMode: "normal", color: "#ffffff" }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.05 } }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 35, 
      filter: "blur(12px)",
      scale: shouldReduceMotion ? 1 : 0.95 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      scale: 1,
      transition: { type: "spring", stiffness: 90, damping: 14, duration: shouldReduceMotion ? 0.1 : undefined }
    }
  };

  const loadStaggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } }
  };

  const loadStaggerItem = {
    hidden: { opacity: 0, y: 50, filter: "blur(15px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 70, damping: 15 } }
  };

  useEffect(() => {
    // 1. Text swaps to ACCESS GRANTED after just 0.8 seconds
    const textTimer = setTimeout(() => setBootText('ACCESS GRANTED'), 800);
    
    // 2. Preloader completely disappears at 1.5 seconds
    const timer = setTimeout(() => {
      setIsLoading(false); 
      // Mount the heavy 3D canvas right after the veil lifts
      setTimeout(() => setIsCanvasMounted(true), 300); 
    }, 1500);
    
    return () => { clearTimeout(timer); clearTimeout(textTimer); };
  }, []);

  const canvasRef = useRef(null);
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5, 
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1, 
      smoothTouch: false, 
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => { lenis.destroy(); };
  }, []);

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

    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e) => {
      mouse.targetX = (e.clientX - canvas.width / 2) * 0.05;
      mouse.targetY = (e.clientY - canvas.height / 2) * 0.05;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let time = 0;

    const render = () => {
      time += 0.02; 
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const fov = 400; 
      const cols = 25; 
      const rows = 25; 
      const spacing = 75; 
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
            let size = Math.max(1.2, scale * 2.5); 
            let alpha = Math.max(0.1, Math.min(1, scale * 3.0)); 

            ctx.fillStyle = `rgba(184, 247, 228, ${alpha})`; 
            ctx.fillRect(screenX, screenY, size, size); 
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
  }, [isCanvasMounted]); 

  const scrollToSection = (sectionId) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(`#${sectionId}`, {
        offset: -100, 
        duration: 2,  
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    } else {
      const section = document.getElementById(sectionId);
      if (section) { section.scrollIntoView({ behavior: 'smooth' }); }
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            className="preloader"
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <div className="preloader-text">{bootText}</div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div className="scroll-progress-bar" style={{ scaleX: scrollYProgress }} />

      <div className="noise-overlay"></div>
      
      <motion.div className="custom-cursor" style={{ x: springX, y: springY }} variants={cursorVariants} animate={cursorType} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
        {cursorType === 'click' ? 'CLICK' : cursorType === 'drag' ? 'DRAG' : ''}
      </motion.div>

      {[
        { x: t1X, y: t1Y, scale: 0.85, opacity: 0.75 },
        { x: t2X, y: t2Y, scale: 0.60, opacity: 0.45 },
        { x: t3X, y: t3Y, scale: 0.35, opacity: 0.20 }
      ].map((trail, idx) => (
        <motion.div
          key={idx}
          className="custom-cursor-trail"
          style={{ x: trail.x, y: trail.y, scale: trail.scale, opacity: trail.opacity, willChange: "transform" }}
        />
      ))}

      {isCanvasMounted && <canvas ref={canvasRef} className="kinetic-canvas"></canvas>}
      <div className="contrast-overlay"></div>


      {/* THE FIX: Nav Bar moved OUTSIDE the app-wrapper so it stays permanently fixed */}
      <motion.nav 
        className="nav-bar" 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
      >
        <div className="nav-logo">ANSH.JHA</div>
        <div className="nav-links">
          <MagneticButton className="nav-link" onClick={() => scrollToSection('work')} onMouseEnter={() => setCursorType('click')} onMouseLeave={() => setCursorType('default')}>Work</MagneticButton>
          <MagneticButton className="nav-link" onClick={() => scrollToSection('about')} onMouseEnter={() => setCursorType('click')} onMouseLeave={() => setCursorType('default')}>About</MagneticButton>
          <MagneticButton className="nav-link" onClick={() => scrollToSection('contact')} onMouseEnter={() => setCursorType('click')} onMouseLeave={() => setCursorType('default')}>Contact</MagneticButton>
        </div>
      </motion.nav>

      <motion.div 
        className="app-wrapper"
        variants={loadStaggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.section className="hero-section" variants={loadStaggerItem}>
          <div>
            <h1 className="hero-title">
              <span className="solid-text">
                <DecoderText text="FRONTEND" delay={2600} />
              </span>
              <span className="outline-text">
                <DecoderText text="DEVELOPER" delay={3200} />
              </span>
            </h1>
            <p className="hero-subtext">
              I turn mathematical models into interfaces you can actually feel — built with React, Three.js, and motion physics.
            </p>

            <div className="cta-command-center">
              <MagneticButton 
                className="btn btn-primary"
                onClick={() => scrollToSection('work')}
                onMouseEnter={() => setCursorType('click')} 
                onMouseLeave={() => setCursorType('default')}
              >
                VIEW_PROJECTS
              </MagneticButton>
              <button className="escape-hatch-link" onClick={() => scrollToSection('work')}>
                // ACCESS_ARCHIVE
              </button>
            </div>
          </div>
          <IDCardEngine setCursorType={setCursorType} />
        </motion.section>

        <motion.section id="work" className="portfolio-section" variants={loadStaggerItem}>
          <div className="tab-container">
            {['Projects', 'Certificates', 'Tech Stack'].map((tabName) => (
              <MagneticButton
                key={tabName}
                className={`btn btn-ghost ${activeTab === tabName ? 'active' : ''}`}
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
              mousewheel={{ forceToAxis: true }} 
              pagination={{ clickable: true, dynamicBullets: true }} 
              coverflowEffect={{
                rotate: 35,       
                stretch: 0,       
                depth: 250,       
                modifier: 1,
                slideShadows: false, 
              }}
              modules={[EffectCoverflow, Mousewheel, Pagination]}
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
                      <div className="project-image-container">
                        <img src={project.image} alt={project.title} className="project-image-3d" />
                      </div>
                      <div className="project-text-zone">
                        <motion.h3 layoutId={`title-${project.id}`}>{project.title}</motion.h3>
                        <motion.p layoutId={`desc-${project.id}`}>{project.desc}</motion.p>
                      </div>
                    </MagneticBox>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </motion.section> 

        <motion.div className="marquee-container" variants={loadStaggerItem}>
          <div className="marquee-track">
            <h1>REACT • THREE.JS • FRAMER MOTION • TYPESCRIPT • NODE.JS • REACT • THREE.JS • FRAMER MOTION • TYPESCRIPT • NODE.JS •</h1>
          </div>
        </motion.div>

        <motion.section id="about" className="about-section" variants={loadStaggerItem}>
          <div className="about-grid">
            <div className="about-header">
              <h2>01 <br/> <span className="outline-text">THE</span><br/> PHILOSOPHY</h2>
            </div>
            <div className="about-text">
              <p>I turn mathematical models into interfaces you can actually feel — built with React, Three.js, and motion physics.</p>
              <p>I'm a frontend developer who builds interactive, motion-heavy interfaces using React, Three.js, and Framer Motion. I care about the small stuff — 60fps animations, clean component structure, load times that don't make you wait.<br/><br/>// If it's not fast and it's not clean, it's not done.</p>
            </div>
          </div>
        </motion.section>

        <motion.section id="contact" className="contact-command-center" variants={loadStaggerItem}>
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

          <div className="contact-center">
            <h2 className="contact-title">
              INITIATE <br/> 
              <span className="outline-text">SEQUENCE</span>
            </h2>
            <MagneticButton 
              className="btn btn-primary"
              onClick={() => window.location.href = "mailto:anshfyp88@gmail.com"}
              onMouseEnter={() => setCursorType('click')}
              onMouseLeave={() => setCursorType('default')}
              style={{ fontSize: '1.25rem', padding: '24px 48px', marginTop: '20px', textTransform: 'lowercase' }}
            >
              anshfyp88@gmail.com
            </MagneticButton>
          </div>

          <div className="side-panel right-panel">
            <a href="https://github.com/AK-projects88" target="_blank" rel="noreferrer" className="data-node link-node">
              <div className="link-content">
                <img src="/github.png" alt="GitHub" className="icon-3d" />
                <span>// GITHUB</span>
              </div>
            </a>
            <a href="https://www.linkedin.com/in/ansh-jha-017683422/" target="_blank" rel="noreferrer" className="data-node link-node">
              <div className="link-content">
                <img src="/linkedin.png" alt="LinkedIn" className="icon-3d" />
                <span>// LINKEDIN</span>
              </div>
            </a>
            <a href="https://x.com/AnshJha438115" target="_blank" rel="noreferrer" className="data-node link-node">
              <div className="link-content">
                <img src="/x.png" alt="X" className="icon-3d" />
                <span>// TWITTER_X</span>
              </div>
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
                  <MagneticButton className="btn btn-primary" onClick={() => window.open(selectedProject.liveLink, "_blank")} onMouseEnter={() => setCursorType('click')} onMouseLeave={() => setCursorType('default')}>View Live Site</MagneticButton>
                  <MagneticButton className="btn btn-ghost" onClick={() => window.open(selectedProject.repoLink, "_blank")} onMouseEnter={() => setCursorType('click')} onMouseLeave={() => setCursorType('default')}>GitHub Repo</MagneticButton>
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