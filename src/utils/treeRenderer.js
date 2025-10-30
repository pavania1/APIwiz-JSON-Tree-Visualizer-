import * as d3 from 'd3';
import { NODE_COLORS, NODE_BORDER_COLORS } from './constants';

export const getNodeColor = (type, isHighlighted) => {
  if (isHighlighted) return NODE_COLORS.highlight;
  return NODE_COLORS[type] || NODE_COLORS.primitive;
};

export const getNodeBorderColor = (type, isHighlighted) => {
  if (isHighlighted) return NODE_BORDER_COLORS.highlight;
  return NODE_BORDER_COLORS[type] || NODE_BORDER_COLORS.primitive;
};

export const createD3Tree = (svg, data, options = {}) => {
  const {
    width,
    height,
    darkMode = false,
    highlightPath = null,
    onNodeClick
  } = options;

  // Clear previous content
  d3.select(svg).selectAll('*').remove();

  const svgSelection = d3.select(svg)
    .attr('width', width)
    .attr('height', height);

  const g = svgSelection.append('g');

  // Setup zoom behavior
  const zoom = d3.zoom()
    .scaleExtent([0.1, 3])
    .on('zoom', (event) => {
      g.attr('transform', event.transform);
    });

  svgSelection.call(zoom);

  // Adjust tree layout based on screen size
  const isMobile = width < 768;
  
  // Calculate tree dimensions based on data size
  const countNodes = (node) => {
    if (!node.children) return 1;
    return 1 + node.children.reduce((sum, child) => sum + countNodes(child), 0);
  };
  
  const totalNodes = countNodes(data);
  const minHeight = totalNodes * (isMobile ? 70 : 90); 
  const treeHeight = Math.max(height - 100, minHeight);
  
  const treeLayout = d3.tree()
    .size([treeHeight, width - (isMobile ? 180 : 300)])
    .separation((a, b) => {
      // Increase separation between nodes
      if (a.parent === b.parent) {
        return isMobile ? 1.5 : 1.2;
      }
      return isMobile ? 2 : 1.5;
    });

  const root = d3.hierarchy(data);
  treeLayout(root);

  // Create a group for links (drawn first, so they appear behind nodes)
  const linkGroup = g.append('g').attr('class', 'links');
  
  // Create a group for nodes (drawn second, so they appear in front)
  const nodeGroup = g.append('g').attr('class', 'nodes');

  // Draw links with better visibility
  linkGroup.selectAll('.link')
    .data(root.links())
    .enter().append('path')
    .attr('class', 'link')
    .attr('d', d3.linkHorizontal()
      .x(d => d.y)
      .y(d => d.x))
    .attr('fill', 'none')
    .attr('stroke', darkMode ? '#D1D5DB' : '#4B5563')
    .attr('stroke-width', isMobile ? 3 : 2.5)
    .attr('opacity', 0.8)
    .style('pointer-events', 'none');

  // Draw nodes
  const node = nodeGroup.selectAll('.node')
    .data(root.descendants())
    .enter().append('g')
    .attr('class', 'node')
    .attr('transform', d => `translate(${d.y},${d.x})`)
    .style('cursor', 'pointer')
    .on('click', (event, d) => {
      if (onNodeClick) onNodeClick(d.data);
    });

  // Adjust node size based on screen
  const rectWidth = isMobile ? 110 : 120;
  const rectHeight = isMobile ? 45 : 50;
  const rectX = isMobile ? -55 : -60;
  const rectY = isMobile ? -22.5 : -25;

  // Node rectangles
  node.append('rect')
    .attr('x', rectX)
    .attr('y', rectY)
    .attr('width', rectWidth)
    .attr('height', rectHeight)
    .attr('rx', 8)
    .attr('fill', d => getNodeColor(d.data.type, d.data.path === highlightPath))
    .attr('stroke', d => getNodeBorderColor(d.data.type, d.data.path === highlightPath))
    .attr('stroke-width', isMobile ? 2.5 : 2)
    .style('filter', 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))');

  // Node labels
  node.append('text')
    .attr('dy', -5)
    .attr('text-anchor', 'middle')
    .attr('fill', 'white')
    .attr('font-weight', 'bold')
    .attr('font-size', isMobile ? '10px' : '12px')
    .text(d => {
      const maxLen = isMobile ? 12 : 15;
      return d.data.name.length > maxLen ? d.data.name.substring(0, maxLen) + '...' : d.data.name;
    });

  // Node values
  node.filter(d => d.data.value !== undefined)
    .append('text')
    .attr('dy', 12)
    .attr('text-anchor', 'middle')
    .attr('fill', 'white')
    .attr('font-size', isMobile ? '8px' : '10px')
    .attr('opacity', 0.9)
    .text(d => {
      const val = String(d.data.value);
      const maxLen = isMobile ? 14 : 18;
      return val.length > maxLen ? val.substring(0, maxLen) + '...' : val;
    });

  // Tooltips
  node.append('title')
    .text(d => `Path: ${d.data.path}\nType: ${d.data.type}${d.data.value !== undefined ? `\nValue: ${d.data.value}` : ''}`);

  // Initial transform with better positioning for mobile
  const initialScale = isMobile ? 0.5 : 0.7; 
  const initialX = isMobile ? 60 : 120;
  const initialTransform = d3.zoomIdentity.translate(initialX, height / 2).scale(initialScale);
  svgSelection.call(zoom.transform, initialTransform);

  // Highlight and center if path is provided
  if (highlightPath) {
    const highlightedNode = root.descendants().find(d => d.data.path === highlightPath);
    if (highlightedNode) {
      const scale = 1;
      const x = -highlightedNode.y * scale + width / 2;
      const y = -highlightedNode.x * scale + height / 2;
      svgSelection.transition()
        .duration(750)
        .call(zoom.transform, d3.zoomIdentity.translate(x, y).scale(scale));
    }
  }

  return { zoom, svg: svgSelection };
};