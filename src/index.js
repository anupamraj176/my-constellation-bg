class ConstellationBackground {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.options = {
      starCount: 200,
      maxDistance: 120,
      mouseRadius: 180,
      backgroundColor: '#000000',
      starColor: '#ffffff',
      lineColor: 'rgba(255, 255, 255, 0.15)',
      meteorCount: 3,
      meteorInterval: 3000,
      ...options
    };

    this.stars = [];
    this.meteors = [];
    this.mouse = { x: -1000, y: -1000 };
    this.animationId = null;
    this.lastMeteorTime = 0;

    this.resize();
    this.initStars();
    this.bindEvents();
    this.animate();
  }

  resize() {
    this.canvas.width = this.canvas.offsetWidth || window.innerWidth;
    this.canvas.height = this.canvas.offsetHeight || window.innerHeight;
    this.initStars();
  }

  initStars() {
    const { starCount } = this.options;
    this.stars = [];
    for (let i = 0; i < starCount; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: Math.random() * 1.2 + 0.3,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        brightness: Math.random() * 0.5 + 0.5
      });
    }
  }

  createMeteor() {
    const startX = Math.random() * this.canvas.width;
    const startY = -50;
    const angle = Math.random() * Math.PI / 6 + Math.PI / 12; // 15-45 degrees
    const speed = Math.random() * 3 + 4;
    
    this.meteors.push({
      x: startX,
      y: startY,
      vx: Math.sin(angle) * speed,
      vy: Math.cos(angle) * speed,
      length: Math.random() * 60 + 40,
      opacity: 1,
      tail: []
    });
  }

  bindEvents() {
    window.addEventListener('resize', () => this.resize());
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });
    this.canvas.addEventListener('mouseleave', () => {
      this.mouse.x = -1000;
      this.mouse.y = -1000;
    });
  }

  animate(currentTime = 0) {
    const { ctx, canvas, options, stars, mouse, meteors } = this;

    // Clear with black background
    ctx.fillStyle = options.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Create meteors periodically
    if (currentTime - this.lastMeteorTime > options.meteorInterval) {
      this.createMeteor();
      this.lastMeteorTime = currentTime;
    }

    // Update and draw stars
    stars.forEach(star => {
      // Mouse interaction - repulsion effect
      const dx = mouse.x - star.x;
      const dy = mouse.y - star.y;
      const dist = Math.hypot(dx, dy);

      if (dist < options.mouseRadius && dist > 0) {
        const force = (options.mouseRadius - dist) / options.mouseRadius;
        star.x -= (dx / dist) * force * 2;
        star.y -= (dy / dist) * force * 2;
      }

      // Natural drift
      star.x += star.vx;
      star.y += star.vy;

      // Wrap around edges
      if (star.x < 0) star.x = canvas.width;
      if (star.x > canvas.width) star.x = 0;
      if (star.y < 0) star.y = canvas.height;
      if (star.y > canvas.height) star.y = 0;

      // Draw star
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
      ctx.fill();
    });

    // Draw connection lines between nearby stars
    ctx.strokeStyle = options.lineColor;
    ctx.lineWidth = 0.5;
    for (let i = 0; i < stars.length; i++) {
      for (let j = i + 1; j < stars.length; j++) {
        const s1 = stars[i];
        const s2 = stars[j];
        const dist = Math.hypot(s1.x - s2.x, s1.y - s2.y);
        
        if (dist < options.maxDistance) {
          const opacity = (1 - dist / options.maxDistance) * 0.15;
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.beginPath();
          ctx.moveTo(s1.x, s1.y);
          ctx.lineTo(s2.x, s2.y);
          ctx.stroke();
        }
      }
    }

    // Update and draw meteors
    for (let i = meteors.length - 1; i >= 0; i--) {
      const meteor = meteors[i];
      
      // Update position
      meteor.x += meteor.vx;
      meteor.y += meteor.vy;
      meteor.opacity -= 0.005;

      // Add to tail
      meteor.tail.unshift({ x: meteor.x, y: meteor.y });
      if (meteor.tail.length > 20) meteor.tail.pop();

      // Remove if off screen or faded
      if (meteor.y > canvas.height + 100 || meteor.x > canvas.width + 100 || meteor.opacity <= 0) {
        meteors.splice(i, 1);
        continue;
      }

      // Draw meteor trail
      for (let j = 0; j < meteor.tail.length; j++) {
        const point = meteor.tail[j];
        const nextPoint = meteor.tail[j + 1];
        if (!nextPoint) continue;

        const gradient = ctx.createLinearGradient(
          point.x, point.y,
          nextPoint.x, nextPoint.y
        );
        
        const opacity = meteor.opacity * (1 - j / meteor.tail.length);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity * 0.8})`);
        gradient.addColorStop(0.5, `rgba(200, 220, 255, ${opacity * 0.4})`);
        gradient.addColorStop(1, `rgba(150, 180, 255, 0)`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2 * (1 - j / meteor.tail.length);
        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
        ctx.lineTo(nextPoint.x, nextPoint.y);
        ctx.stroke();
      }

      // Draw meteor head
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