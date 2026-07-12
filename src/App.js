import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
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

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

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
  };

  const handleMouseLeave = () => {
    x.set(0); 
    y.set(0);
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
        transformStyle: "preserve-3d" 
      }}
    >
      <div className="magnetic-content">
        {children}
      </div>
    </motion.div>
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
  // --- THE X100 AUDIO ENGINE (PASTE THIS HERE) ---
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  // --- END OF AUDIO ENGINE ---
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Projects');
  const [cursorType, setCursorType] = useState('default');
  const [viewMode, setViewMode] = useState('desktop'); 
  const [selectedProject, setSelectedProject] = useState(null);

  const projectsData = [
    { id: 'p1', title: 'Backcast Dashboard', desc: 'Global GDP mathematical projection model.', detail: 'Engineered a highly complex React architecture to process and visualize real-time economic datasets using advanced state management.' },
    { id: 'p2', title: 'Gig Economy Logistics', desc: 'Micro-economic systems analysis.', detail: 'Mapped high-density delivery routes and analyzed algorithmic efficiency in urban gig-economy environments.' },
    { id: 'p3', title: 'Volunteer Yatra', desc: 'Cross-cultural field studies portal.', detail: 'Designed and developed a full-stack portal connecting volunteers to rural initiatives, focusing on accessible UI/UX.' }
  ];

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 28 });

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

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  // --- THE X10THINK KINETIC MATH GRID ENGINE ---
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; 

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gridSize = 40; 
      const cols = Math.floor(canvas.width / gridSize) + 1;
      const rows = Math.floor(canvas.height / gridSize) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          let x = i * gridSize;
          let y = j * gridSize;

          let dx = mouse.x - x;
          let dy = mouse.y - y;
          let dist = Math.sqrt(dx * dx + dy * dy);

          let maxDist = 200; 
          let pull = 0;
          if (dist < maxDist) { pull = (maxDist - dist) / maxDist; }

          ctx.save();
          let shiftX = dist === 0 ? 0 : (dx / dist) * pull * -25;
          let shiftY = dist === 0 ? 0 : (dy / dist) * pull * -25;

          ctx.translate(x + shiftX, y + shiftY);
          ctx.rotate(pull * Math.PI);
          
          ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + pull * 0.7})`; 
          ctx.font = "12px 'Space Grotesk', monospace";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          
          ctx.fillText("+", 0, 0); 
          ctx.restore();
        }
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isLoading]);

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

      <div className="glow-orb"></div>
      <canvas ref={canvasRef} className="kinetic-canvas"></canvas>

      <div className="view-toggle">
        {['desktop', 'tablet', 'mobile'].map((mode) => (
          <button
            key={mode}
            className={`view-btn ${viewMode === mode ? 'active' : ''}`}
            onClick={() => setViewMode(mode)}
            onMouseEnter={() => setCursorType('click')}
            onMouseLeave={() => setCursorType('default')}
          >
            {mode === 'desktop' ? 'LAPTOP' : mode.toUpperCase()}
          </button>
        ))}
      </div>

      <div className={`app-wrapper ${viewMode}`}>
        
        <nav className="nav-bar">
          <div className="nav-logo">ANSH.JHA</div>
          <div className="nav-links">
            <div className="nav-link" onClick={() => scrollToSection('work')} onMouseEnter={() => setCursorType('click')} onMouseLeave={() => setCursorType('default')}>Work</div>
            <div className="nav-link" onClick={() => scrollToSection('about')} onMouseEnter={() => setCursorType('click')} onMouseLeave={() => setCursorType('default')}>About</div>
            <div className="nav-link" onClick={() => scrollToSection('contact')} onMouseEnter={() => setCursorType('click')} onMouseLeave={() => setCursorType('default')}>Contact</div>
          </div>
        </nav>

        <section className="hero-section">
          <div>
            <h1 className="hero-title">
              <DecoderText text="FRONTEND" delay={2600} /><br />
              <span className="outline-text">
                <DecoderText text="DEVELOPER" delay={3200} />
              </span>
            </h1>
            <p className="hero-subtext">
              I build interactive digital experiences through mathematical modeling, strategy, and high-performance code.
            </p>
          </div>

          <motion.div 
            className="id-card-wrapper"
            style={{ x: dragX, rotate: rotate, transformOrigin: "top center" }}
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
        </section>

        <section id="work" className="portfolio-section">
          <div className="tab-container">
            {['Projects', 'Certificates', 'Tech Stack'].map((tabName) => (
              <button
                key={tabName}
                className={`tab-button ${activeTab === tabName ? 'active' : ''}`}
                onClick={() => setActiveTab(tabName)}
                onMouseEnter={() => setCursorType('click')}
                onMouseLeave={() => setCursorType('default')}
              >
                {tabName}
              </button>
            ))}
          </div>

          <div className="bento-grid">
            {activeTab === 'Projects' && projectsData.map((project) => (
              <MagneticBox 
                key={project.id}
                layoutId={project.id} 
                onClick={() => setSelectedProject(project)} 
                setCursorType={setCursorType}
              >
                <motion.h3 layoutId={`title-${project.id}`}>{project.title}</motion.h3>
                <motion.p layoutId={`desc-${project.id}`} style={{color: '#888', marginTop: '10px'}}>
                  {project.desc}
                </motion.p>
              </MagneticBox>
            ))}

            {activeTab === 'Certificates' && (
              <>
                <motion.div className="bento-box" onMouseEnter={() => setCursorType('click')} onMouseLeave={() => setCursorType('default')} initial={{opacity: 0, y: 30}} animate={{opacity: 1, y: 0}}>
                  <h3>React Architecture</h3>
                  <p style={{color: '#888', marginTop: '10px'}}>Advanced Front-End Systems.</p>
                </motion.div>
              </>
            )}

            {activeTab === 'Tech Stack' && (
              <>
                <motion.div className="bento-box" onMouseEnter={() => setCursorType('click')} onMouseLeave={() => setCursorType('default')} initial={{opacity: 0, y: 30}} animate={{opacity: 1, y: 0}}><h3>React.js</h3></motion.div>
              </>
            )}
          </div>
        </section>

        <div className="marquee-container">
          <div className="marquee-track">
            <h1>SOFTWARE ENGINEER • MATHEMATICAL STRATEGIST • SYSTEM ARCHITECT • SOFTWARE ENGINEER • MATHEMATICAL STRATEGIST • SYSTEM ARCHITECT •</h1>
          </div>
        </div>

        <section id="about" className="about-section">
          <div className="about-grid">
            <div className="about-header">
              <h2>01 <br/> <span className="outline-text">THE</span><br/> PHILOSOPHY</h2>
            </div>
            <div className="about-text">
              <p>I don't just write code. I engineer digital physics.</p>
              <p>Specializing in bridging the gap between heavy mathematical models and hyper-fluid user interfaces. I build systems that don't just work—they feel alive. If an architecture isn't beautiful on a microscopic level, it isn't finished.</p>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <h2 className="contact-title">INITIATE <br/> <span className="outline-text">SEQUENCE</span></h2>
          <IgnitionButton setCursorType={setCursorType} />
        </section>

      </div>

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
              <button 
                className="modal-close-btn" 
                onClick={() => setSelectedProject(null)}
                onMouseEnter={() => setCursorType('click')} 
                onMouseLeave={() => setCursorType('default')}
              >
                CLOSE [ X ]
              </button>
              
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
                  <button className="case-study-btn" onMouseEnter={() => setCursorType('click')} onMouseLeave={() => setCursorType('default')}>View Live Site</button>
                  <button className="case-study-btn outline" onMouseEnter={() => setCursorType('click')} onMouseLeave={() => setCursorType('default')}>GitHub Repo</button>
                  {/* ... this is all your other website code like the id-card ... */}
      
      {/* --- PASTE THE BUTTON EXACTLY HERE --- */}
      <audio ref={audioRef} loop src="/tokyo-drift.mp3" />
      <button className="cyber-audio-btn" onClick={toggleMusic}>
        {isPlaying ? '🔊 DRIFTING' : '🔇 INIT AUDIO'}
      </button>

    
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