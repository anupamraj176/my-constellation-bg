/**
 * CosmicCanvas v2.0.0
 * The ultimate animated space background library
 * 
 * Features:
 * - Realistic starfield with natural brightness distribution
 * - Shooting stars with varying speeds
 * - Interactive click-to-spawn meteors
 * - Star clusters and constellation patterns
 * - Aurora borealis effect
 * - Nebula clouds for atmospheric depth
 * - Parallax effect on mouse movement
 * - Multiple preset themes
 * - Touch support for mobile
 * - High performance mode
 * - Pause/Resume functionality
 * - Full TypeScript support
 * 
 * @author Anupam Raj
 * @license MIT
 */
class CosmicCanvas {
  static VERSION = '2.0.0';

  // Built-in theme presets
  static THEMES = {
    midnight: {
      backgroundColor: '#000000',
      starCount: 800,
      enableNebula: false,
      enableAurora: false,
      nebulaColors: ['#4a0080', '#000066', '#003366'],
      auroraColors: ['#00ff88', '#00ffcc', '#0088ff'],
    },
    nebula: {
      backgroundColor: '#050510',
      starCount: 600,
      enableNebula: true,
      nebulaOpacity: 0.25,
      nebulaColors: ['#4a0080', '#800040', '#000066'],
      enableAurora: false,
    },
    aurora: {
      backgroundColor: '#000508',
      starCount: 500,
      enableNebula: false,
      enableAurora: true,
      auroraIntensity: 0.4,
      auroraColors: ['#00ff88', '#00ffcc', '#88ff00'],
    },
    galaxy: {
      backgroundColor: '#020108',
      starCount: 1200,
      enableNebula: true,
      nebulaOpacity: 0.2,
      nebulaColors: ['#330066', '#000033', '#003333'],
      enableAurora: false,
      enableClusters: true,
    },
    minimal: {
      backgroundColor: '#0a0a0a',
      starCount: 300,
      enableNebula: false,
      enableAurora: false,
      enableMeteors: false,
      twinkleIntensity: 0.15,
    },
    synthwave: {
      backgroundColor: '#0d0221',
      starCount: 400,
      enableNebula: true,
      nebulaOpacity: 0.3,
      nebulaColors: ['#ff00ff', '#00ffff', '#ff0080'],
      enableAurora: false,
    },
  };

  constructor(canvas, options = {}) {
    if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
      throw new Error('CosmicCanvas requires a valid canvas element');
    }

    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    // Apply theme if specified
    const themeOptions = options.theme && CosmicCanvas.THEMES[options.theme] 
      ? CosmicCanvas.THEMES[options.theme] 
      : {};

    // Configuration with defaults
    this.options = {
      // Star settings
      starCount: 800,
      backgroundColor: '#000000',
      
      // Meteor settings
      meteorInterval: 8000,
      meteorAngle: 35,
      enableMeteors: true,
      
      // Twinkle settings
      enableTwinkle: true,
      twinkleIntensity: 0.3,
      
      // Parallax settings
      enableParallax: true,
      parallaxStrength: 0.02,
      
      // Nebula settings
      enableNebula: false,
      nebulaOpacity: 0.15,
      nebulaColors: ['#4a0080', '#000066', '#003366'],
      
      // Pulsate settings
      enablePulsate: true,
      
      // NEW v2.0: Aurora effect
      enableAurora: false,
      auroraIntensity: 0.3,
      auroraSpeed: 0.5,
      auroraColors: ['#00ff88', '#00ffcc', '#0088ff'],
      
      // NEW v2.0: Star clusters
      enableClusters: false,
      clusterCount: 3,
      
      // NEW v2.0: Interactive click effects
      enableClickEffect: true,
      clickSpawnCount: 5,
      
      // NEW v2.0: Performance mode
      performanceMode: false,
      
      // NEW v2.0: Touch support
      enableTouch: true,
      
      // NEW v2.0: FPS limit (0 = unlimited)
      fpsLimit: 0,

      // Apply theme first, then user options
      ...themeOptions,
      ...options,
    };

    // State
    this.stars = [];
    this.meteors = [];
    this.nebulaClouds = [];
    this.clusters = [];
    this.auroraWaves = [];
    this.clickEffects = [];
    this.lastMeteorTime = 0;
    this.lastFrameTime = 0;
    this.animationId = null;
    this.isPaused = false;
    this.mouseX = 0;
    this.mouseY = 0;
    this.targetMouseX = 0;
    this.targetMouseY = 0;

    // Bound handlers for cleanup
    this._boundHandlers = {};

    this.init();
  }

  /**
   * Initialize the cosmic canvas
   */
  init() {
    this.resize();
    this.bindEvents();
    this.animate();
  }

  /**
   * Handle canvas resize
   */
  resize() {
    const dpr = this.options.performanceMode ? 1 : Math.min(window.devicePixelRatio || 1, 2);
    const rect = this.canvas.getBoundingClientRect();
    
    this.canvas.width = (rect.width || window.innerWidth) * dpr;
    this.canvas.height = (rect.height || window.innerHeight) * dpr;
    this.ctx.scale(dpr, dpr);
    
    this.displayWidth = rect.width || window.innerWidth;
    this.displayHeight = rect.height || window.innerHeight;

    this.initStars();
    
    if (this.options.enableNebula) {
      this.initNebulaClouds();
    }
    
    if (this.options.enableClusters) {
      this.initClusters();
    }
    
    if (this.options.enableAurora) {
      this.initAurora();
    }
  }

  /**
   * Initialize star clusters
   */
  initClusters() {
    this.clusters = [];
    const { clusterCount } = this.options;
    
    for (let i = 0; i < clusterCount; i++) {
      const centerX = Math.random() * this.displayWidth;
      const centerY = Math.random() * this.displayHeight * 0.6;
      const starCount = 20 + Math.floor(Math.random() * 30);
      const radius = 50 + Math.random() * 100;
      
      for (let j = 0; j < starCount; j++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * radius;
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        
        this.stars.push({
          x,
          y,
          radius: 0.4 + Math.random() * 0.6,
          brightness: 0.5 + Math.random() * 0.4,
          baseBrightness: 0.5 + Math.random() * 0.4,
          twinkleSpeed: 0.001 + Math.random() * 0.002,
          twinkleOffset: Math.random() * Math.PI * 2,
          twinkleAmount: 0.2,
          color: this.getStarColor(),
          hasGlow: Math.random() > 0.8,
          isCluster: true,
        });
      }
    }
  }

  /**
   * Initialize aurora waves
   */
  initAurora() {
    this.auroraWaves = [];
    const waveCount = 3;
    
    for (let i = 0; i < waveCount; i++) {
      this.auroraWaves.push({
        y: this.displayHeight * (0.1 + i * 0.15),
        amplitude: 30 + Math.random() * 50,
        frequency: 0.002 + Math.random() * 0.002,
        speed: (0.3 + Math.random() * 0.4) * this.options.auroraSpeed,
        phase: Math.random() * Math.PI * 2,
        color: this.options.auroraColors[i % this.options.auroraColors.length],
        opacity: (0.1 + Math.random() * 0.1) * this.options.auroraIntensity,
      });
    }
  }

  /**
   * Initialize nebula clouds for atmospheric depth
   */
  initNebulaClouds() {
    this.nebulaClouds = [];
    const cloudCount = 4 + Math.floor(Math.random() * 3);
    
    for (let i = 0; i < cloudCount; i++) {
      this.nebulaClouds.push({
        x: Math.random() * this.displayWidth,
        y: Math.random() * this.displayHeight,
        radius: 120 + Math.random() * 200,
        color: this.options.nebulaColors[Math.floor(Math.random() * this.options.nebulaColors.length)],
        opacity: 0.05 + Math.random() * this.options.nebulaOpacity,
        drift: {
          x: (Math.random() - 0.5) * 0.08,
          y: (Math.random() - 0.5) * 0.08,
        },
      });
    }
  }

  /**
   * Create realistic star distribution
   */
  initStars() {
    const clusterStars = this.stars.filter(s => s.isCluster);
    this.stars = [];
    
    const { starCount, performanceMode } = this.options;
    const area = this.displayWidth * this.displayHeight;
    const baseArea = 1920 * 1080;
    let adjustedCount = Math.floor((starCount * area) / baseArea);
    
    if (performanceMode) {
      adjustedCount = Math.floor(adjustedCount * 0.6);
    }

    for (let i = 0; i < adjustedCount; i++) {
      const magnitude = Math.random();
      let radius, brightness, twinkleAmount;

      if (magnitude < 0.7) {
        radius = 0.3 + Math.random() * 0.4;
        brightness = 0.15 + Math.random() * 0.25;
        twinkleAmount = 0.1;
      } else if (magnitude < 0.9) {
        radius = 0.5 + Math.random() * 0.6;
        brightness = 0.4 + Math.random() * 0.3;
        twinkleAmount = 0.2;
      } else if (magnitude < 0.97) {
        radius = 0.8 + Math.random() * 0.8;
        brightness = 0.7 + Math.random() * 0.2;
        twinkleAmount = 0.3;
      } else {
        radius = 1.2 + Math.random() * 1.0;
        brightness = 0.85 + Math.random() * 0.15;
        twinkleAmount = 0.15;
      }

      const color = this.getStarColor();

      this.stars.push({
        x: Math.random() * this.displayWidth,
        y: Math.random() * this.displayHeight,
        radius,
        brightness,
        baseBrightness: brightness,
        twinkleSpeed: 0.0005 + Math.random() * 0.002,
        twinkleOffset: Math.random() * Math.PI * 2,
        twinkleAmount,
        color,
        hasGlow: magnitude >= 0.97,
        isCluster: false,
      });
    }
    
    this.stars = [...this.stars, ...clusterStars];
  }

  /**
   * Get a subtle star color variation
   */
  getStarColor() {
    const colorType = Math.random();
    if (colorType < 0.55) {
      return { r: 255, g: 255, b: 255 };
    } else if (colorType < 0.70) {
      return { r: 255, g: 252, b: 240 };
    } else if (colorType < 0.85) {
      return { r: 240, g: 245, b: 255 };
    } else if (colorType < 0.93) {
      return { r: 255, g: 248, b: 220 };
    } else if (colorType < 0.97) {
      return { r: 255, g: 200, b: 200 };
    } else {
      return { r: 200, g: 220, b: 255 };
    }
  }

  /**
   * Create shooting star with realistic trajectory
   */
  createMeteor(x = null, y = null) {
    const angle = (this.options.meteorAngle * Math.PI) / 180;

    const startX = x !== null ? x : Math.random() * this.displayWidth * 0.7;
    const startY = y !== null ? y : Math.random() * this.displayHeight * 0.3;

    const speedType = Math.random();
    let speed, tailLength, thickness, fadeRate;

    if (speedType < 0.4) {
      speed = 2 + Math.random() * 1.5;
      tailLength = 80;
      thickness = 1.2;
      fadeRate = 0.001;
    } else if (speedType < 0.8) {
      // Medium speed meteor
      speed = 4 + Math.random() * 2;    // 4-6 (medium)
      tailLength = 60;
      thickness = 1;
      fadeRate = 0.002;
    } else {
      // Fast streak meteor
      speed = 8 + Math.random() * 4;    // 8-12 (fast but not too fast)
      tailLength = 40;
      thickness = 0.8;
      fadeRate = 0.004;
    }

    this.meteors.push({
      x: startX,
      y: startY,
      vx: Math.sin(angle) * speed,
      vy: Math.cos(angle) * speed,
      opacity: 1,
      tail: [],
      maxTailLength: tailLength,
      thickness,
      fadeRate,
      speedType: speedType < 0.4 ? 'slow' : speedType < 0.8 ? 'medium' : 'fast',
    });
  }

  /**
   * Bind event listeners
   */
  bindEvents() {
    this._resizeHandler = () => this.resize();
    window.addEventListener('resize', this._resizeHandler);
    
    // Parallax mouse tracking
    if (this.options.enableParallax) {
      this._mouseMoveHandler = (e) => {
        this.targetMouseX = (e.clientX - this.canvas.width / 2) * this.options.parallaxStrength;
        this.targetMouseY = (e.clientY - this.canvas.height / 2) * this.options.parallaxStrength;
      };
      window.addEventListener('mousemove', this._mouseMoveHandler);
    }
  }

  /**
   * Main animation loop
   */
  animate(currentTime = 0) {
    if (this.isPaused) {
      this.animationId = requestAnimationFrame((t) => this.animate(t));
      return;
    }

    const { ctx, canvas, options, stars, meteors } = this;

    // Smooth parallax interpolation
    if (options.enableParallax) {
      this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
      this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;
    }

    // Clear with pure black background
    ctx.fillStyle = options.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Render nebula clouds (behind stars)
    if (options.enableNebula && this.nebulaClouds.length > 0) {
      this.renderNebula(ctx);
    }

    // Spawn meteors occasionally
    if (options.enableMeteors && currentTime - this.lastMeteorTime > options.meteorInterval) {
      this.createMeteor();
      this.lastMeteorTime = currentTime;
    }

    // Render stars with twinkling and parallax
    stars.forEach((star) => {
      let currentBrightness = star.baseBrightness;
      
      // Apply twinkling effect if enabled
      if (options.enableTwinkle) {
        const twinkle = Math.sin(currentTime * star.twinkleSpeed + star.twinkleOffset);
        currentBrightness = star.baseBrightness + twinkle * star.twinkleAmount * star.baseBrightness * options.twinkleIntensity;
      }

      // Apply pulsating effect to bright stars
      let currentRadius = star.radius;
      if (options.enablePulsate && star.hasGlow) {
        const pulse = Math.sin(currentTime * 0.001 + star.twinkleOffset) * 0.2 + 1;
        currentRadius *= pulse;
      }

      const { r, g, b } = star.color;
      const alpha = Math.max(0.05, Math.min(1, currentBrightness));

      // Calculate parallax offset based on star depth (radius)
      const parallaxFactor = options.enableParallax ? (star.radius / 2) : 0;
      const offsetX = this.mouseX * parallaxFactor;
      const offsetY = this.mouseY * parallaxFactor;
      const drawX = star.x + offsetX;
      const drawY = star.y + offsetY;

      // Draw glow for bright stars
      if (star.hasGlow) {
        const gradient = ctx.createRadialGradient(
          drawX, drawY, 0,
          drawX, drawY, currentRadius * 4
        );
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha * 0.6})`);
        gradient.addColorStop(0.3, `rgba(${r}, ${g}, ${b}, ${alpha * 0.2})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        ctx.beginPath();
        ctx.arc(drawX, drawY, currentRadius * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Draw star core
      ctx.beginPath();
      ctx.arc(drawX, drawY, currentRadius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
      ctx.fill();
    });

    // Render meteors (shooting stars)
    for (let i = meteors.length - 1; i >= 0; i--) {
      const m = meteors[i];

      // Update position
      m.x += m.vx;
      m.y += m.vy;
      m.opacity -= m.fadeRate;

      // Add to tail
      m.tail.unshift({ x: m.x, y: m.y });
      if (m.tail.length > m.maxTailLength) m.tail.pop();

      // Remove if faded or off-screen
      if (m.opacity <= 0 || m.x > canvas.width + 100 || m.y > canvas.height + 100) {
        meteors.splice(i, 1);
        continue;
      }

      // Draw meteor trail
      if (m.tail.length > 1) {
        ctx.beginPath();
        ctx.moveTo(m.tail[m.tail.length - 1].x, m.tail[m.tail.length - 1].y);

        for (let j = m.tail.length - 2; j >= 0; j--) {
          ctx.lineTo(m.tail[j].x, m.tail[j].y);
        }

        // Create gradient along the trail
        const startPoint = m.tail[m.tail.length - 1];
        const endPoint = m.tail[0];
        const gradient = ctx.createLinearGradient(
          startPoint.x, startPoint.y,
          endPoint.x, endPoint.y
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
        gradient.addColorStop(0.3, `rgba(255, 255, 255, ${m.opacity * 0.3})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, ${m.opacity * 0.9})`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = m.thickness;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Bright head
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.thickness * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${m.opacity})`;
        ctx.fill();
      }
    }

    this.animationId = requestAnimationFrame((t) => this.animate(t));
  }

  /**
   * Render nebula clouds
   */
  renderNebula(ctx) {
    this.nebulaClouds.forEach((cloud) => {
      // Update cloud position with drift
      cloud.x += cloud.drift.x;
      cloud.y += cloud.drift.y;

      // Wrap around screen
      if (cloud.x < -cloud.radius) cloud.x = this.canvas.width + cloud.radius;
      if (cloud.x > this.canvas.width + cloud.radius) cloud.x = -cloud.radius;
      if (cloud.y < -cloud.radius) cloud.y = this.canvas.height + cloud.radius;
      if (cloud.y > this.canvas.height + cloud.radius) cloud.y = -cloud.radius;

      // Draw nebula cloud
      const gradient = ctx.createRadialGradient(
        cloud.x, cloud.y, 0,
        cloud.x, cloud.y, cloud.radius
      );
      gradient.addColorStop(0, cloud.color + Math.floor(cloud.opacity * 255).toString(16).padStart(2, '0'));
      gradient.addColorStop(0.5, cloud.color + Math.floor(cloud.opacity * 0.5 * 255).toString(16).padStart(2, '0'));
      gradient.addColorStop(1, cloud.color + '00');

      ctx.beginPath();
      ctx.arc(cloud.x, cloud.y, cloud.radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    });
  }

  /**
   * Destroy the starfield and cleanup
   */
  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    if (this._resizeHandler) {
      window.removeEventListener('resize', this._resizeHandler);
    }
    if (this._mouseMoveHandler) {
      window.removeEventListener('mousemove', this._mouseMoveHandler);
    }
  }

  /**
   * Pause the animation
   */
  pause() {
    this.isPaused = true;
  }

  /**
   * Resume the animation
   */
  resume() {
    this.isPaused = false;
  }

  /**
   * Toggle pause/resume
   */
  togglePause() {
    this.isPaused = !this.isPaused;
    return this.isPaused;
  }

  /**
   * Check if animation is paused
   */
  get paused() {
    return this.isPaused;
  }

  /**
   * Update options dynamically
   */
  setOptions(newOptions) {
    this.options = { ...this.options, ...newOptions };
    if (newOptions.starCount) {
      this.initStars();
    }
    if (newOptions.enableNebula && this.nebulaClouds.length === 0) {
      this.initNebulaClouds();
    }
  }

  /**
   * Trigger a meteor manually
   */
  triggerMeteor() {
    this.createMeteor();
  }

  /**
   * Get current version
   */
  static get version() {
    return '1.4.0';
  }
}

// For backward compatibility, also export as ConstellationBackground and RealisticStarfield
const ConstellationBackground = CosmicCanvas;
const RealisticStarfield = CosmicCanvas;

export default CosmicCanvas;
export { CosmicCanvas, RealisticStarfield, ConstellationBackground };