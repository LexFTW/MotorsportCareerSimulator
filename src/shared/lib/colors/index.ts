export const hexToRgba = (hex: string, alpha: number = 1): string => {
  const cleanHex = hex.replace('#', '');
  const fullHex = cleanHex.length === 3
    ? cleanHex.split('').map(c => c + c).join('')
    : cleanHex;

  const r = parseInt(fullHex.substring(0, 2), 16);
  const g = parseInt(fullHex.substring(2, 4), 16);
  const b = parseInt(fullHex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  const clean = hex.replace('#', '');
  const full = clean.length === 3
    ? clean.split('').map(c => c + c).join('')
    : clean;
  return {
    r: parseInt(full.substring(0, 2), 16),
    g: parseInt(full.substring(2, 4), 16),
    b: parseInt(full.substring(4, 6), 16),
  };
};

const rgbToHex = (r: number, g: number, b: number): string => {
  const toHex = (n: number) => Math.round(n).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

const lightenColor = (hex: string, amount: number = 0.3): string => {
  const { r, g, b } = hexToRgb(hex);
  const newR = r + (255 - r) * amount;
  const newG = g + (255 - g) * amount;
  const newB = b + (255 - b) * amount;
  return rgbToHex(newR, newG, newB);
};

const isLightColor = (hex: string): boolean => {
  const { r, g, b } = hexToRgb(hex);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5;
};

// Devuelve el color base según el rating
const getRatingColor = (rating: number): string => {
  if (rating >= 90) return '#4CAF50';   // Cian
  if (rating >= 80) return '#FFD700';   // Dorado
  if (rating >= 70) return '#C0C0C0';   // Plata
  if (rating >= 60) return '#CD7F32';   // Bronce
  return '#F44336';                     // Rojo
};

export const getRatingStyles = (
  rating: number,
  angle: number = 135,
  lightenAmount: number = 0.3
): { background: string; color: string } => {
  const baseColor = getRatingColor(rating);
  const lightColor = lightenColor(baseColor, lightenAmount);
  const textColor = isLightColor(baseColor) ? '#000000' : '#FFFFFF';

  return {
    background: `linear-gradient(${angle}deg, ${baseColor}, ${lightColor})`,
    color: textColor,
  };
};