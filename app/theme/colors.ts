export interface IColorHues {
  50: string
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
}

const colors = {
  contrastThreshold: 7,
  // Singleton colors
  white: "#FFFFFF",
  black: "#000000",
  lightText: "#FFFFFF",
  darkText: "#000000",
  // Primary colors
  pink: {
    50: "#fdf2f8",
    100: "#F9E9EC", // --- Palette color ---
    200: "#fbcfe8",
    300: "#f9a8d4",
    400: "#EA638C", // --- Palette color ---
    500: "#E95D87",
    600: "#E74B7A",
    700: "#be185d",
    800: "#9d174d",
    900: "#831843",
  },
  blue: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#5CC8FF", // --- Palette color ---
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1D2F6F", // --- Palette color ---
    900: "#1e40af",
  },
  green: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#B0F2B4", // --- Palette color ---
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d",
  },
  red: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#ef4444",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
  },
  gray: {
    50: "#fafafa",
    100: "#f4f4f5",
    200: "#e4e4e7",
    300: "#d4d4d8",
    400: "#a1a1aa",
    500: "#71717a",
    600: "#52525b",
    700: "#3f3f46",
    800: "#27272a",
    900: "#18181b",
  },
  dark: {
    50: "#18181b",
    100: "#27272a",
    200: "#3f3f46",
    300: "#52525b",
    400: "#71717a",
    500: "#a1a1aa",
    600: "#d4d4d8",
    700: "#e4e4e7",
    800: "#f4f4f5",
    900: "#fafafa",
  },
  // Derived colors
  danger: {},
  error: {},
  success: {},
  warning: {},
  muted: {},
  primary: {},
  info: {},
  secondary: {},
  light: {},
  tertiary: {},
}

colors.danger = colors.red
colors.error = colors.red
colors.success = colors.green
colors.warning = colors.red
colors.muted = colors.gray
colors.primary = colors.pink
colors.secondary = colors.blue
colors.tertiary = colors.green
colors.info = colors.blue
colors.light = colors.pink

export default colors
export type IColors = typeof colors
