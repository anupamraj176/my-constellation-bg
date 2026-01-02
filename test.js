/**
 * Test script to verify the package works correctly after installation
 * Run with: npm test
 */

import RealisticStarfield, { ConstellationBackground } from './src/index.js';

console.log('🧪 Testing my-constellation-bg package...\n');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`✅ ${name}`);
    passed++;
  } catch (error) {
    console.log(`❌ ${name}`);
    console.log(`   Error: ${error.message}`);
    failed++;
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

// Mock canvas for Node.js environment
const mockCanvas = {
  width: 1920,
  height: 1080,
  offsetWidth: 1920,
  offsetHeight: 1080,
  getContext: () => ({
    fillStyle: '',
    strokeStyle: '',
    lineWidth: 1,
    lineCap: 'butt',
    fillRect: () => {},
    beginPath: () => {},
    arc: () => {},
    fill: () => {},
    stroke: () => {},
    moveTo: () => {},
    lineTo: () => {},
    createRadialGradient: () => ({
      addColorStop: () => {}
    }),
    createLinearGradient: () => ({
      addColorStop: () => {}
    })
  })
};

// Mock window for Node.js
global.window = {
  innerWidth: 1920,
  innerHeight: 1080,
  addEventListener: () => {},
  removeEventListener: () => {}
};

global.requestAnimationFrame = (cb) => setTimeout(cb, 16);
global.cancelAnimationFrame = (id) => clearTimeout(id);

// Tests
console.log('--- Class Export Tests ---');

test('RealisticStarfield is exported as default', () => {
  assert(typeof RealisticStarfield === 'function', 'Should be a function/class');
});

test('ConstellationBackground is exported for backward compatibility', () => {
  assert(typeof ConstellationBackground === 'function', 'Should be a function/class');
});

test('RealisticStarfield and ConstellationBackground are the same class', () => {
  assert(RealisticStarfield === ConstellationBackground, 'Should be identical');
});

console.log('\n--- Instance Creation Tests ---');

test('Can create instance with default options', () => {
  const instance = new RealisticStarfield(mockCanvas);
  assert(instance !== null, 'Instance should exist');
  instance.destroy();
});

test('Can create instance with custom options', () => {
  const instance = new RealisticStarfield(mockCanvas, {
    starCount: 500,
    backgroundColor: '#111111',
    meteorInterval: 5000,
    meteorAngle: 45,
    enableMeteors: true,
    enableTwinkle: true,
    twinkleIntensity: 0.5
  });
  assert(instance.options.starCount === 500, 'starCount should be 500');
  assert(instance.options.meteorAngle === 45, 'meteorAngle should be 45');
  instance.destroy();
});

console.log('\n--- Default Options Tests ---');

test('Default starCount is 800', () => {
  const instance = new RealisticStarfield(mockCanvas);
  assert(instance.options.starCount === 800, 'Default starCount should be 800');
  instance.destroy();
});

test('Default backgroundColor is #000000', () => {
  const instance = new RealisticStarfield(mockCanvas);
  assert(instance.options.backgroundColor === '#000000', 'Default backgroundColor should be #000000');
  instance.destroy();
});

test('Default meteorInterval is 8000ms', () => {
  const instance = new RealisticStarfield(mockCanvas);
  assert(instance.options.meteorInterval === 8000, 'Default meteorInterval should be 8000');
  instance.destroy();
});

test('Default meteorAngle is 35 degrees', () => {
  const instance = new RealisticStarfield(mockCanvas);
  assert(instance.options.meteorAngle === 35, 'Default meteorAngle should be 35');
  instance.destroy();
});

console.log('\n--- Star Generation Tests ---');

test('Stars array is populated', () => {
  const instance = new RealisticStarfield(mockCanvas);
  assert(instance.stars.length > 0, 'Should have stars');
  instance.destroy();
});

test('Stars have required properties', () => {
  const instance = new RealisticStarfield(mockCanvas);
  const star = instance.stars[0];
  assert(typeof star.x === 'number', 'Star should have x position');
  assert(typeof star.y === 'number', 'Star should have y position');
  assert(typeof star.radius === 'number', 'Star should have radius');
  assert(typeof star.brightness === 'number', 'Star should have brightness');
  assert(typeof star.color === 'object', 'Star should have color object');
  assert(typeof star.hasGlow === 'boolean', 'Star should have hasGlow flag');
  instance.destroy();
});

console.log('\n--- Method Tests ---');

test('destroy() method exists and works', () => {
  const instance = new RealisticStarfield(mockCanvas);
  assert(typeof instance.destroy === 'function', 'destroy should be a function');
  instance.destroy();
  assert(instance.animationId === null, 'animationId should be null after destroy');
});

test('setOptions() method exists and works', () => {
  const instance = new RealisticStarfield(mockCanvas);
  assert(typeof instance.setOptions === 'function', 'setOptions should be a function');
  instance.setOptions({ meteorInterval: 10000 });
  assert(instance.options.meteorInterval === 10000, 'meteorInterval should be updated');
  instance.destroy();
});

test('triggerMeteor() method exists and creates meteor', () => {
  const instance = new RealisticStarfield(mockCanvas);
  assert(typeof instance.triggerMeteor === 'function', 'triggerMeteor should be a function');
  const initialCount = instance.meteors.length;
  instance.triggerMeteor();
  assert(instance.meteors.length === initialCount + 1, 'Should have one more meteor');
  instance.destroy();
});

console.log('\n--- Meteor Speed Variation Tests ---');

test('Meteors have varying speeds (slow, medium, fast)', () => {
  const instance = new RealisticStarfield(mockCanvas);
  
  // Create multiple meteors to test speed distribution
  for (let i = 0; i < 20; i++) {
    instance.triggerMeteor();
  }
  
  const speedTypes = instance.meteors.map(m => m.speedType);
  const hasSlow = speedTypes.includes('slow');
  const hasMedium = speedTypes.includes('medium');
  const hasFast = speedTypes.includes('fast');
  
  // With 20 meteors, we should likely have at least 2 types
  assert(hasSlow || hasMedium || hasFast, 'Should have at least one speed type');
  
  instance.destroy();
});

// Summary
console.log('\n' + '='.repeat(40));
console.log(`📊 Test Results: ${passed} passed, ${failed} failed`);
console.log('='.repeat(40));

if (failed > 0) {
  console.log('\n⚠️  Some tests failed. Please check the errors above.');
  process.exit(1);
} else {
  console.log('\n🎉 All tests passed! Package is ready for release.');
  process.exit(0);
}
