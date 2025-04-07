@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --neon-blue: #08D9D6;
    --neon-cyan: #00EEFF;
    --neon-magenta: #FF2A6D;
    --neon-purple: #D866FF;
    --radius: 0.5rem;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-[#040D12] text-white font-orbit;
  }
}

@layer components {
  .glass-card {
    @apply bg-opacity-10 bg-white backdrop-filter backdrop-blur-md border border-white/10;
  }

  .drop-shadow-glow {
    filter: drop-shadow(0 0 8px rgba(0, 238, 255, 0.3));
  }

  .shadow-glow-cyan {
    box-shadow: 0 0 15px rgba(0, 238, 255, 0.3);
  }

  .shadow-glow-magenta {
    box-shadow: 0 0 15px rgba(255, 42, 109, 0.3);
  }

  .shadow-glow-mixed {
    box-shadow: 0 0 15px rgba(0, 238, 255, 0.2), 0 0 15px rgba(255, 42, 109, 0.2);
  }

  .shadow-glow-subtle {
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.07);
  }

  .bg-blur {
    @apply bg-black/70 backdrop-blur-md;
  }
  
  .hero-pattern {
    background-image: 
      linear-gradient(to bottom, rgba(4, 13, 18, 0.85), rgba(4, 13, 18, 0.95)),
      url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300EEFF' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"),
      radial-gradient(circle at top right, rgba(0, 238, 255, 0.1), transparent 70%),
      radial-gradient(circle at bottom left, rgba(255, 42, 109, 0.1), transparent 70%);
    background-attachment: fixed;
  }
  
  .grid-pattern {
    background-image:
      linear-gradient(to bottom, rgba(4, 13, 18, 0.9), rgba(4, 13, 18, 0.98)),
      linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
      linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    background-size: 100%, 20px 20px, 20px 20px;
  }
  
  .cyberpunk-grid {
    background-image:
      radial-gradient(circle at 50% 50%, rgba(0, 238, 255, 0.15), transparent 35%),
      radial-gradient(circle at 85% 20%, rgba(255, 42, 109, 0.1), transparent 25%),
      linear-gradient(to right, rgba(0, 238, 255, 0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(0, 238, 255, 0.05) 1px, transparent 1px);
    background-size: 100% 100%, 100% 100%, 40px 40px, 40px 40px;
    background-attachment: fixed;
  }
  
  .matrix-bg {
    position: relative;
    overflow: hidden;
  }
  
  .matrix-bg:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(180deg, rgba(4, 13, 18, 0.8) 0%, rgba(4, 13, 18, 0.95) 70%),
      url("data:image/svg+xml,%3Csvg width='100' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='0' y='15' font-family='monospace' font-size='10' fill='rgba(0, 238, 255, 0.07)'%3E01010101%3C/text%3E%3Ctext x='20' y='7' font-family='monospace' font-size='7' fill='rgba(255, 42, 109, 0.05)'%3E10101%3C/text%3E%3Ctext x='50' y='15' font-family='monospace' font-size='12' fill='rgba(0, 238, 255, 0.05)'%3E010%3C/text%3E%3C/svg%3E");
    z-index: -1;
    opacity: 0.4;
  }
  
  .neon-circuit {
    position: relative;
  }
  
  .neon-circuit:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.15;
    background-image: 
      linear-gradient(to bottom, rgba(4, 13, 18, 0.7), rgba(4, 13, 18, 0.98)),
      url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0 L50 0 L50 50 L100 50 L100 100 L50 100 L50 50 L0 50 Z' stroke='rgba(0, 238, 255, 0.1)' fill='none' stroke-width='0.5'/%3E%3Cpath d='M25 25 L75 25 L75 75 L25 75 Z' stroke='rgba(255, 42, 109, 0.1)' fill='none' stroke-width='0.5'/%3E%3C/svg%3E");
    z-index: -1;
  }
  
  .digital-rain {
    background-image: 
      linear-gradient(0deg, rgba(4, 13, 18, 0.85) 0%, rgba(4, 13, 18, 0.95) 100%),
      url("data:image/svg+xml,%3Csvg width='290' height='600' viewBox='0 0 290 600' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg opacity='0.15'%3E%3Ctext fill='%2300EEFF' xml:space='preserve' style='white-space: pre' font-family='monospace' font-size='12' letter-spacing='0em'%3E%3Ctspan x='10' y='14.9453'%3E01001010111001010%3C/tspan%3E%3C/text%3E%3Ctext fill='%2300EEFF' xml:space='preserve' style='white-space: pre' font-family='monospace' font-size='12' letter-spacing='0em'%3E%3Ctspan x='50' y='34.9453'%3E10101010%3C/tspan%3E%3C/text%3E%3Ctext fill='%23FF2A6D' xml:space='preserve' style='white-space: pre' font-family='monospace' font-size='12' letter-spacing='0em'%3E%3Ctspan x='150' y='54.9453'%3E0101010%3C/tspan%3E%3C/text%3E%3Ctext fill='%2300EEFF' xml:space='preserve' style='white-space: pre' font-family='monospace' font-size='12' letter-spacing='0em'%3E%3Ctspan x='30' y='74.9453'%3E0101010101%3C/tspan%3E%3C/text%3E%3Ctext fill='%23D866FF' xml:space='preserve' style='white-space: pre' font-family='monospace' font-size='12' letter-spacing='0em'%3E%3Ctspan x='80' y='94.9453'%3E010101%3C/tspan%3E%3C/text%3E%3C/g%3E%3C/svg%3E");
    background-repeat: repeat;
    background-attachment: fixed;
  }
}

.font-orbit {
  font-family: 'Outfit', sans-serif;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 15px rgba(0, 238, 255, 0.3);
  }
  50% {
    box-shadow: 0 0 25px rgba(0, 238, 255, 0.6);
  }
}

@keyframes rotateGradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulse 3s ease-in-out infinite;
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

.animate-glow {
  animation: glow 3s infinite;
}

.animate-rotate-gradient {
  animation: rotateGradient 5s ease infinite;
  background-size: 200% 200%;
}

.text-gradient-animated {
  @apply bg-gradient-to-r from-neon-cyan via-white to-neon-magenta bg-clip-text text-transparent;
  @apply animate-rotate-gradient;
}

.hero-btn-hover {
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.hero-btn-hover:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.5s ease;
  z-index: -1;
}

.hero-btn-hover:hover:after {
  transform: scaleX(1);
  transform-origin: left;
}

.text-outline {
  text-shadow: 
    -1px -1px 0 rgba(0, 238, 255, 0.3),
    1px -1px 0 rgba(0, 238, 255, 0.3),
    -1px 1px 0 rgba(0, 238, 255, 0.3),
    1px 1px 0 rgba(0, 238, 255, 0.3);
}

.clip-path-slant {
  clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
}

.clip-path-wave {
  clip-path: polygon(
    0% 0%,
    100% 0%,
    100% 85%,
    75% 90%,
    50% 85%,
    25% 90%,
    0% 85%
  );
}
