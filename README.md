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

## 🚀 Quick Start

### HTML

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body, html {
            margin: 0;
            padding: 0;
            overflow: hidden;
        }
        #constellation {
            width: 100vw;
            height: 100vh;
        }
    </style>
</head>
<body>
    <canvas id="constellation"></canvas>
    <script src="path/to/dist/index.js"></script>
    <script>
        const canvas = document.getElementById('constellation');
        const constellation = new ConstellationBackground(canvas);
    </script>
</body>
</html>
```

### ES6 Module

```javascript
import ConstellationBackground from 'my-constellation-bg';

const canvas = document.getElementById('constellation');
const constellation = new ConstellationBackground(canvas);
```

### React

```jsx
import { useEffect, useRef } from 'react';
import ConstellationBackground from 'my-constellation-bg';

function App() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const constellation = new ConstellationBackground(canvasRef.current);
    
    return () => constellation.destroy();
  }, []);

  return <canvas ref={canvasRef} style={{ width: '100vw', height: '100vh' }} />;
}
```

### Vue

```vue
<template>
  <canvas ref="canvas" style="width: 100vw; height: 100vh;"></canvas>
</template>

<script>
import ConstellationBackground from 'my-constellation-bg';

export default {
  mounted() {
    this.constellation = new ConstellationBackground(this.$refs.canvas);
  },
  beforeUnmount() {
    this.constellation.destroy();
  }
}
</script>
```

## ⚙️ Configuration

Customize the appearance and behavior with options:

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
| `maxDistance` | Number | `120` | Maximum distance for star connections (in pixels) |
| `backgroundColor` | String | `'#000000'` | Canvas background color |
| `starColor` | String | `'#ffffff'` | Base color for stars |
| `lineColor` | String | `'rgba(255, 255, 255, 0.15)'` | Color for connection lines |
| `meteorInterval` | Number | `3000` | Time between meteor spawns (in milliseconds) |

## 🎨 Examples

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

## 🛠️ API Reference

### Constructor

```javascript
new ConstellationBackground(canvas, options)
```

Creates a new constellation background instance.

**Parameters:**
- `canvas` (HTMLCanvasElement) - The canvas element to render on
- `options` (Object) - Optional configuration object

### Methods

#### `destroy()`

Stops the animation and cleans up event listeners.

```javascript
constellation.destroy();
```

#### `resize()`

Manually trigger a resize (usually called automatically).

```javascript
constellation.resize();
```

## 🎯 Use Cases

- Hero sections on landing pages
- Background for login/signup pages
- Portfolio website backgrounds
- Dashboard backgrounds
- Loading screens
- Presentation slides

## 🌐 Browser Support

Works in all modern browsers that support:
- Canvas API
- ES6 Classes
- RequestAnimationFrame

## 📄 License

MIT © Anupam Raj

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 💖 Support

If you like this project, please give it a ⭐ on [GitHub](https://github.com/anupamraj176/my-constellation-bg)!

---

Made with ☄️ by [Anupam raj](https://github.com/anupamraj176)