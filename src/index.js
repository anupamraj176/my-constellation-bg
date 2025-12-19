/**
 * ConstellationBackground
 * Creates a Grok-style animated background with:
 * - Slowly blinking stars connected by lines
 * - Periodic falling meteors with trails
 */
class ConstellationBackground {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    
    // Configuration options with defaults
    this.options = {
      starCount: 200,                           // Number of stars to render
      maxDistance: 120,                         // Maximum distance for star connections
      backgroundColor: '#000000',               // Canvas background color
      starColor: '#ffffff',                     // Base star color
      lineColor: 'rgba(255, 255, 255, 0.15)',  // Connection line color
      meteorInterval: 3000,                     // Time between meteors (ms)
      ...options
    };

    // State arrays
    this.stars = [];
    this.meteors = [];
    this.animationId = null;
    this.lastMeteorTime = 0;

    // Initialize
    this.resize();
    this.initStars();
    this.bindEvents();
    this.animate();
  }

  /**
   * Handle canvas resize - adjusts to container or window size
   */
  resize() {
    this.canvas.width = this.canvas.offsetWidth || window.innerWidth;
    this.canvas.height = this.canvas.offsetHeight || window.innerHeight;
    this.initStars();
  }

  /**
   * Initialize stars with random positions and blinking properties
   */
  initStars() {
    const { starCount } = this.options;
    this.stars = [];
    
    for (let i = 0; i < starCount; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,      // Random X position
        y: Math.random() * this.canvas.height,     // Random Y position
        radius: Math.random() * 1.2 + 0.3,         // Star size (0.3 to 1.5)
        brightness: Math.random() * 0.5 + 0.5,     // Base brightness (0.5 to 1.0)
        blinkSpeed: Math.random() * 0.002 + 0.001, // Blink speed variation
        blinkOffset: Math.random() * Math.PI * 2   // Random starting phase
      });
    }
  }

  /**
   * Create a new falling meteor
   */
  createMeteor() {
    // Random starting position at top of screen
    const startX = Math.random() * this.canvas.width;
    const startY = -50;
    
    // Calculate diagonal trajectory (15-45 degrees)
    const angle = Math.random() * Math.PI / 6 + Math.PI / 12;
    const speed = Math.random() * 3 + 4;
    
    this.meteors.push({
      x: startX,
      y: startY,
      vx: Math.sin(angle) * speed,  // Horizontal velocity
      vy: Math.cos(angle) * speed,  // Vertical velocity
      opacity: 1,                    // Fade out over time
      tail: []                       // Trail effect
    });
  }

  /**
   * Bind window and canvas event listeners
   */
  bindEvents() {
    window.addEventListener('resize', () => this.resize());
  }

  /**
   * Main animation loop
   */
  animate(currentTime = 0) {
    const { ctx, canvas, options, stars, meteors } = this;

    // Clear canvas with black background
    ctx.fillStyle = options.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // --- METEOR SPAWNING ---
    // Create a new meteor at regular intervals
    if (currentTime - this.lastMeteorTime > options.meteorInterval) {
      this.createMeteor();
      this.lastMeteorTime = currentTime;
    }

    // --- STARS ---
    // Update and draw each star with blinking effect
    stars.forEach((star, index) => {
      // Calculate blinking brightness using sine wave
      const time = currentTime * star.blinkSpeed + star.blinkOffset;
      const blinkFactor = Math.sin(time) * 0.3 + 0.7; // Range: 0.4 to 1.0
      const currentBrightness = star.brightness * blinkFactor;

      // Draw the star
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${currentBrightness})`;
      ctx.fill();
    });

    // --- STAR CONNECTIONS ---
    // Draw lines between nearby stars
    ctx.lineWidth = 0.5;
    for (let i = 0; i < stars.length; i++) {
      for (let j = i + 1; j < stars.length; j++) {
        const s1 = stars[i];
        const s2 = stars[j];
        
        // Calculate distance between stars
        const dist = Math.hypot(s1.x - s2.x, s1.y - s2.y);
        
        // Only draw if stars are close enough
        if (dist < options.maxDistance) {
          // Fade line opacity based on distance
          const opacity = (1 - dist / options.maxDistance) * 0.15;
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
          
          ctx.beginPath();
          ctx.moveTo(s1.x, s1.y);
          ctx.lineTo(s2.x, s2.y);
          ctx.stroke();
        }
      }
    }

    // --- METEORS ---
    // Update and draw all active meteors
    for (let i = meteors.length - 1; i >= 0; i--) {
      const meteor = meteors[i];
      
      // Update meteor position
      meteor.x += meteor.vx;
      meteor.y += meteor.vy;
      meteor.opacity -= 0.005; // Gradual fade out

      // Add current position to tail array
      meteor.tail.unshift({ x: meteor.x, y: meteor.y });
      if (meteor.tail.length > 20) {
        meteor.tail.pop(); // Keep tail length limited
      }

      // Remove meteor if it's off screen or fully faded
      if (meteor.y > canvas.height + 100 || 
          meteor.x > canvas.width + 100 || 
          meteor.opacity <= 0) {
        meteors.splice(i, 1);
        continue;
      }

      // --- METEOR TRAIL ---
      // Draw gradient trail behind meteor
      for (let j = 0; j < meteor.tail.length; j++) {
        const point = meteor.tail[j];
        const nextPoint = meteor.tail[j + 1];
        if (!nextPoint) continue;

        // Create gradient from white to blue
        const gradient = ctx.createLinearGradient(
          point.x, point.y,
          nextPoint.x, nextPoint.y
        );
        
        // Calculate fade based on position in tail
        const opacity = meteor.opacity * (1 - j / meteor.tail.length);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity * 0.8})`);
        gradient.addColorStop(0.5, `rgba(200, 220, 255, ${opacity * 0.4})`);
        gradient.addColorStop(1, `rgba(150, 180, 255, 0)`);

        // Draw trail segment
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2 * (1 - j / meteor.tail.length);
        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
        ctx.lineTo(nextPoint.x, nextPoint.y);
        ctx.stroke();
      }

      // --- METEOR HEAD ---
      // Draw glowing head with radial gradient
      const headGradient = ctx.createRadialGradient(
        meteor.x, meteor.y, 0,
        meteor.x, meteor.y, 4
      );
      headGradient.addColorStop(0, `rgba(255, 255, 255, ${meteor.opacity})`);
      headGradient.addColorStop(0.5, `rgba(200, 220, 255, ${meteor.opacity * 0.5})`);
      headGradient.addColorStop(1, 'rgba(150, 180, 255, 0)');

      ctx.fillStyle = headGradient;
      ctx.beginPath();
      ctx.arc(meteor.x, meteor.y, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Continue animation loop
    this.animationId = requestAnimationFrame((time) => this.animate(time));
  }


  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    window.removeEventListener('resize', () => this.resize());
  }
}

export default ConstellationBackground;