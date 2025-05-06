
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				dark: {
					DEFAULT: '#1C2526',
					secondary: '#2D3A3E'
				},
				neon: {
					cyan: '#00D1FF',
					magenta: '#FF007A',
				},
				// Add light theme specific colors
				blue: {
					25: '#F5F9FF',
					50: '#EBF5FF',
					100: '#E1EFFE',
					200: '#C3DDFD',
					300: '#A4CAFE',
					400: '#76A9FA',
					500: '#3F83F8',
					600: '#1C64F2',
					700: '#1A56DB',
					800: '#1E429F',
					900: '#233876',
				},
				pink: {
					25: '#FFF5F7',
					50: '#FFF0F5',
					100: '#FFDEEB',
					200: '#FBB6CE',
					300: '#F687B3',
					400: '#ED64A6',
					500: '#D53F8C',
					600: '#B83280',
					700: '#97266D',
					800: '#702459',
					900: '#521B41',
				},
				gray: {
					50: '#F9FAFB',
					100: '#F3F4F6',
					200: '#E5E7EB',
					300: '#D1D5DB',
					400: '#9CA3AF',
					500: '#6B7280',
					600: '#4B5563',
					700: '#374151',
					800: '#1F2937',
					900: '#111827',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(8px) translateZ(0)' },
					'100%': { opacity: '1', transform: 'translateY(0) translateZ(0)' }
				},
				'fade-out': {
					'0%': { opacity: '1', transform: 'translateY(0) translateZ(0)' },
					'100%': { opacity: '0', transform: 'translateY(8px) translateZ(0)' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95) translateZ(0)', opacity: '0' },
					'100%': { transform: 'scale(1) translateZ(0)', opacity: '1' }
				},
				'scale-out': {
					from: { transform: 'scale(1) translateZ(0)', opacity: '1' },
					to: { transform: 'scale(0.95) translateZ(0)', opacity: '0' }
				},
				'slide-in-right': {
					'0%': { transform: 'translateX(100%) translateZ(0)' },
					'100%': { transform: 'translateX(0) translateZ(0)' }
				},
				'slide-out-right': {
					'0%': { transform: 'translateX(0) translateZ(0)' },
					'100%': { transform: 'translateX(100%) translateZ(0)' }
				},
				'pulse-glow': {
					'0%, 100%': { boxShadow: '0 0 5px 0 rgba(0, 209, 255, 0.3)' },
					'50%': { boxShadow: '0 0 10px 2px rgba(0, 209, 255, 0.5)' }
				},
				'float': {
					'0%': { transform: 'translateY(0) translateZ(0)' },
					'50%': { transform: 'translateY(-10px) translateZ(0)' },
					'100%': { transform: 'translateY(0) translateZ(0)' }
				},
				'rotate-slow': {
					'0%': { transform: 'rotate(0deg) translateZ(0)' },
					'100%': { transform: 'rotate(360deg) translateZ(0)' }
				},
				'dashboard-float': {
					'0%': { transform: 'translateY(0) translateZ(0)' },
					'50%': { transform: 'translateY(-15px) translateZ(0)' },
					'100%': { transform: 'translateY(0) translateZ(0)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.25s ease-out',
				'fade-out': 'fade-out 0.25s ease-out',
				'scale-in': 'scale-in 0.2s ease-out',
				'scale-out': 'scale-out 0.2s ease-out',
				'slide-in-right': 'slide-in-right 0.3s ease-out',
				'slide-out-right': 'slide-out-right 0.3s ease-out',
				'enter': 'fade-in 0.25s ease-out',
				'exit': 'fade-out 0.25s ease-out',
				'pulse-glow': 'pulse-glow 3.5s infinite ease-in-out',
				'float': 'float 6s infinite ease-in-out',
				'rotate-slow': 'rotate-slow 45s linear infinite',
				'dashboard-float': 'dashboard-float 6s infinite ease-in-out',
			},
			backgroundImage: {
				'gradient-dark': 'linear-gradient(to bottom right, #1C2526, #2D3A3E)',
				'gradient-light': 'linear-gradient(to bottom right, #F9FAFB, #F3F4F6)',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
