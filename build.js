import { build } from "esbuild";
import { writeFileSync } from "fs";

// Build IIFE version for browsers (CDN usage)
await build({
  entryPoints: ["src/index.js"],
  bundle: true,
  outfile: "dist/index.js",
  format: "iife",
  globalName: "CosmicCanvasLib",
  platform: "browser",
  minify: true,
  banner: {
    js: `/**
 * CosmicCanvas v2.0.0
 * The ultimate animated space background library
 * https://github.com/anupamraj176/my-constellation-bg
 * (c) ${new Date().getFullYear()} Anupam Raj - MIT License
 */`,
  },
  footer: {
    js: `
if (typeof window !== 'undefined') {
  window.CosmicCanvas = CosmicCanvasLib.default || CosmicCanvasLib.CosmicCanvas;
  window.RealisticStarfield = CosmicCanvasLib.RealisticStarfield || CosmicCanvasLib.default;
  window.ConstellationBackground = CosmicCanvasLib.ConstellationBackground || CosmicCanvasLib.default;
}`,
  },
});

// Create TypeScript definitions
const dts = `/**
 * CosmicCanvas v2.0.0
 * The ultimate animated space background library
 */

export interface CosmicCanvasOptions {
  /** Built-in theme name */
  theme?: 'midnight' | 'nebula' | 'aurora' | 'galaxy' | 'minimal' | 'synthwave';
  /** Number of stars (default: 800) */
  starCount?: number;
  /** Canvas background color (default: '#000000') */
  backgroundColor?: string;
  /** Time between auto meteors in ms (default: 8000) */
  meteorInterval?: number;
  /** Meteor angle in degrees (default: 35) */
  meteorAngle?: number;
  /** Enable shooting stars (default: true) */
  enableMeteors?: boolean;
  /** Enable star twinkling (default: true) */
  enableTwinkle?: boolean;
  /** Twinkle intensity 0-1 (default: 0.3) */
  twinkleIntensity?: number;
  /** Enable parallax on mouse move (default: true) */
  enableParallax?: boolean;
  /** Parallax strength 0-1 (default: 0.02) */
  parallaxStrength?: number;
  /** Enable nebula clouds (default: false) */
  enableNebula?: boolean;
  /** Nebula opacity 0-1 (default: 0.15) */
  nebulaOpacity?: number;
  /** Nebula cloud colors */
  nebulaColors?: string[];
  /** Enable pulsating bright stars (default: true) */
  enablePulsate?: boolean;
  /** Enable aurora effect (default: false) */
  enableAurora?: boolean;
  /** Aurora intensity 0-1 (default: 0.3) */
  auroraIntensity?: number;
  /** Aurora animation speed (default: 0.5) */
  auroraSpeed?: number;
  /** Aurora wave colors */
  auroraColors?: string[];
  /** Enable star clusters (default: false) */
  enableClusters?: boolean;
  /** Number of star clusters (default: 3) */
  clusterCount?: number;
  /** Enable click/tap to spawn meteors (default: true) */
  enableClickEffect?: boolean;
  /** Number of meteors spawned on click (default: 5) */
  clickSpawnCount?: number;
  /** Enable touch support (default: true) */
  enableTouch?: boolean;
  /** Reduce effects for better performance (default: false) */
  performanceMode?: boolean;
  /** Frame rate limit, 0 = unlimited (default: 0) */
  fpsLimit?: number;
}

export interface ThemeConfig {
  backgroundColor?: string;
  starCount?: number;
  enableNebula?: boolean;
  nebulaOpacity?: number;
  nebulaColors?: string[];
  enableAurora?: boolean;
  auroraIntensity?: number;
  auroraColors?: string[];
  enableClusters?: boolean;
  enableMeteors?: boolean;
  twinkleIntensity?: number;
}

export declare class CosmicCanvas {
  static readonly VERSION: string;
  static readonly THEMES: Record<string, ThemeConfig>;
  static readonly version: string;
  static readonly themes: string[];

  constructor(canvas: HTMLCanvasElement, options?: CosmicCanvasOptions);

  readonly paused: boolean;
  readonly options: CosmicCanvasOptions;

  /** Switch to a built-in theme */
  setTheme(themeName: string): void;
  /** Update options dynamically */
  setOptions(options: Partial<CosmicCanvasOptions>): void;
  /** Spawn a shooting star at optional position */
  triggerMeteor(x?: number | null, y?: number | null): void;
  /** Pause the animation */
  pause(): void;
  /** Resume the animation */
  resume(): void;
  /** Toggle pause state, returns new state */
  togglePause(): boolean;
  /** Clean up and remove event listeners */
  destroy(): void;
}

export declare const RealisticStarfield: typeof CosmicCanvas;
export declare const ConstellationBackground: typeof CosmicCanvas;

export default CosmicCanvas;
`;

writeFileSync("dist/index.d.ts", dts);

console.log("✅ Build complete!");
console.log("   - dist/index.js (IIFE, minified)");
console.log("   - dist/index.d.ts (TypeScript definitions)");
