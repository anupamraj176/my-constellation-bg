var ConstellationBackground = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/index.js
  var index_exports = {};
  __export(index_exports, {
    default: () => index_default
  });
  var ConstellationBackground = class {
    constructor(canvas, options = {}) {
      this.canvas = canvas;
      this.ctx = canvas.getContext("2d");
      this.options = {
        starCount: 200,
        // Number of stars to render
        maxDistance: 120,
        // Maximum distance for star connections
        backgroundColor: "#000000",
        // Canvas background color
        starColor: "#ffffff",
        // Base star color
        lineColor: "rgba(255, 255, 255, 0.15)",
        // Connection line color
        meteorInterval: 3e3,
        // Time between meteors (ms)
        ...options
      };
      this.stars = [];
      this.meteors = [];
      this.animationId = null;
      this.lastMeteorTime = 0;
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
          x: Math.random() * this.canvas.width,
          // Random X position
          y: Math.random() * this.canvas.height,
          // Random Y position
          radius: Math.random() * 1.2 + 0.3,
          // Star size (0.3 to 1.5)
          brightness: Math.random() * 0.5 + 0.5,
          // Base brightness (0.5 to 1.0)
          blinkSpeed: Math.random() * 2e-3 + 1e-3,
          // Blink speed variation
          blinkOffset: Math.random() * Math.PI * 2
          // Random starting phase
        });
      }
    }
    /**
     * Create a new falling meteor
     */
    createMeteor() {
      const startX = Math.random() * this.canvas.width;
      const startY = -50;
      const angle = Math.random() * Math.PI / 6 + Math.PI / 12;
      const speed = Math.random() * 3 + 4;
      this.meteors.push({
        x: startX,
        y: startY,
        vx: Math.sin(angle) * speed,
        // Horizontal velocity
        vy: Math.cos(angle) * speed,
        // Vertical velocity
        opacity: 1,
        // Fade out over time
        tail: []
        // Trail effect
      });
    }
    /**
     * Bind window and canvas event listeners
     */
    bindEvents() {
      window.addEventListener("resize", () => this.resize());
    }
    /**
     * Main animation loop
     */
    animate(currentTime = 0) {
      const { ctx, canvas, options, stars, meteors } = this;
      ctx.fillStyle = options.backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      if (currentTime - this.lastMeteorTime > options.meteorInterval) {
        this.createMeteor();
        this.lastMeteorTime = currentTime;
      }
      stars.forEach((star, index) => {
        const time = currentTime * star.blinkSpeed + star.blinkOffset;
        const blinkFactor = Math.sin(time) * 0.3 + 0.7;
        const currentBrightness = star.brightness * blinkFactor;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentBrightness})`;
        ctx.fill();
      });
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
      for (let i = meteors.length - 1; i >= 0; i--) {
        const meteor = meteors[i];
        meteor.x += meteor.vx;
        meteor.y += meteor.vy;
        meteor.opacity -= 5e-3;
        meteor.tail.unshift({ x: meteor.x, y: meteor.y });
        if (meteor.tail.length > 20) {
          meteor.tail.pop();
        }
        if (meteor.y > canvas.height + 100 || meteor.x > canvas.width + 100 || meteor.opacity <= 0) {
          meteors.splice(i, 1);
          continue;
        }
        for (let j = 0; j < meteor.tail.length; j++) {
          const point = meteor.tail[j];
          const nextPoint = meteor.tail[j + 1];
          if (!nextPoint) continue;
          const gradient = ctx.createLinearGradient(
            point.x,
            point.y,
            nextPoint.x,
            nextPoint.y
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
        const headGradient = ctx.createRadialGradient(
          meteor.x,
          meteor.y,
          0,
          meteor.x,
          meteor.y,
          4
        );
        headGradient.addColorStop(0, `rgba(255, 255, 255, ${meteor.opacity})`);
        headGradient.addColorStop(0.5, `rgba(200, 220, 255, ${meteor.opacity * 0.5})`);
        headGradient.addColorStop(1, "rgba(150, 180, 255, 0)");
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
      window.removeEventListener("resize", () => this.resize());
    }
  };
  var index_default = ConstellationBackground;
  return __toCommonJS(index_exports);
})();
