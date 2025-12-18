class ConstellationBackground {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.options = {
      starCount: 150,
      maxDistance: 150,
      mouseRadius: 200,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      starColor: '#ffffff',
      lineColor: 'rgba(255, 255, 255, 0.2)',
      ...options
    };

    this.stars = [];
    this.mouse = { x: 0, y: 0 };
    this.animationId = null;

    this.resize();
    this.initStars();
    this.bindEvents();
    this.animate();
  }

  resize() {
    this.canvas.width = this.canvas.offsetWidth || window.innerWidth;
    this.canvas.height = this.canvas.offsetHeight || window.innerHeight;
  }

  initStars() {
    const { starCount } = this.options;
    this.stars = [];
    for (let i = 0; i < starCount; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        vx: Math.random() * 0.5 - 0.25,
        vy: Math.random() * 0.5 - 0.25
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => this.resize());
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });
  }

  animate() {
    const { ctx, canvas, options, stars, mouse } = this;

    ctx.fillStyle = options.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update and draw stars
    stars.forEach(star => {
      const dx = mouse.x - star.x;
      const dy = mouse.y - star.y;
      const dist = Math.hypot(dx, dy);

      if (dist < options.mouseRadius) {
        star.x += dx * 0.0002;
        star.y += dy * 0.0002;
      }

      star.x += star.vx;
      star.y += star.vy;

      // Bounce off edges
      if (star.x < 0 || star.x > canvas.width) star.vx *= -1;
      if (star.y < 0 || star.y > canvas.height) star.vy *= -1;

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = options.starColor;
      ctx.fill();
    });

    // Draw connection lines
    ctx.strokeStyle = options.lineColor;
    ctx.lineWidth = 0.5;
    for (let i = 0; i < stars.length; i++) {
      for (let j = i + 1; j < stars.length; j++) {
        const s1 = stars[i];
        const s2 = stars[j];
        const dist = Math.hypot(s1.x - s2.x, s1.y - s2.y);
        if (dist < options.maxDistance) {
          ctx.beginPath();
          ctx.moveTo(s1.x, s1.y);
          ctx.lineTo(s2.x, s2.y);
          ctx.stroke();
        }
      }
    }

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    cancelAnimationFrame(this.animationId);
  }
}

export default ConstellationBackground;