# Constellation Background

A beautiful, performant animated constellation background with blinking stars, dynamic connections, and falling meteors. Perfect for creating engaging hero sections, landing pages, or any web interface that needs a touch of cosmic elegance.

![Version](https://img.shields.io/badge/version-1.1.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Features
# Constellation Background

A beautiful, performant animated constellation background with blinking stars, dynamic connections, and falling meteors. Perfect for creating engaging hero sections, landing pages, or any web interface that needs a touch of cosmic elegance.

![Version](https://img.shields.io/badge/version-1.1.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Features

- 🌟 **Blinking Stars** - Smoothly animated stars with randomized blink patterns
- 🔗 **Dynamic Connections** - Lines connect nearby stars, creating constellation patterns
- ☄️ **Falling Meteors** - Periodic shooting stars with gradient trails
- 🎨 **Fully Customizable** - Configure colors, counts, speeds, and more
- 📱 **Responsive** - Automatically adapts to canvas/window size
- ⚡ **Lightweight** - Pure vanilla JavaScript, no dependencies
- 🎯 **Easy Integration** - Simple API, works with any framework

## 📦 Installation

```bash
npm install my-constellation-bg
```

## 🔧 Build First

Before using, build the package:

```bash
npm run build
```

This creates the `dist/index.js` file.

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
    <title>Constellation Background</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            overflow: hidden;
            font-family: Arial, sans-serif;
        }

        /* Canvas fills entire viewport */
        #constellation-canvas {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: -1; /* Behind other content */
        }

        /* Your content goes on top */
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

        p {
            font-size: 1.5rem;
        }
    </style>
</head>
<body>
    <!-- Canvas element -->
    <canvas id="constellation-canvas"></canvas>

    <!-- Your content -->
    <div class="content">
        <h1>Welcome to My Site</h1>
        <p>Beautiful constellation background ✨</p>
    </div>

    <!-- Include the script -->
    <script src="dist/index.js"></script>
    
    <!-- Initialize -->
    <script>
        const canvas = document.getElementById('constellation-canvas');
        
        // Create constellation with default settings
        const constellation = new ConstellationBackground(canvas);

        // OR with custom options:
        // const constellation = new ConstellationBackground(canvas, {
        //     starCount: 300,
        //     maxDistance: 150,
        //     backgroundColor: '#0a0e27',
        //     meteorInterval: 2000
        // });
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
    <canvas id="constellation-canvas"></canvas>
    <div class="content">
        <h1>Welcome</h1>
    </div>

    <script type="module">
        import ConstellationBackground from './src/index.js';
        
        const canvas = document.getElementById('constellation-canvas');
        const constellation = new ConstellationBackground(canvas);
    </script>
</body>
</html>
```

---

### Method 2: React

#### Basic Implementation

```jsx
import React, { useEffect, useRef } from 'react';
import ConstellationBackground from 'my-constellation-bg';
// OR if using locally:
// import ConstellationBackground from './path/to/src/index.js';

function App() {
  const canvasRef = useRef(null);
  const constellationRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      // Initialize constellation
      constellationRef.current = new ConstellationBackground(canvasRef.current, {
        starCount: 250,
        maxDistance: 120,
        meteorInterval: 3000
      });
    }

    // Cleanup on unmount
    return () => {
      if (constellationRef.current) {
        constellationRef.current.destroy();
      }
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      {/* Canvas background */}
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
      
      {/* Your content */}
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
// ConstellationCanvas.jsx
import React, { useEffect, useRef } from 'react';
import ConstellationBackground from 'my-constellation-bg';

const ConstellationCanvas = ({ options = {} }) => {
  const canvasRef = useRef(null);
  const constellationRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current && !constellationRef.current) {
      constellationRef.current = new ConstellationBackground(
        canvasRef.current,
        options
      );
    }

    return () => {
      if (constellationRef.current) {
        constellationRef.current.destroy();
        constellationRef.current = null;
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

export default ConstellationCanvas;
```

**Usage:**

```jsx
import ConstellationCanvas from './ConstellationCanvas';

function App() {
  return (
    <>
      <ConstellationCanvas 
        options={{
          starCount: 300,
          meteorInterval: 2000
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
    <canvas ref="canvasRef" class="constellation-canvas"></canvas>
    <div class="content">
      <h1>Welcome to Vue App</h1>
      <p>Powered by Vue 3 🟢</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import ConstellationBackground from 'my-constellation-bg';

const canvasRef = ref(null);
let constellation = null;

onMounted(() => {
  if (canvasRef.value) {
    constellation = new ConstellationBackground(canvasRef.value, {
      starCount: 250,
      maxDistance: 120,
      meteorInterval: 3000
    });
  }
});

onBeforeUnmount(() => {
  if (constellation) {
    constellation.destroy();
  }
});
</script>

<style scoped>
.container {
  position: relative;
  width: 100vw;
  height: 100vh;
}

.constellation-canvas {
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
    <canvas ref="canvas" class="constellation-canvas"></canvas>
    <div class="content">
      <h1>Your Content</h1>
    </div>
  </div>
</template>

<script>
import ConstellationBackground from 'my-constellation-bg';

export default {
  data() {
    return {
      constellation: null
    };
  },
  mounted() {
    this.constellation = new ConstellationBackground(this.$refs.canvas, {
      starCount: 200,
      meteorInterval: 3000
    });
  },
  beforeUnmount() {
    if (this.constellation) {
      this.constellation.destroy();
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

.constellation-canvas {
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
const constellation = new ConstellationBackground(canvas, {
  starCount: 200,                           // Number of stars
  maxDistance: 120,                         // Max distance for connections
  backgroundColor: '#000000',               // Canvas background
  starColor: '#ffffff',                     // Star color
  lineColor: 'rgba(255, 255, 255, 0.15)',  // Connection line color
  meteorInterval: 3000                      // Time between meteors (ms)
});
```

### Options Reference

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `starCount` | Number | `200` | Number of stars to render |
| `maxDistance` | Number | `120` | Maximum distance for star connections (pixels) |
| `backgroundColor` | String | `'#000000'` | Canvas background color |
| `starColor` | String | `'#ffffff'` | Base color for stars |
| `lineColor` | String | `'rgba(255, 255, 255, 0.15)'` | Color for connection lines |
| `meteorInterval` | Number | `3000` | Time between meteor spawns (milliseconds) |

---

## 🎨 Styling Examples

### Dark Theme with Blue Accents

```javascript
new ConstellationBackground(canvas, {
  backgroundColor: '#0a0e27',
  starColor: '#7ec8e3',
  lineColor: 'rgba(126, 200, 227, 0.2)',
  meteorInterval: 2000
});
```

### Minimal Stars

```javascript
new ConstellationBackground(canvas, {
  starCount: 50,
  maxDistance: 200,
  meteorInterval: 5000
});
```

### Dense Constellation

```javascript
new ConstellationBackground(canvas, {
  starCount: 400,
  maxDistance: 80,
  meteorInterval: 1500
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
    new ConstellationBackground(canvas);
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
    new ConstellationBackground(canvas);
</script>
```

---

## 🛠️ API Reference

### Constructor

```javascript
new ConstellationBackground(canvas, options)
```

Creates a new constellation background instance.

**Parameters:**
- `canvas` (HTMLCanvasElement) - The canvas element to render on
- `options` (Object, optional) - Configuration object

**Returns:** ConstellationBackground instance

### Methods

#### `destroy()`

Stops the animation and cleans up event listeners. Always call this when removing the canvas (especially in SPAs).

```javascript
constellation.destroy();
```

#### `resize()`

Manually trigger a resize. Usually called automatically on window resize.

```javascript
constellation.resize();
```

---

## 📁 File Structure

```
my-constellation-bg/
├── dist/
│   └── index.js          # Built file (after npm run build)
├── src/
│   └── index.js          # Source file (ConstellationBackground class)
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

## 📄 License

MIT © Your Name

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check [issues page](https://github.com/yourusername/my-constellation-bg/issues).

## 💖 Support

If you like this project, please give it a ⭐ on [GitHub](https://github.com/yourusername/my-constellation-bg)!

---

Made with ☄️ by [Your Name](https://github.com/yourusername)
- 🌟 **Blinking Stars** - Smoothly animated stars with randomized blink patterns
- 🔗 **Dynamic Connections** - Lines connect nearby stars, creating constellation patterns
- ☄️ **Falling Meteors** - Periodic shooting stars with gradient trails
- 🎨 **Fully Customizable** - Configure colors, counts, speeds, and more
- 📱 **Responsive** - Automatically adapts to canvas/window size
- ⚡ **Lightweight** - Pure vanilla JavaScript, no dependencies
- 🎯 **Easy Integration** - Simple API, works with any framework

## 📦 Installation

```bash
npm install my-constellation-bg
```

## 🔧 Build First

Before using, build the package:

```bash
npm run build
```

This creates the `dist/index.js` file.

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
    <title>Constellation Background</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            overflow: hidden;
            font-family: Arial, sans-serif;
        }

        /* Canvas fills entire viewport */
        #constellation-canvas {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: -1; /* Behind other content */
        }

        /* Your content goes on top */
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

        p {
            font-size: 1.5rem;
        }
    </style>
</head>
<body>
    <!-- Canvas element -->
    <canvas id="constellation-canvas"></canvas>

    <!-- Your content -->
    <div class="content">
        <h1>Welcome to My Site</h1>
        <p>Beautiful constellation background ✨</p>
    </div>

    <!-- Include the script -->
    <script src="dist/index.js"></script>
    
    <!-- Initialize -->
    <script>
        const canvas = document.getElementById('constellation-canvas');
        
        // Create constellation with default settings
        const constellation = new ConstellationBackground(canvas);

        // OR with custom options:
        // const constellation = new ConstellationBackground(canvas, {
        //     starCount: 300,
        //     maxDistance: 150,
        //     backgroundColor: '#0a0e27',
        //     meteorInterval: 2000
        // });
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
    <canvas id="constellation-canvas"></canvas>
    <div class="content">
        <h1>Welcome</h1>
    </div>

    <script type="module">
        import ConstellationBackground from './src/index.js';
        
        const canvas = document.getElementById('constellation-canvas');
        const constellation = new ConstellationBackground(canvas);
    </script>
</body>
</html>
```

---

### Method 2: React

#### Basic Implementation

```jsx
import React, { useEffect, useRef } from 'react';
import ConstellationBackground from 'my-constellation-bg';
// OR if using locally:
// import ConstellationBackground from './path/to/src/index.js';

function App() {
  const canvasRef = useRef(null);
  const constellationRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      // Initialize constellation
      constellationRef.current = new ConstellationBackground(canvasRef.current, {
        starCount: 250,
        maxDistance: 120,
        meteorInterval: 3000
      });
    }

    // Cleanup on unmount
    return () => {
      if (constellationRef.current) {
        constellationRef.current.destroy();
      }
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      {/* Canvas background */}
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
      
      {/* Your content */}
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
// ConstellationCanvas.jsx
import React, { useEffect, useRef } from 'react';
import ConstellationBackground from 'my-constellation-bg';

const ConstellationCanvas = ({ options = {} }) => {
  const canvasRef = useRef(null);
  const constellationRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current && !constellationRef.current) {
      constellationRef.current = new ConstellationBackground(
        canvasRef.current,
        options
      );
    }

    return () => {
      if (constellationRef.current) {
        constellationRef.current.destroy();
        constellationRef.current = null;
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

export default ConstellationCanvas;
```

**Usage:**

```jsx
import ConstellationCanvas from './ConstellationCanvas';

function App() {
  return (
    <>
      <ConstellationCanvas 
        options={{
          starCount: 300,
          meteorInterval: 2000
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
    <canvas ref="canvasRef" class="constellation-canvas"></canvas>
    <div class="content">
      <h1>Welcome to Vue App</h1>
      <p>Powered by Vue 3 🟢</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import ConstellationBackground from 'my-constellation-bg';

const canvasRef = ref(null);
let constellation = null;

onMounted(() => {
  if (canvasRef.value) {
    constellation = new ConstellationBackground(canvasRef.value, {
      starCount: 250,
      maxDistance: 120,
      meteorInterval: 3000
    });
  }
});

onBeforeUnmount(() => {
  if (constellation) {
    constellation.destroy();
  }
});
</script>

<style scoped>
.container {
  position: relative;
  width: 100vw;
  height: 100vh;
}

.constellation-canvas {
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
    <canvas ref="canvas" class="constellation-canvas"></canvas>
    <div class="content">
      <h1>Your Content</h1>
    </div>
  </div>
</template>

<script>
import ConstellationBackground from 'my-constellation-bg';

export default {
  data() {
    return {
      constellation: null
    };
  },
  mounted() {
    this.constellation = new ConstellationBackground(this.$refs.canvas, {
      starCount: 200,
      meteorInterval: 3000
    });
  },
  beforeUnmount() {
    if (this.constellation) {
      this.constellation.destroy();
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

.constellation-canvas {
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
const constellation = new ConstellationBackground(canvas, {
  starCount: 200,                           // Number of stars
  maxDistance: 120,                         // Max distance for connections
  backgroundColor: '#000000',               // Canvas background
  starColor: '#ffffff',                     // Star color
  lineColor: 'rgba(255, 255, 255, 0.15)',  // Connection line color
  meteorInterval: 3000                      // Time between meteors (ms)
});
```

### Options Reference

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `starCount` | Number | `200` | Number of stars to render |
| `maxDistance` | Number | `120` | Maximum distance for star connections (pixels) |
| `backgroundColor` | String | `'#000000'` | Canvas background color |
| `starColor` | String | `'#ffffff'` | Base color for stars |
| `lineColor` | String | `'rgba(255, 255, 255, 0.15)'` | Color for connection lines |
| `meteorInterval` | Number | `3000` | Time between meteor spawns (milliseconds) |

---

## 🎨 Styling Examples

### Dark Theme with Blue Accents

```javascript
new ConstellationBackground(canvas, {
  backgroundColor: '#0a0e27',
  starColor: '#7ec8e3',
  lineColor: 'rgba(126, 200, 227, 0.2)',
  meteorInterval: 2000
});
```

### Minimal Stars

```javascript
new ConstellationBackground(canvas, {
  starCount: 50,
  maxDistance: 200,
  meteorInterval: 5000
});
```

### Dense Constellation

```javascript
new ConstellationBackground(canvas, {
  starCount: 400,
  maxDistance: 80,
  meteorInterval: 1500
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
    new ConstellationBackground(canvas);
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
    new ConstellationBackground(canvas);
</script>
```

---

## 🛠️ API Reference

### Constructor

```javascript
new ConstellationBackground(canvas, options)
```

Creates a new constellation background instance.

**Parameters:**
- `canvas` (HTMLCanvasElement) - The canvas element to render on
- `options` (Object, optional) - Configuration object

**Returns:** ConstellationBackground instance

### Methods

#### `destroy()`

Stops the animation and cleans up event listeners. Always call this when removing the canvas (especially in SPAs).

```javascript
constellation.destroy();
```

#### `resize()`

Manually trigger a resize. Usually called automatically on window resize.

```javascript
constellation.resize();
```

---

## 📁 File Structure

```
my-constellation-bg/
├── dist/
│   └── index.js          # Built file (after npm run build)
├── src/
│   └── index.js          # Source file (ConstellationBackground class)
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

## 📄 License

MIT © Your Name

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check [issues page](https://github.com/yourusername/my-constellation-bg/issues).

## 💖 Support

If you like this project, please give it a ⭐ on [GitHub](https://github.com/yourusername/my-constellation-bg)!

---

Made with ☄️ by [Your Name](https://github.com/yourusername)
