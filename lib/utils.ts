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
  