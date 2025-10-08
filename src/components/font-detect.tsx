// Hook to get fonts in the format: [{ value: "font-name", label: "Font Name" }]

import { useState, useEffect } from 'react';

export function useFonts() {
  const [fonts, setFonts] = useState<Array<{ value: string; label: string }>>([]);
  const [loading, setLoading] = useState(true);

  const commonFonts = [
    'Arial', 'Helvetica', 'Times New Roman', 'Times', 'Courier New', 'Courier',
    'Verdana', 'Georgia', 'Palatino', 'Garamond', 'Bookman', 'Comic Sans MS',
    'Trebuchet MS', 'Arial Black', 'Impact', 'Lucida Sans Unicode', 'Tahoma',
    'Lucida Console', 'Monaco', 'Bradley Hand', 'Brush Script MT', 'Luminari',
    'Segoe UI', 'Roboto', 'Ubuntu', 'Cantarell', 'Oxygen', 'Open Sans',
    'Lato', 'Montserrat', 'Poppins', 'Raleway', 'Inter', 'Source Sans Pro'
  ];

  const detectFonts = () => {
    const baseFonts = ['monospace', 'sans-serif', 'serif'];
    const testString = 'mmmmmmmmmmlli';
    const testSize = '72px';
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    const baselineWidths = {};
    baseFonts.forEach(baseFont => {
      ctx.font = `${testSize} ${baseFont}`;
      baselineWidths[baseFont] = ctx.measureText(testString).width;
    });

    const detectedFonts = [];
    
    for (const font of commonFonts) {
      let detected = false;
      
      for (const baseFont of baseFonts) {
        ctx.font = `${testSize} '${font}', ${baseFont}`;
        const width = ctx.measureText(testString).width;
        
        if (width !== baselineWidths[baseFont]) {
          detected = true;
          break;
        }
      }
      
      if (detected) {
        detectedFonts.push(font);
      }
    }
    
    return detectedFonts;
  };

  const fetchFonts = async () => {
    try {
      setLoading(true);
      let fontList = [];
      
      // Try Local Font Access API first
      if ('queryLocalFonts' in window) {
        try {
          const status = await navigator.permissions.query({ name: 'local-fonts' });
          
          if (status.state !== 'denied') {
            const availableFonts = await window.queryLocalFonts();
            fontList = [...new Set(availableFonts.map(f => f.family))].sort();
          } else {
            fontList = detectFonts();
          }
        } catch {
          fontList = detectFonts();
        }
      } else {
        fontList = detectFonts();
      }
      
      // Convert to the format: [{ value: "font-name", label: "Font Name" }]
      const formattedFonts = fontList.map(font => ({
        value: font.toLowerCase().replace(/\s+/g, '-'),
        label: font
      }));
      
      setFonts(formattedFonts);
      setLoading(false);
      
    } catch (err) {
      console.error('Error fetching fonts:', err);
      const detectedFonts = detectFonts();
      const formattedFonts = detectedFonts.map(font => ({
        value: font.toLowerCase().replace(/\s+/g, '-'),
        label: font
      }));
      setFonts(formattedFonts);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFonts();
  }, []);

  return { fonts, loading };
}