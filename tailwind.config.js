import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{tsx,ts,jsx,js}"],
  safelist: [
    {
      pattern:
        /^(text|bg|outline|border)-(accent|info|warning|error|success|neutral|status-0[1-6])(?:-(muted|hover|active|soft|container|on-container|on-(accent|info|warning|error|success|neutral|status-0[1-6]))(?:-(soft|hover|active|muted))?)?(?!.*\d$)/,
      variants: ["hover", "focus-visible", "disabled"],
    },
  ],
  theme: {
    container: {
      center: true,
      padding: {
        "2xl": "3rem",
        xl: "3rem",
        lg: "3rem",
        md: "2.5rem",
        sm: "1rem",
        DEFAULT: "1rem",
      },
    },
    extend: {
      fontWeight: {
        "weight-display": "var(--font-weight-display)",
        "weight-display-strong": "var(--font-weight-display-strong)",
        "weight-heading": "var(--font-weight-heading)",
        "weight-body": "var(--font-weight-body)",
        "weight-body-strong": "var(--font-weight-body-strong)",
        "weight-description": "var(--font-weight-description)",
        "weight-description-strong": "var(--font-weight-description-strong)",
      },
      spacing: {
        base: "var(--spacing-base)",
        none: "var(--spacing-base)",
        px: "var(--spacing-px)",
        "0.5px": "var(--spacing-0-5x)",
        "1x": "var(--spacing-1x)",
        "1.5px": "var(--spacing-1-5x)",
        "2x": "var(--spacing-2x)",
        "3x": "var(--spacing-3x)",
        "4x": "var(--spacing-4x)",
        "5x": "var(--spacing-5x)",
        "6x": "var(--spacing-6x)",
        "8x": "var(--spacing-8x)",
        "10x": "var(--spacing-10x)",
        "12x": "var(--spacing-12x)",
        "16x": "var(--spacing-16x)",
        "20x": "var(--spacing-20x)",
        "24x": "var(--spacing-24x)",
        "32x": "var(--spacing-32x)",
        "48x": "var(--spacing-48x)",
      },
      size: {
        base: "var(--size-base)",
        xl: "var(--size-xl)",
        l: "var(--size-l)",
        m: "var(--size-m)",
        "m-chip": "var(--size-m-chip)",
        "m-tag": "var(--size-m-tag)",
        s: "var(--size-s)",
        xs: "var(--size-xs)",
        "2xs": "var(--size-2xs)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "opacity-enter": {
          from: { opacity: "0" },
          to: { opacity: "100" },
        },
        "opacity-exit": {
          from: { opacity: "100" },
          to: { opacity: "0" },
        },
        "dialog-enter-full": {
          from: {
            transform: "translateX(100%)",
          },
          to: {
            transform: "translateX(0%)",
          },
        },
        "dialog-exit-full": {
          from: {
            transform: "translateX(0%)",
          },
          to: {
            transform: "translateX(100%)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "popover-enter":
          "opacity-enter var(--motion-duration-xs) var(--motion-easing-productive-entrance)",
        "popover-exit":
          "opacity-exit var(--motion-duration-xs) var(--motion-easing-productive-exit)",
        "dropdown-enter":
          "opacity-enter var(--motion-duration-xs) var(--motion-easing-productive-entrance)",
        "dropdown-exit":
          "opacity-exit var(--motion-duration-xs) var(--motion-easing-productive-exit)",
        "overlay-enter":
          "opacity-enter var(--motion-duration-xs) var(--motion-easing-productive-entrance)",
        "overlay-exit":
          "opacity-exit var(--motion-duration-xs) var(--motion-easing-productive-exit)",
        "dialog-enter-full":
          "dialog-enter-full var(--motion-duration-m) var(--motion-easing-expressive-entrance)",
        "dialog-exit-full":
          "dialog-exit-full var(--motion-duration-m) var(--motion-easing-expressive-exit)",
        "dialog-enter":
          "opacity-enter var(--motion-duration-xs) var(--motion-easing-productive-entrance)",
        "dialog-exit":
          "opacity-exit var(--motion-duration-xs) var(--motion-easing-productive-exit)",
      },
    },
    borderRadius: {
      base: "var(--border-radius-base)",
      none: "var(--border-radius-none)",
      full: "var(--border-radius-full)",
      "2xs": "var(--border-radius-2xs)",
      xs: "var(--border-radius-xs)",
      s: "var(--border-radius-s)",
      m: "var(--border-radius-m)",
      l: "var(--border-radius-l)",
      xl: "var(--border-radius-xl)",
      "2xl": "var(--border-radius-2xl)",
      inputs: "var(--border-radius-inputs)",
      buttons: "var(--border-radius-buttons)",
      controls: "var(--border-radius-controls)",
    },
    borderWidth: {
      none: "var(--border-width-none)",
      s: "var(--border-width-s)",
      m: "var(--border-width-m)",
      l: "var(--border-width-l)",
      inputs: "var(--border-width-inputs)",
      buttons: "var(--border-width-buttons)",
      controls: "var(--border-width-controls)",
      dividers: "var(--border-width-dividers)",
    },
    screens: {
      sm: "768px",
      md: "1024px",
      lg: "1280px",
      xl: "1504px",
      "2xl": "1600px",
    },
    zIndex: {
      hide: "var(--z-index-hide)",
      default: "var(--z-index-default)",
      dropdown: "var(--z-index-dropdown)",
      sticky: "var(--z-index-sticky)",
      fab: "var(--z-index-fab)",
      overlay: "var(--z-index-overlay)",
      loader: "var(--z-index-loader)",
      modal: "var(--z-index-modal)",
      toast: "var(--z-index-toast)",
      popover: "var(--z-index-popover)",
      tooltip: "var(--z-index-tooltip)",
    },
    transitionDuration: {
      "2xs": "var(--motion-duration-2xs)",
      xs: "var(--motion-duration-xs)",
      s: "var(--motion-duration-s)",
      m: "var(--motion-duration-m)",
      l: "var(--motion-duration-l)",
      xl: "var(--motion-duration-xl)",
    },
    transitionTimingFunction: {
      linear: "var(--motion-easing-linear)",
      "productive-standart": "var(--motion-easing-productive-standart)",
      "productive-entrance": "var(--motion-easing-productive-entrance)",
      "productive-exit": "var(--motion-easing-productive-exit)",
      "productive-bouncing": "var(--motion-easing-productive-bouncing)",
      "expressive-standart": "var(--motion-easing-expressive-standart)",
      "expressive-entrance": "var(--motion-easing-expressive-entrance)",
      "expressive-exit": "var(--motion-easing-expressive-exit)",
      "expressive-bouncing": "var(--motion-easing-expressive-bouncing)",
    },
    letterSpacing: {
      "description-m": "var(--font-letter-spacing-description-m)",
      "description-s": "var(--font-letter-spacing-description-s)",
    },
    fontSize: {
      base: ["var(--font-size-base)", "var(--font-line-height-base)"],
      "display-l": [
        "var(--font-size-display-l)",
        "var(--font-line-height-display-l)",
      ],
      "display-m": [
        "var(--font-size-display-m)",
        "var(--font-line-height-display-m)",
      ],
      "display-s": [
        "var(--font-size-display-s)",
        "var(--font-line-height-display-s)",
      ],
      "heading-1": [
        "var(--font-size-heading-h1)",
        "var(--font-line-height-heading-h1)",
      ],
      "heading-2": [
        "var(--font-size-heading-h2)",
        "var(--font-line-height-heading-h2)",
      ],
      "heading-3": [
        "var(--font-size-heading-h3)",
        "var(--font-line-height-heading-h3)",
      ],
      "heading-4": [
        "var(--font-size-heading-h4)",
        "var(--font-line-height-heading-h4)",
      ],
      "heading-5": [
        "var(--font-size-heading-h5)",
        "var(--font-line-height-heading-h5)",
      ],
      "body-l": ["var(--font-size-body-l)", "var(--font-line-height-body-l)"],
      "body-m": ["var(--font-size-body-m)", "var(--font-line-height-body-m)"],
      "body-s": ["var(--font-size-body-s)", "var(--font-line-height-body-s)"],
      "description-l": [
        "var(--font-size-description-l)",
        "var(--font-line-height-description-l)",
      ],
      "description-m": [
        "var(--font-size-description-m)",
        "var(--font-line-height-description-m)",
      ],
      "description-s": [
        "var(--font-size-description-s)",
        "var(--font-line-height-description-s)",
      ],
    },
    boxShadow: {
      "button-ring": "var(--shadow-button-ring)",
      "bottom-s": "var(--shadow-bottom-small)",
      "bottom-m": "var(--shadow-bottom-medium)",
      "bottom-l": "var(--shadow-bottom-large)",
      "bottom-xl": "var(--shadow-bottom-extra-large)",
      "bottom-controls": "var(--shadow-bottom-controls)",
      "top-s": "var(--shadow-top-small)",
      "top-m": "var(--shadow-top-medium)",
      "top-l": "var(--shadow-top-large)",
      "top-xl": "var(--shadow-top-extra-large)",
      "top-controls": "var(--shadow-top-controls)",
      "bottom-accent-s": "var(--shadow-bottom-accent-small)",
      "bottom-accent-m": "var(--shadow-bottom-accent-medium)",
      "bottom-accent-l": "var(--shadow-bottom-accent-large)",
      "bottom-accent-xl": "var(--shadow-bottom-accent-extra-large)",
      "bottom-accent-controls": "var(--shadow-bottom-accent-controls)",
    },
    fontFamily: {
      base: ["var(--font-family-base)", "sans-serif"],
      display: ["var(--font-family-display)", "sans-serif"],
      heading: ["var(--font-family-heading)", "sans-serif"],
      body: ["var(--font-family-body)", "sans-serif"],
      description: ["var(--font-family-description)", "sans-serif"],
    },
    colors: {
      current: "currentColor",
      transparent: "transparent",
      base: {
        neutral: "hsla(var(--base-neutral))",
        accent: "hsla(var(--base-accent))",
        success: "hsla(var(--base-success))",
        warning: "hsla(var(--base-warning))",
        error: "hsla(var(--base-error))",
        info: "hsla(var(--base-info))",
        "status-01": "hsla(var(--base-status-01))",
        "status-02": "hsla(var(--base-status-02))",
        "status-03": "hsla(var(--base-status-03))",
        "status-04": "hsla(var(--base-status-04))",
        "status-05": "hsla(var(--base-status-05))",
        "status-06": "hsla(var(--base-status-06))",
      },
      fg: {
        DEFAULT: "hsla(var(--fg-default))",
        soft: "hsla(var(--fg-soft))",
        muted: "hsla(var(--fg-muted))",
        disabled: "hsla(var(--fg-disabled))",
      },
      bg: {
        surface1: "hsla(var(--bg-surface1))",
        surface2: "hsla(var(--bg-surface2))",
        surface3: "hsla(var(--bg-surface3))",
        surface4: "hsla(var(--bg-surface4))",
        surface5: "hsla(var(--bg-surface5))",
        page: "hsla(var(--bg-page))",
        disabled: "hsla(var(--bg-disabled))",
        "elevated-0": "hsla(var(--bg-elevated-0))",
        "elevated-s": "hsla(var(--bg-elevated-s))",
        "elevated-m": "hsla(var(--bg-elevated-m))",
        "elevated-l": "hsla(var(--bg-elevated-l))",
        "elevated-xl": "hsla(var(--bg-elevated-xl))",
      },
      border: {
        DEFAULT: "hsla(var(--border-default))",
        soft: "hsla(var(--border-soft))",
        muted: "hsla(var(--border-muted))",
      },
      accent: {
        DEFAULT: "hsla(var(--accent-default))",
        soft: "hsla(var(--accent-soft))",
        muted: "hsla(var(--accent-muted))",
        hover: "hsla(var(--accent-hover))",
        active: "hsla(var(--accent-active))",
        container: "hsla(var(--accent-container-default))",
        "container-soft": "hsla(var(--accent-container-soft))",
        "container-muted": "hsla(var(--accent-container-muted))",
        "container-hover": "hsla(var(--accent-container-hover))",
        "container-active": "hsla(var(--accent-container-active))",
        "on-container": "hsla(var(--accent-on-container))",
        "on-accent": "hsla(var(--accent-on-accent))",
        1000: "hsla(var(--accent-1000))",
        990: "hsla(var(--accent-990))",
        950: "hsla(var(--accent-950))",
        925: "hsla(var(--accent-925))",
        900: "hsla(var(--accent-900))",
        800: "hsla(var(--accent-800))",
        700: "hsla(var(--accent-700))",
        600: "hsla(var(--accent-600))",
        500: "hsla(var(--accent-500))",
        400: "hsla(var(--accent-400))",
        300: "hsla(var(--accent-300))",
        200: "hsla(var(--accent-200))",
        100: "hsla(var(--accent-100))",
        50: "hsla(var(--accent-50))",
        25: "hsla(var(--accent-25))",
        10: "hsla(var(--accent-10))",
        0: "hsla(var(--accent-0))",
      },
      neutral: {
        DEFAULT: "hsla(var(--neutral-default))",
        soft: "hsla(var(--neutral-soft))",
        muted: "hsla(var(--neutral-muted))",
        hover: "hsla(var(--neutral-hover))",
        active: "hsla(var(--neutral-active))",
        container: "hsla(var(--neutral-container-default))",
        "container-soft": "hsla(var(--neutral-container-soft))",
        "container-muted": "hsla(var(--neutral-container-muted))",
        "container-hover": "hsla(var(--neutral-container-hover))",
        "container-active": "hsla(var(--neutral-container-active))",
        "on-container": "hsla(var(--neutral-on-container))",
        "on-neutral": "hsla(var(--neutral-on-neutral))",
        1000: "hsla(var(--neutral-1000))",
        990: "hsla(var(--neutral-990))",
        950: "hsla(var(--neutral-950))",
        925: "hsla(var(--neutral-925))",
        900: "hsla(var(--neutral-900))",
        800: "hsla(var(--neutral-800))",
        700: "hsla(var(--neutral-700))",
        600: "hsla(var(--neutral-600))",
        500: "hsla(var(--neutral-500))",
        400: "hsla(var(--neutral-400))",
        300: "hsla(var(--neutral-300))",
        200: "hsla(var(--neutral-200))",
        100: "hsla(var(--neutral-100))",
        50: "hsla(var(--neutral-50))",
        25: "hsla(var(--neutral-25))",
        10: "hsla(var(--neutral-10))",
        0: "hsla(var(--neutral-0))",
      },
      success: {
        DEFAULT: "hsla(var(--success-default))",
        soft: "hsla(var(--success-soft))",
        muted: "hsla(var(--success-muted))",
        hover: "hsla(var(--success-hover))",
        active: "hsla(var(--success-active))",
        container: "hsla(var(--success-container-default))",
        "container-soft": "hsla(var(--success-container-soft))",
        "container-muted": "hsla(var(--success-container-muted))",
        "container-hover": "hsla(var(--success-container-hover))",
        "container-active": "hsla(var(--success-container-active))",
        "on-container": "hsla(var(--success-on-container))",
        "on-success": "hsla(var(--success-on-success))",
        1000: "hsla(var(--success-1000))",
        990: "hsla(var(--success-990))",
        950: "hsla(var(--success-950))",
        925: "hsla(var(--success-925))",
        900: "hsla(var(--success-900))",
        800: "hsla(var(--success-800))",
        700: "hsla(var(--success-700))",
        600: "hsla(var(--success-600))",
        500: "hsla(var(--success-500))",
        400: "hsla(var(--success-400))",
        300: "hsla(var(--success-300))",
        200: "hsla(var(--success-200))",
        100: "hsla(var(--success-100))",
        50: "hsla(var(--success-50))",
        25: "hsla(var(--success-25))",
        10: "hsla(var(--success-10))",
        0: "hsla(var(--success-0))",
      },
      warning: {
        DEFAULT: "hsla(var(--warning-default))",
        soft: "hsla(var(--warning-soft))",
        muted: "hsla(var(--warning-muted))",
        hover: "hsla(var(--warning-hover))",
        active: "hsla(var(--warning-active))",
        container: "hsla(var(--warning-container-default))",
        "container-soft": "hsla(var(--warning-container-soft))",
        "container-muted": "hsla(var(--warning-container-muted))",
        "container-hover": "hsla(var(--warning-container-hover))",
        "container-active": "hsla(var(--warning-container-active))",
        "on-container": "hsla(var(--warning-on-container))",
        "on-warning": "hsla(var(--warning-on-warning))",
        1000: "hsla(var(--warning-1000))",
        990: "hsla(var(--warning-990))",
        950: "hsla(var(--warning-950))",
        925: "hsla(var(--warning-925))",
        900: "hsla(var(--warning-900))",
        800: "hsla(var(--warning-800))",
        700: "hsla(var(--warning-700))",
        600: "hsla(var(--warning-600))",
        500: "hsla(var(--warning-500))",
        400: "hsla(var(--warning-400))",
        300: "hsla(var(--warning-300))",
        200: "hsla(var(--warning-200))",
        100: "hsla(var(--warning-100))",
        50: "hsla(var(--warning-50))",
        25: "hsla(var(--warning-25))",
        10: "hsla(var(--warning-10))",
        0: "hsla(var(--warning-0))",
      },
      error: {
        DEFAULT: "hsla(var(--error-default))",
        soft: "hsla(var(--error-soft))",
        muted: "hsla(var(--error-muted))",
        hover: "hsla(var(--error-hover))",
        active: "hsla(var(--error-active))",
        container: "hsla(var(--error-container-default))",
        "container-soft": "hsla(var(--error-container-soft))",
        "container-muted": "hsla(var(--error-container-muted))",
        "container-hover": "hsla(var(--error-container-hover))",
        "container-active": "hsla(var(--error-container-active))",
        "on-container": "hsla(var(--error-on-container))",
        "on-error": "hsla(var(--error-on-error))",
        1000: "hsla(var(--error-1000))",
        990: "hsla(var(--error-990))",
        950: "hsla(var(--error-950))",
        925: "hsla(var(--error-925))",
        900: "hsla(var(--error-900))",
        800: "hsla(var(--error-800))",
        700: "hsla(var(--error-700))",
        600: "hsla(var(--error-600))",
        500: "hsla(var(--error-500))",
        400: "hsla(var(--error-400))",
        300: "hsla(var(--error-300))",
        200: "hsla(var(--error-200))",
        100: "hsla(var(--error-100))",
        50: "hsla(var(--error-50))",
        25: "hsla(var(--error-25))",
        10: "hsla(var(--error-10))",
        0: "hsla(var(--error-0))",
      },
      info: {
        DEFAULT: "hsla(var(--info-default))",
        soft: "hsla(var(--info-soft))",
        muted: "hsla(var(--info-muted))",
        hover: "hsla(var(--info-hover))",
        active: "hsla(var(--info-active))",
        container: "hsla(var(--info-container-default))",
        "container-soft": "hsla(var(--info-container-soft))",
        "container-muted": "hsla(var(--info-container-muted))",
        "container-hover": "hsla(var(--info-container-hover))",
        "container-active": "hsla(var(--info-container-active))",
        "on-container": "hsla(var(--info-on-container))",
        "on-info": "hsla(var(--info-on-info))",
        1000: "hsla(var(--info-1000))",
        990: "hsla(var(--info-990))",
        950: "hsla(var(--info-950))",
        925: "hsla(var(--info-925))",
        900: "hsla(var(--info-900))",
        800: "hsla(var(--info-800))",
        700: "hsla(var(--info-700))",
        600: "hsla(var(--info-600))",
        500: "hsla(var(--info-500))",
        400: "hsla(var(--info-400))",
        300: "hsla(var(--info-300))",
        200: "hsla(var(--info-200))",
        100: "hsla(var(--info-100))",
        50: "hsla(var(--info-50))",
        25: "hsla(var(--info-25))",
        10: "hsla(var(--info-10))",
        0: "hsla(var(--info-0))",
      },
      "status-01": {
        DEFAULT: "hsla(var(--status-01-default))",
        soft: "hsla(var(--status-01-soft))",
        muted: "hsla(var(--status-01-muted))",
        hover: "hsla(var(--status-01-hover))",
        active: "hsla(var(--status-01-active))",
        container: "hsla(var(--status-01-container-default))",
        "container-soft": "hsla(var(--status-01-container-soft))",
        "container-muted": "hsla(var(--status-01-container-muted))",
        "container-hover": "hsla(var(--status-01-container-hover))",
        "container-active": "hsla(var(--status-01-container-active))",
        "on-container": "hsla(var(--status-01-on-container))",
        "on-status-01": "hsla(var(--status-01-on-status-01))",
        1000: "hsla(var(--status-01-1000))",
        990: "hsla(var(--status-01-990))",
        950: "hsla(var(--status-01-950))",
        925: "hsla(var(--status-01-925))",
        900: "hsla(var(--status-01-900))",
        800: "hsla(var(--status-01-800))",
        700: "hsla(var(--status-01-700))",
        600: "hsla(var(--status-01-600))",
        500: "hsla(var(--status-01-500))",
        400: "hsla(var(--status-01-400))",
        300: "hsla(var(--status-01-300))",
        200: "hsla(var(--status-01-200))",
        100: "hsla(var(--status-01-100))",
        50: "hsla(var(--status-01-50))",
        25: "hsla(var(--status-01-25))",
        10: "hsla(var(--status-01-10))",
        0: "hsla(var(--status-01-0))",
      },
      "status-02": {
        DEFAULT: "hsla(var(--status-02-default))",
        soft: "hsla(var(--status-02-soft))",
        muted: "hsla(var(--status-02-muted))",
        hover: "hsla(var(--status-02-hover))",
        active: "hsla(var(--status-02-active))",
        container: "hsla(var(--status-02-container-default))",
        "container-soft": "hsla(var(--status-02-container-soft))",
        "container-muted": "hsla(var(--status-02-container-muted))",
        "container-hover": "hsla(var(--status-02-container-hover))",
        "container-active": "hsla(var(--status-02-container-active))",
        "on-container": "hsla(var(--status-02-on-container))",
        "on-status-02": "hsla(var(--status-02-on-status-02))",
        1000: "hsla(var(--status-02-1000))",
        990: "hsla(var(--status-02-990))",
        950: "hsla(var(--status-02-950))",
        925: "hsla(var(--status-02-925))",
        900: "hsla(var(--status-02-900))",
        800: "hsla(var(--status-02-800))",
        700: "hsla(var(--status-02-700))",
        600: "hsla(var(--status-02-600))",
        500: "hsla(var(--status-02-500))",
        400: "hsla(var(--status-02-400))",
        300: "hsla(var(--status-02-300))",
        200: "hsla(var(--status-02-200))",
        100: "hsla(var(--status-02-100))",
        50: "hsla(var(--status-02-50))",
        25: "hsla(var(--status-02-25))",
        10: "hsla(var(--status-02-10))",
        0: "hsla(var(--status-02-0))",
      },
      "status-03": {
        DEFAULT: "hsla(var(--status-03-default))",
        soft: "hsla(var(--status-03-soft))",
        muted: "hsla(var(--status-03-muted))",
        hover: "hsla(var(--status-03-hover))",
        active: "hsla(var(--status-03-active))",
        container: "hsla(var(--status-03-container-default))",
        "container-soft": "hsla(var(--status-03-container-soft))",
        "container-muted": "hsla(var(--status-03-container-muted))",
        "container-hover": "hsla(var(--status-03-container-hover))",
        "container-active": "hsla(var(--status-03-container-active))",
        "on-container": "hsla(var(--status-03-on-container))",
        "on-status-03": "hsla(var(--status-03-on-status-03))",
        1000: "hsla(var(--status-03-1000))",
        990: "hsla(var(--status-03-990))",
        950: "hsla(var(--status-03-950))",
        925: "hsla(var(--status-03-925))",
        900: "hsla(var(--status-03-900))",
        800: "hsla(var(--status-03-800))",
        700: "hsla(var(--status-03-700))",
        600: "hsla(var(--status-03-600))",
        500: "hsla(var(--status-03-500))",
        400: "hsla(var(--status-03-400))",
        300: "hsla(var(--status-03-300))",
        200: "hsla(var(--status-03-200))",
        100: "hsla(var(--status-03-100))",
        50: "hsla(var(--status-03-50))",
        25: "hsla(var(--status-03-25))",
        10: "hsla(var(--status-03-10))",
        0: "hsla(var(--status-03-0))",
      },
      "status-04": {
        DEFAULT: "hsla(var(--status-04-default))",
        soft: "hsla(var(--status-04-soft))",
        muted: "hsla(var(--status-04-muted))",
        hover: "hsla(var(--status-04-hover))",
        active: "hsla(var(--status-04-active))",
        container: "hsla(var(--status-04-container-default))",
        "container-soft": "hsla(var(--status-04-container-soft))",
        "container-muted": "hsla(var(--status-04-container-muted))",
        "container-hover": "hsla(var(--status-04-container-hover))",
        "container-active": "hsla(var(--status-04-container-active))",
        "on-container": "hsla(var(--status-04-on-container))",
        "on-status-04": "hsla(var(--status-04-on-status-04))",
        1000: "hsla(var(--status-04-1000))",
        990: "hsla(var(--status-04-990))",
        950: "hsla(var(--status-04-950))",
        925: "hsla(var(--status-04-925))",
        900: "hsla(var(--status-04-900))",
        800: "hsla(var(--status-04-800))",
        700: "hsla(var(--status-04-700))",
        600: "hsla(var(--status-04-600))",
        500: "hsla(var(--status-04-500))",
        400: "hsla(var(--status-04-400))",
        300: "hsla(var(--status-04-300))",
        200: "hsla(var(--status-04-200))",
        100: "hsla(var(--status-04-100))",
        50: "hsla(var(--status-04-50))",
        25: "hsla(var(--status-04-25))",
        10: "hsla(var(--status-04-10))",
        0: "hsla(var(--status-04-0))",
      },
      "status-05": {
        DEFAULT: "hsla(var(--status-05-default))",
        soft: "hsla(var(--status-05-soft))",
        muted: "hsla(var(--status-05-muted))",
        hover: "hsla(var(--status-05-hover))",
        active: "hsla(var(--status-05-active))",
        container: "hsla(var(--status-05-container-default))",
        "container-soft": "hsla(var(--status-05-container-soft))",
        "container-muted": "hsla(var(--status-05-container-muted))",
        "container-hover": "hsla(var(--status-05-container-hover))",
        "container-active": "hsla(var(--status-05-container-active))",
        "on-container": "hsla(var(--status-05-on-container))",
        "on-status-05": "hsla(var(--status-05-on-status-05))",
        1000: "hsla(var(--status-05-1000))",
        990: "hsla(var(--status-05-990))",
        950: "hsla(var(--status-05-950))",
        925: "hsla(var(--status-05-925))",
        900: "hsla(var(--status-05-900))",
        800: "hsla(var(--status-05-800))",
        700: "hsla(var(--status-05-700))",
        600: "hsla(var(--status-05-600))",
        500: "hsla(var(--status-05-500))",
        400: "hsla(var(--status-05-400))",
        300: "hsla(var(--status-05-300))",
        200: "hsla(var(--status-05-200))",
        100: "hsla(var(--status-05-100))",
        50: "hsla(var(--status-05-50))",
        25: "hsla(var(--status-05-25))",
        10: "hsla(var(--status-05-10))",
        0: "hsla(var(--status-05-0))",
      },
      "status-06": {
        DEFAULT: "hsla(var(--status-06-default))",
        soft: "hsla(var(--status-06-soft))",
        muted: "hsla(var(--status-06-muted))",
        hover: "hsla(var(--status-06-hover))",
        active: "hsla(var(--status-06-active))",
        container: "hsla(var(--status-06-container-default))",
        "container-soft": "hsla(var(--status-06-container-soft))",
        "container-muted": "hsla(var(--status-06-container-muted))",
        "container-hover": "hsla(var(--status-06-container-hover))",
        "container-active": "hsla(var(--status-06-container-active))",
        "on-container": "hsla(var(--status-06-on-container))",
        "on-status-06": "hsla(var(--status-06-on-status-06))",
        1000: "hsla(var(--status-06-1000))",
        990: "hsla(var(--status-06-990))",
        950: "hsla(var(--status-06-950))",
        925: "hsla(var(--status-06-925))",
        900: "hsla(var(--status-06-900))",
        800: "hsla(var(--status-06-800))",
        700: "hsla(var(--status-06-700))",
        600: "hsla(var(--status-06-600))",
        500: "hsla(var(--status-06-500))",
        400: "hsla(var(--status-06-400))",
        300: "hsla(var(--status-06-300))",
        200: "hsla(var(--status-06-200))",
        100: "hsla(var(--status-06-100))",
        50: "hsla(var(--status-06-50))",
        25: "hsla(var(--status-06-25))",
        10: "hsla(var(--status-06-10))",
        0: "hsla(var(--status-06-0))",
      },
      static: {
        white: "hsla(var(--static-white))",
        black: "hsla(var(--static-black))",
      },
    },
  },
  plugins: [
    plugin(function({ addComponents }) {
      addComponents({
        ".display-l": {
          "@apply font-display text-display-l font-weight-display": {},
        },

        ".display-l-strong": {
          "@apply font-display text-display-l font-weight-display-strong": {},
        },

        ".display-m": {
          "@apply font-display text-display-m font-weight-display": {},
        },

        ".display-m-strong": {
          "@apply font-display text-display-m font-weight-display-strong": {},
        },

        ".display-s": {
          "@apply font-display text-display-s font-weight-display": {},
        },

        ".display-s-strong": {
          "@apply font-display text-display-s font-weight-display-strong": {},
        },

        ".heading-1": {
          "@apply font-heading text-heading-1 font-weight-heading": {},
        },

        ".heading-2": {
          "@apply font-heading text-heading-2 font-weight-heading": {},
        },

        ".heading-3": {
          "@apply font-heading text-heading-3 font-weight-heading": {},
        },

        ".heading-4": {
          "@apply font-heading text-heading-4 font-weight-heading": {},
        },

        ".heading-5": {
          "@apply font-heading text-heading-5 font-weight-heading": {},
        },

        ".body-l": {
          "@apply font-body text-body-l font-weight-body": {},
        },

        ".body-l-strong": {
          "@apply font-body text-body-l font-weight-body-strong": {},
        },

        ".body-m": {
          "@apply font-body text-body-m font-weight-body": {},
        },

        ".body-m-strong": {
          "@apply font-body text-body-m font-weight-body-strong": {},
        },

        ".body-s": {
          "@apply font-body text-body-s font-weight-body": {},
        },

        ".body-s-strong": {
          "@apply font-body text-body-s font-weight-body-strong": {},
        },

        ".description-l": {
          "@apply font-description text-description-l font-weight-description":
            {},
        },

        ".description-l-strong": {
          "@apply font-description text-description-l font-weight-description-strong":
            {},
        },

        ".description-m": {
          "@apply font-description text-description-m tracking-description-m font-weight-description":
            {},
        },

        ".description-m-strong": {
          "@apply font-description text-description-m tracking-description-m font-weight-description-strong":
            {},
        },

        ".description-s": {
          "@apply font-description text-description-s tracking-description-s font-weight-description":
            {},
        },

        ".description-s-strong": {
          "@apply font-description text-description-s tracking-description-s font-weight-description-strong":
            {},
        },
      });
    }),
  ],
};
