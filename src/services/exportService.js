export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return { success: true, message: `Copied: ${text}` };
  } catch (error) {
    return { success: false, message: 'Failed to copy to clipboard' };
  }
};

export const downloadAsPNG = (svgElement, darkMode = false) => {
  if (!svgElement) {
    alert('No tree to download');
    return;
  }
  
  try {
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    canvas.width = svgElement.clientWidth;
    canvas.height = svgElement.clientHeight;
    
    img.onload = () => {
      ctx.fillStyle = darkMode ? '#1F2937' : '#F9FAFB';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      const link = document.createElement('a');
      link.download = 'json-tree.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  } catch (error) {
    alert('Failed to download image');
  }
};