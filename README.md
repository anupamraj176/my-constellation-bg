# Realistic Starfield Background

A beautiful, performant animated starfield background inspired by real night sky photography. Features dense stars with natural brightness distribution, subtle twinkling, and shooting stars with realistic varying speeds. Perfect for creating engaging hero sections, landing pages, or any web interface that needs a touch of cosmic elegance.

![Version](https://img.shields.io/badge/version-1.3.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Features

- 🌟 **Realistic Star Distribution** - 800+ stars with natural brightness (70% dim, 20% medium, 7% bright, 3% very bright with glow)
- ✨ **Subtle Twinkling** - Configurable twinkling effect that's not overdone
- 💫 **Bright Star Glow** - Very bright stars feature a beautiful radial glow effect
- ☄️ **Varying Speed Meteors** - Shooting stars with slow (40%), medium (40%), and fast (20%) speeds
- 🎨 **Star Color Variations** - Subtle white, warm white, cool blue, and yellow tints
- 📱 **Responsive** - Automatically adapts to canvas/window size with consistent star density
- ⚡ **Lightweight** - Pure vanilla JavaScript, no dependencies
- 🎯 **Easy Integration** - Simple API, works with any framework
- 🔧 **Backward Compatible** - Still exports `ConstellationBackground` for existing users

## 🆕 What's New in v1.3.0

- **Realistic Night Sky** - Inspired by actual star photography
- **Natural Star Distribution** - Most stars are dim and tiny, few are bright (like real night sky)
- **Slower Meteor Speeds** - More realistic shooting star speeds:
  - Slow meteors (40%): Speed 2-3.5, long graceful trails
  - Medium meteors (40%): Speed 4-6, balanced appearance
  - Fast meteors (20%): Speed 8-12, quick streaks
- **Pure Black Background** - Deep space black (#000000) by default
- **No Constellation Lines** - Clean, realistic starfield appearance
- **New Methods**: `setOptions()`, `triggerMeteor()` for dynamic control
- **Test Suite** - Run `npm test` to verify installation

## 📦 Installation

```bash
npm install my-constellation-bg
```

## 🔧 Build & Test

```bash
# Build the package
npm run build

# Test the package (verify it works)
npm test
```

---

## 🚀 Usage Guide

### Method 1: Vanilla HTML/JavaScript (Easiest)

#### Option A: Using Built File

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Starfield Background</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            overflow: hidden;
        }

        #starfield-canvas {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: -1;
        }

        .content {
            position: relative;
            z-index: 1;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            flex-direction: column;
        }

        h1 {
            font-size: 4rem;
            margin-bottom: 1rem;
        }
    </style>
</head>
<body>
    <canvas id="starfield-canvas"></canvas>

    <div class="content">
        <h1>Welcome to My Site</h1>
        <p>Beautiful starfield background ✨</p>
    </div>

    <script src="dist/index.js"></script>
    
    <script>
        const canvas = document.getElementById('starfield-canvas');
        
        // Create starfield with default settings (recommended)
        const starfield = new RealisticStarfield(canvas);

        // OR with custom options:
        // const starfield = new RealisticStarfield(canvas, {
        //     starCount: 1000,              // More stars
        //     backgroundColor: '#0a0a0a',   // Slightly lighter black
        //     meteorInterval: 6000,         // Meteor every 6 seconds
        //     meteorAngle: 40,              // Steeper angle
        //     enableMeteors: true,          // Enable shooting stars
        //     enableTwinkle: true,          // Enable twinkling
        //     twinkleIntensity: 0.4         // Twinkle amount (0-1)
        // });

        // Trigger a meteor manually (e.g., on button click)
        // starfield.triggerMeteor();

        // Update options dynamically
        // starfield.setOptions({ meteorInterval: 3000 });
    </script>
</body>
</html>
```

#### Option B: ES6 Module Import

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Same styles as above -->
</head>
<body>
    <canvas id="starfield-canvas"></canvas>
    <div class="content">
        <h1>Welcome</h1>
    </div>

    <script type="module">
        import RealisticStarfield from './src/index.js';
        // OR for backward compatibility:
        // import { ConstellationBackground } from './src/index.js';
        
        const canvas = document.getElementById('starfield-canvas');
        const starfield = new RealisticStarfield(canvas);
    </script>
</body>
</html>
```

---

### Method 2: React

#### Basic Implementation

```jsx
import React, { useEffect, useRef } from 'react';
import RealisticStarfield from 'my-constellation-bg';

function App() {
  const canvasRef = useRef(null);
  const starfieldRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      starfieldRef.current = new RealisticStarfield(canvasRef.current, {
        starCount: 800,
        meteorInterval: 8000
      });
    }

    return () => {
      if (starfieldRef.current) {
        starfieldRef.current.destroy();
      }
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1
        }}
      />
      
      <div style={{
        position: 'relative',
        zIndex: 1,
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        flexDirection: 'column'
      }}>
        <h1>Welcome to My App</h1>
        <p>Built with React ⚛️</p>
      </div>
    </div>
  );
}

export default App;
```

#### Reusable Component

```jsx
// StarfieldCanvas.jsx
import React, { useEffect, useRef } from 'react';
import RealisticStarfield from 'my-constellation-bg';

const StarfieldCanvas = ({ options = {} }) => {
  const canvasRef = useRef(null);
  const starfieldRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current && !starfieldRef.current) {
      starfieldRef.current = new RealisticStarfield(
        canvasRef.current,
        options
      );
    }

    return () => {
      if (starfieldRef.current) {
        starfieldRef.current.destroy();
        starfieldRef.current = null;
      }
    };
  }, [options]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1
      }}
    />
  );
};

export default StarfieldCanvas;
```

**Usage:**

```jsx
import StarfieldCanvas from './StarfieldCanvas';

function App() {
  return (
    <>
      <StarfieldCanvas 
        options={{
          starCount: 1000,
          meteorInterval: 5000
        }}
      />
      <div className="content">
        <h1>Your Content Here</h1>
      </div>
    </>
  );
}
```

---

### Method 3: Vue 3

#### Composition API

```vue
<template>
  <div class="container">
    <canvas ref="canvasRef" class="starfield-canvas"></canvas>
    <div class="content">
      <h1>Welcome to Vue App</h1>
      <p>Powered by Vue 3 🟢</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import RealisticStarfield from 'my-constellation-bg';

const canvasRef = ref(null);
let starfield = null;

onMounted(() => {
  if (canvasRef.value) {
    starfield = new RealisticStarfield(canvasRef.value, {
      starCount: 800,
      meteorInterval: 8000
    });
  }
});

onBeforeUnmount(() => {
  if (starfield) {
    starfield.destroy();
  }
});
</script>

<style scoped>
.container {
  position: relative;
  width: 100vw;
  height: 100vh;
}

.starfield-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.content {
  position: relative;
  z-index: 1;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  flex-direction: column;
}

h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}
</style>
```

#### Options API

```vue
<template>
  <div class="container">
    <canvas ref="canvas" class="starfield-canvas"></canvas>
    <div class="content">
      <h1>Your Content</h1>
    </div>
  </div>
</template>

<script>
import RealisticStarfield from 'my-constellation-bg';

export default {
  data() {
    return {
      starfield: null
    };
  },
  mounted() {
    this.starfield = new RealisticStarfield(this.$refs.canvas, {
      starCount: 800,
      meteorInterval: 8000
    });
  },
  beforeUnmount() {
    if (this.starfield) {
      this.starfield.destroy();
    }
  }
};
</script>

<style scoped>
.container {
  position: relative;
  width: 100vw;
  height: 100vh;
}

.starfield-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.content {
  position: relative;
  z-index: 1;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  flex-direction: column;
}
</style>
```

---

## ⚙️ Configuration Options

Customize the appearance and behavior:

```javascript
const starfield = new RealisticStarfield(canvas, {
  starCount: 800,                 // Number of stars (scales with screen size)
  backgroundColor: '#000000',     // Pure black deep space
  meteorInterval: 8000,           // Time between meteors (ms)
  meteorAngle: 35,                // Meteor angle in degrees
  enableMeteors: true,            // Enable/disable shooting stars
  enableTwinkle: true,            // Enable/disable star twinkling
  twinkleIntensity: 0.3           // Twinkle strength (0-1)
});
```

### Options Reference

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `starCount` | Number | `800` | Base number of stars (auto-scales with screen size) |
| `backgroundColor` | String | `'#000000'` | Canvas background color (pure black recommended) |
| `meteorInterval` | Number | `8000` | Time between meteor spawns (milliseconds) |
| `meteorAngle` | Number | `35` | Fixed angle for meteors in degrees (from vertical) |
| `enableMeteors` | Boolean | `true` | Enable or disable shooting stars |
| `enableTwinkle` | Boolean | `true` | Enable or disable star twinkling effect |
| `twinkleIntensity` | Number | `0.3` | How much stars twinkle (0 = none, 1 = maximum) |

### Meteor Speed Distribution

Meteors spawn with varying speeds for a realistic effect:
- **40% Slow Meteors** - Graceful, long trails (speed: 2-3.5)
- **40% Medium Meteors** - Balanced appearance (speed: 4-6)
- **20% Fast Meteors** - Quick bright streaks (speed: 8-12)

### Star Brightness Distribution

Stars are distributed with realistic brightness levels:
- **70% Dim Stars** - Tiny, faint (like distant stars)
- **20% Medium Stars** - Moderate brightness
- **7% Bright Stars** - Clearly visible
- **3% Very Bright Stars** - With glow effect

---

## 🎨 Styling Examples

### Default Realistic Night Sky

```javascript
// Just use defaults - they look like a real photo!
new RealisticStarfield(canvas);
```

### Dense Starfield

```javascript
new RealisticStarfield(canvas, {
  starCount: 1500,        // More stars
  meteorInterval: 5000    // More frequent meteors
});
```

### Subtle Background (Less Distracting)

```javascript
new RealisticStarfield(canvas, {
  starCount: 400,         // Fewer stars
  meteorInterval: 15000,  // Rare meteors
  twinkleIntensity: 0.2   // Very subtle twinkle
});
```

### No Meteors (Static Starfield)

```javascript
new RealisticStarfield(canvas, {
  enableMeteors: false,   // Disable shooting stars
  enableTwinkle: true     // Keep twinkling
});
```

---

## 🎯 Common Use Cases

### Hero Section Background

```html
<style>
    .hero {
        position: relative;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    #hero-canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
    }
</style>

<section class="hero">
    <canvas id="hero-canvas"></canvas>
    <div class="hero-content">
        <h1>Your Hero Title</h1>
        <p>Subtitle goes here</p>
    </div>
</section>

<script src="dist/index.js"></script>
<script>
    const canvas = document.getElementById('hero-canvas');
    new RealisticStarfield(canvas);
</script>
```

### Full Page Background (with scrollable content)

```html
<style>
    body {
        margin: 0;
        background: #000;
    }
    
    #bg-canvas {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
    }
    
    main {
        position: relative;
        z-index: 1;
        min-height: 100vh;
        color: white;
        padding: 2rem;
    }
</style>

<canvas id="bg-canvas"></canvas>
<main>
    <h1>Page Title</h1>
    <p>Your content scrolls normally while background stays fixed</p>
    <!-- More content... -->
</main>

<script src="dist/index.js"></script>
<script>
    const canvas = document.getElementById('bg-canvas');
    new RealisticStarfield(canvas);
</script>
```

---

## 🛠️ API Reference

### Constructor

```javascript
new RealisticStarfield(canvas, options)
// OR for backward compatibility:
new ConstellationBackground(canvas, options)
```

Creates a new starfield instance.

**Parameters:**
- `canvas` (HTMLCanvasElement) - The canvas element to render on
- `options` (Object, optional) - Configuration object

**Returns:** RealisticStarfield instance

### Methods

#### `destroy()`

Stops the animation and cleans up event listeners. Always call this when removing the canvas (especially in SPAs).

```javascript
starfield.destroy();
```

#### `setOptions(options)`

Update options dynamically without recreating the instance.

```javascript
starfield.setOptions({ meteorInterval: 5000 });
```

#### `triggerMeteor()`

Manually trigger a shooting star (e.g., on button click or event).

```javascript
starfield.triggerMeteor();
```

#### `resize()`

Manually trigger a resize. Usually called automatically on window resize.

```javascript
starfield.resize();
```

---

## 📁 File Structure

```
my-constellation-bg/
├── dist/
│   └── index.js          # Built file (after npm run build)
├── src/
│   └── index.js          # Source file (RealisticStarfield class)
├── test.js               # Test suite
├── index.html            # Demo page
├── package.json
└── README.md
```

---

## 💡 Best Practices

1. **Z-index**: Always set canvas `z-index: -1` to keep it behind content
2. **Fixed positioning**: Use `position: fixed` for full-page backgrounds
3. **Performance**: Lower `starCount` for better mobile performance (try 100-150)
4. **Cleanup**: Always call `destroy()` when unmounting (React/Vue components)
5. **Responsive**: Canvas automatically resizes, no additional code needed
6. **Build first**: Run `npm run build` before using in production

---

## 🌐 Browser Support

Works in all modern browsers that support:
- Canvas API
- ES6 Classes
- RequestAnimationFrame

Tested on: Chrome, Firefox, Safari, Edge

---

## 🎯 Real-World Examples

- Landing page hero sections
- Login/signup page backgrounds
- Portfolio websites
- Dashboard backgrounds
- Loading screens
- Presentation slides
- Marketing pages

---

## � Changelog

### v1.2.0 (2026-01-02)
**Major Update - Grok-style Improvements**
- ✨ **Fixed Position Stars**: Stars now have anchor positions with subtle drift movement
- ☄️ **Variable Speed Meteors**: Added slow (30%), medium (50%), and fast (20%) meteor types
- 💫 **Bright Star Glow**: 15% of stars now feature a special radial glow effect
- 🎨 **Enhanced Meteor Colors**: Different meteor speeds have unique color schemes
- ⚙️ **New Options**: Added `starDrift` and `driftSpeed` configuration options
- 🐛 **Performance**: Optimized animation loop for smoother rendering

### v1.1.3
- Bug fixes and stability improvements

### v1.1.0
- Initial public release with blinking stars, connections, and meteors

---

## �📄 License

MIT © Anupam Raj

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check (https://github.com/anupamraj176/my-constellation-bg).

## 💖 Support

If you like this project, please give it a ⭐ on [GitHub](https://github.com/yourusername/my-constellation-bg)!

---

Made with ☄️ by [Anupam Raj](https://github.com/anupamraj176)
