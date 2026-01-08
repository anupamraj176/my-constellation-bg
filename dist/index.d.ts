/**
 * RealisticStarfield v1.4.0
 * A realistic animated starfield background inspired by night sky photography
 */

export interface StarColor {
  r: number;
  g: number;
  b: number;
}

export interface Star {
  x: number;
  y: number;
  radius: number;
  brightness: number;
  baseBrightness: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  twinkleAmount: number;
  color: StarColor;
  hasGlow: boolean;
}

export interface Meteor {
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  tail: Array<{ x: number; y: number }>;
  maxTailLength: number;
  thickness: number;
  fadeRate: number;
  speedType: 'slow' | 'medium' | 'fast';
}

export interface NebulaCloud {
  x: number;
  y: number;
  radius: number;
  color: string;
  opacity: number;
  drift: {
    x: number;
    y: number;
  };
}

export interface RealisticStarfieldOptions {
  /** Number of stars to render (default: 800) */
  starCount?: number;
  /** Background color (default: '#000000') */
  backgroundColor?: string;
  /** Interval between automatic meteors in ms (default: 8000) */
  meteorInterval?: number;
  /** Angle of meteor trajectory in degrees (default: 35) */
  meteorAngle?: number;
  /** Enable shooting stars (default: true) */
  enableMeteors?: boolean;
  /** Enable twinkling effect (default: true) */
  enableTwinkle?: boolean;
  /** Intensity of twinkling effect 0-1 (default: 0.3) */
  twinkleIntensity?: number;
  /** Enable parallax effect on mouse movement (default: true) */
  enableParallax?: boolean;
  /** Strength of parallax effect 0-1 (default: 0.02) */
  parallaxStrength?: number;
  /** Enable nebula cloud background (default: false) */
  enableNebula?: boolean;
  /** Opacity of nebula clouds 0-1 (default: 0.15) */
  nebulaOpacity?: number;
  /** Array of colors for nebula clouds (default: ['#4a0080', '#000066', '#003366']) */
  nebulaColors?: string[];
  /** Enable pulsating effect on bright stars (default: true) */
  enablePulsate?: boolean;
}

export declare class RealisticStarfield {
  /** Canvas element being used */
  canvas: HTMLCanvasElement;
  /** Canvas 2D rendering context */
  ctx: CanvasRenderingContext2D;
  /** Current configuration options */
  options: Required<RealisticStarfieldOptions>;
  /** Array of star objects */
  stars: Star[];
  /** Array of active meteors */
  meteors: Meteor[];
  /** Array of nebula clouds */
  nebulaClouds: NebulaCloud[];
  /** Animation frame ID */
  animationId: number | null;
  /** Whether animation is paused */
  isPaused: boolean;

  /**
   * Create a new RealisticStarfield instance
   * @param canvas - The canvas element to render on
   * @param options - Configuration options
   */
  constructor(canvas: HTMLCanvasElement, options?: RealisticStarfieldOptions);

  /**
   * Initialize the starfield
   */
  init(): void;

  /**
   * Resize the canvas and reinitialize stars
   */
  resize(): void;

  /**
   * Initialize nebula clouds
   */
  initNebulaClouds(): void;

  /**
   * Initialize stars with realistic distribution
   */
  initStars(): void;

  /**
   * Get a random star color
   */
  getStarColor(): StarColor;

  /**
   * Create a new shooting star/meteor
   */
  createMeteor(): void;

  /**
   * Bind event listeners for resize and mouse movement
   */
  bindEvents(): void;

  /**
   * Render nebula clouds
   */
  renderNebula(ctx: CanvasRenderingContext2D): void;

  /**
   * Main animation loop
   */
  animate(currentTime?: number): void;

  /**
   * Destroy the starfield and cleanup all resources
   */
  destroy(): void;

  /**
   * Pause the animation
   */
  pause(): void;

  /**
   * Resume the animation
   */
  resume(): void;

  /**
   * Toggle pause/resume state
   * @returns The new paused state
   */
  togglePause(): boolean;

  /**
   * Check if animation is paused
   */
  get paused(): boolean;

  /**
   * Update options dynamically
   * @param newOptions - New options to merge with existing options
   */
  setOptions(newOptions: Partial<RealisticStarfieldOptions>): void;

  /**
   * Manually trigger a meteor
   */
  triggerMeteor(): void;

  /**
   * Get the current version
   */
  static get version(): string;
}

/** Backward compatibility alias for RealisticStarfield */
export declare const ConstellationBackground: typeof RealisticStarfield;

export default RealisticStarfield;
