import classnames from 'classnames';

export function cn(...classes: (string | boolean | undefined)[]) {
    return classnames(classes.filter(Boolean) as string[])
}

export function truncate(str: string, max: number, len: number) {
    return str.length > max ? str.substring(0, len) + "..." : str;
}

/**
 * RGB Color interface
 */
export interface RGBColor {
    r: number;
    g: number;
    b: number;
  }
  
  /**
   * Converts a single RGB component (0-255) to HEX (00-FF)
   * @param component - RGB component value (0-255)
   * @returns HEX string representation (00-FF)
   */
  export const componentToHex = (component: number): string => {
    // Ensure the component is within valid range
    const clampedComponent = Math.max(0, Math.min(255, Math.round(component)));
    const hex = clampedComponent.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  
  /**
   * Converts RGB values to HEX color string
   * @param r - Red component (0-255)
   * @param g - Green component (0-255)
   * @param b - Blue component (0-255)
   * @returns HEX color string (e.g., "#FF0000")
   */
  export const rgbToHex = (r: number, g: number, b: number): string => {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  };
  
  /**
   * Converts RGB color object to HEX color string
   * @param rgb - RGB color object with r, g, b properties
   * @returns HEX color string (e.g., "#FF0000")
   */
  export const rgbObjectToHex = (rgb: RGBColor): string => {
    return rgbToHex(rgb.r, rgb.g, rgb.b);
  };
  
  /**
   * Converts HEX color string to RGB color object
   * @param hex - HEX color string (e.g., "#FF0000" or "FF0000")
   * @returns RGB color object with r, g, b properties
   */
  export const hexToRgb = (hex: string): RGBColor | null => {
    // Remove # if present
    const cleanHex = hex.replace('#', '');
    
    // Validate hex string
    if (!/^[0-9A-Fa-f]{6}$/.test(cleanHex)) {
      return null;
    }
    
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    
    return { r, g, b };
  };
  
  /**
   * Converts RGB values from CSS rgb() format to HEX
   * @param rgbString - CSS rgb string (e.g., "rgb(255, 0, 0)")
   * @returns HEX color string or null if invalid format
   */
  export const cssRgbToHex = (rgbString: string): string | null => {
    const match = rgbString.match(/rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/);
    if (!match) {
      return null;
    }
    
    const r = parseInt(match[1], 10);
    const g = parseInt(match[2], 10);
    const b = parseInt(match[3], 10);
    
    return rgbToHex(r, g, b);
  };
  
  /**
   * Utility function to validate RGB values
   * @param r - Red component
   * @param g - Green component
   * @param b - Blue component
   * @returns boolean indicating if all values are valid (0-255)
   */
  export const isValidRgb = (r: number, g: number, b: number): boolean => {
    return [r, g, b].every(component => 
      typeof component === 'number' && 
      component >= 0 && 
      component <= 255 && 
      !isNaN(component)
    );
  };
  
  /**
   * Converts an array of RGB strings to hex color array
   * @param rgbStringArray - Array of RGB strings in format "r,g,b" (e.g., ["255,0,0", "0,255,0"])
   * @returns Array of HEX color strings (e.g., ["#FF0000", "#00FF00"])
   */
  export const rgbStringArrayToHexArray = (rgbStringArray: string[]): string[] => {
    return rgbStringArray.map(rgbString => {
      const [r, g, b] = rgbString.split(',').map(num => parseInt(num.trim(), 10));
      
      if (!isValidRgb(r, g, b)) {
        console.warn(`Invalid RGB values: ${rgbString}`);
        return "#000000"; // Return black for invalid values
      }
      
      return rgbToHex(r, g, b);
    });
  };

  /**
   * Creates a CSS linear gradient string from an array of hex colors
   * @param hexColors - Array of hex color strings
   * @param direction - Gradient direction (default: "45deg")
   * @returns CSS linear gradient string
   */
  export const createGradientFromColors = (hexColors: string[], direction: string = "45deg"): string => {
    if (hexColors.length === 0) {
      return "linear-gradient(45deg, #000000, #000000)";
    }
    
    if (hexColors.length === 1) {
      return `linear-gradient(${direction}, ${hexColors[0]}, ${hexColors[0]})`;
    }
    
    const colorStops = hexColors.map((color, index) => {
      const percentage = (index / (hexColors.length - 1)) * 100;
      return `${color} ${percentage}%`;
    }).join(", ");
    
    return `linear-gradient(${direction}, ${colorStops})`;
  };

  /**
   * Creates a radial gradient string from an array of hex colors for blur effects
   * @param hexColors - Array of hex color strings
   * @param opacity - Opacity for the colors (0-1)
   * @returns CSS radial gradient string with opacity
   */
  export const createBlurGradientFromColors = (hexColors: string[], opacity: number = 0.6): string => {
    if (hexColors.length === 0) {
      return "radial-gradient(circle, rgba(0,0,0,0.1), rgba(0,0,0,0))";
    }
    
    // Convert hex colors to rgba with opacity
    const rgbaColors = hexColors.map(hex => {
      const rgb = hexToRgb(hex);
      if (!rgb) return "rgba(0,0,0,0.1)";
      return `rgba(${rgb.r},${rgb.g},${rgb.b},${opacity})`;
    });
    
    if (rgbaColors.length === 1) {
      return `radial-gradient(circle, ${rgbaColors[0]}, rgba(0,0,0,0))`;
    }
    
    const colorStops = rgbaColors.map((color, index) => {
      const percentage = (index / (rgbaColors.length - 1)) * 100;
      return `${color} ${percentage}%`;
    }).join(", ");
    
    return `radial-gradient(circle, ${colorStops}, rgba(0,0,0,0))`;
  };
  