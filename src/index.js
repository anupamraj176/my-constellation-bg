/**
 * RealisticStarfield
 * Creates a realistic night sky background inspired by actual star photography
 * Features:
 * - Dense starfield with natural brightness distribution
 * - Subtle twinkling animation
 * - Shooting stars with varying speeds (slow, medium, fast)
 * - Pure black deep space background
 * - No constellation lines for realistic appearance
 */
class RealisticStarfield {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    // Configuration for realistic starfield
    this.options = {
      // Star density - more stars for realistic look
      starCount: 800,
      // Background - pure black like deep space
      backgroundColor: '#000000',
      // Shooting star timing
      meteorInterval: 8000,
      // Fixed meteor angle (diagonal)
      meteorAngle: 35,
      // Enable/disable shooting stars
      enableMeteors: true,
      // Enable/disable twinkling
      enableTwinkle: true,
      // Twinkle intensity (0-1)
      twinkleIntensity: 0.3,
      ...options,
    };

    this.stars = [];
    this.meteors = [];
    this.lastMeteorTime = 0;
    this.animationId = null;

    this.init();
  }

  /**
   * Initialize the starfield
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
    this.canvas.width = this.canvas.offsetWidth || window.innerWidth;
    this.canvas.height = this.canvas.offsetHeight || window.innerHeight;
    this.initStars();
  }

  /**
   * Create realistic star distribution
   * Most stars are tiny and dim, few are bright (like real night sky)
   */
  initStars() {
    this.stars = [];
    const { starCount } = this.options;
    const area = this.canvas.width * this.canvas.height;
    // Adjust star count based on screen size for consistent density
    const adjustedCount = Math.floor((starCount * area) / (1920 * 1080));

    for (let i = 0; i < adjustedCount; i++) {
      // Realistic magnitude distribution (most stars are dim)
      const magnitude = Math.random();
      let radius, brightness, twinkleAmount;

      if (magnitude < 0.7) {
        // 70% - Very dim, tiny stars (like distant stars)
        radius = 0.3 + Math.random() * 0.4;
        brightness = 0.15 + Math.random() * 0.25;
        twinkleAmount = 0.1;
      } else if (magnitude < 0.9) {
        // 20% - Medium stars
        radius = 0.5 + Math.random() * 0.6;
        brightness = 0.4 + Math.random() * 0.3;
        twinkleAmount = 0.2;
      } else if (magnitude < 0.97) {
        // 7% - Bright stars
        radius = 0.8 + Math.random() * 0.8;
        brightness = 0.7 + Math.random() * 0.2;
        twinkleAmount = 0.3;
      } else {
        // 3% - Very bright stars (with glow effect)
        radius = 1.2 + Math.random() * 1.0;
        brightness = 0.85 + Math.random() * 0.15;
        twinkleAmount = 0.15;
      }

      // Subtle color variations (like real stars)
      const color = this.getStarColor();

      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius,
        brightness,
        baseBrightness: brightness,
        twinkleSpeed: 0.0005 + Math.random() * 0.002,
        twinkleOffset: Math.random() * Math.PI * 2,
        twinkleAmount,
        color,
        hasGlow: magnitude >= 0.97,
      });
    }
  }

  /**
   * Get a subtle star color variation
   */
  getStarColor() {
    const colorType = Math.random();
    if (colorType < 0.6) {
      return { r: 255, g: 255, b: 255 }; // White
    } else if (colorType < 0.75) {
      return { r: 255, g: 252, b: 240 }; // Warm white
    } else if (colorType < 0.9) {
      return { r: 240, g: 245, b: 255 }; // Cool white/blue
    } else {
      return { r: 255, g: 248, b: 220 }; // Slight yellow
    }
  }

  /**
   * Create shooting star with realistic trajectory and varying speeds
   */
  createMeteor() {
    const angle = (this.options.meteorAngle * Math.PI) / 180;

    // Start from upper portion of screen
    const startX = Math.random() * this.canvas.width * 0.7;
    const startY = Math.random() * this.canvas.height * 0.3;

    // Varying speeds: 40% slow, 40% medium, 20% fast
    const speedType = Math.random();
    let speed, tailLength, thickness, fadeRate;

    if (speedType < 0.4) {
      // Slow, graceful meteor - more visible, longer lasting
      speed = 2 + Math.random() * 1.5;  // 2-3.5 (slower)
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
  }

  /**
   * Main animation loop
   */
  animate(currentTime = 0) {
    const { ctx, canvas, options, stars, meteors } = this;

    // Clear with pure black background
    ctx.fillStyle = options.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Spawn meteors occasionally
    if (options.enableMeteors && currentTime - this.lastMeteorTime > options.meteorInterval) {
      this.createMeteor();
      this.lastMeteorTime = currentTime;
    }

    // Render stars with twinkling
    stars.forEach((star) => {
      let currentBrightness = star.baseBrightness;
      
      // Apply twinkling effect if enabled
      if (options.enableTwinkle) {
        const twinkle = Math.sin(currentTime * star.twinkleSpeed + star.twinkleOffset);
        currentBrightness = star.baseBrightness + twinkle * star.twinkleAmount * star.baseBrightness * options.twinkleIntensity;
      }

      const { r, g, b } = star.color;
      const alpha = Math.max(0.05, Math.min(1, currentBrightness));

      // Draw glow for bright stars
      if (star.hasGlow) {
        const gradient = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, star.radius * 4
        );
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha * 0.6})`);
        gradient.addColorStop(0.3, `rgba(${r}, ${g}, ${b}, ${alpha * 0.2})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Draw star core
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
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
  }

  /**
   * Update options dynamically
   */
  setOptions(newOptions) {
    this.options = { ...this.options, ...newOptions };
    if (newOptions.starCount) {
      this.initStars();
    }
  }

  /**
   * Trigger a meteor manually
   */
  triggerMeteor() {
    this.createMeteor();
  }
}

// For backward compatibility, also export as ConstellationBackground
const ConstellationBackground = RealisticStarfield;

export default RealisticStarfield;
export { RealisticStarfield, ConstellationBackground };