export const darkColors = {
  // Backgrounds
  background: '#0D0D10',
  surface: '#17171C',
  surface2: '#1E1E26',
  surfaceHighlight: '#252530',

  // Borders
  border: '#2C2C3A',
  borderLight: '#22222E',

  // Primary (ember / copper)
  primary: '#E8640A',
  primaryLight: '#FF7B24',
  primaryDark: '#C45209',
  primarySubtle: 'rgba(232,100,10,0.15)',

  // Text
  text: '#F0F0F5',
  textSub: '#9898A8',
  textMuted: '#5C5C70',

  // Semantic
  success: '#34D399',
  successSubtle: 'rgba(52,211,153,0.15)',
  error: '#F87171',
  errorSubtle: 'rgba(248,113,113,0.15)',
  warning: '#FBBF24',
  warningSubtle: 'rgba(251,191,36,0.15)',

  // Tab bar
  tabBar: '#141418',
  tabBarBorder: '#22222E',
  tabActive: '#E8640A',
  tabInactive: '#5C5C70',

  // Misc
  overlay: 'rgba(0,0,0,0.65)',
  white: '#FFFFFF',
  black: '#000000',
} as const;

export const lightColors = {
  // Backgrounds
  background: '#F0F0F5',
  surface: '#FFFFFF',
  surface2: '#F8F8FC',
  surfaceHighlight: '#EDEDF5',

  // Borders
  border: '#E0E0EC',
  borderLight: '#EBEBF2',

  // Primary (same ember in both modes)
  primary: '#E8640A',
  primaryLight: '#FF7B24',
  primaryDark: '#C45209',
  primarySubtle: 'rgba(232,100,10,0.10)',

  // Text
  text: '#0D0D10',
  textSub: '#5C5C70',
  textMuted: '#9898A8',

  // Semantic
  success: '#059669',
  successSubtle: 'rgba(5,150,105,0.10)',
  error: '#DC2626',
  errorSubtle: 'rgba(220,38,38,0.10)',
  warning: '#D97706',
  warningSubtle: 'rgba(217,119,6,0.10)',

  // Tab bar
  tabBar: '#FFFFFF',
  tabBarBorder: '#E0E0EC',
  tabActive: '#E8640A',
  tabInactive: '#9898A8',

  // Misc
  overlay: 'rgba(0,0,0,0.35)',
  white: '#FFFFFF',
  black: '#000000',
} as const;

// Generic string-valued record so both dark and light can satisfy the type
export type Colors = { [K in keyof typeof darkColors]: string };
