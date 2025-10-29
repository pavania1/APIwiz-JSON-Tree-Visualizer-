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

  // Create tree layout
  const treeLayout = d3.tree().size([height - 100, width - 300]);
  const root = d3.hierarchy(data);
  treeLayout(root);

  // Draw links
  g.selectAll('.link')
    .data(root.links())
    .enter().append('path')
    .attr('class', 'link')
    .attr('d', d3.linkHorizontal()
      .x(d => d.y)
      .y(d => d.x))
    .attr('fill', 'none')
    .attr('stroke', darkMode ? '#6B7280' : '#9CA3AF')
    .attr('stroke-width', 2);

  // Draw nodes
  const node = g.selectAll('.node')
    .data(root.descendants())
    .enter().append('g')
    .attr('class', 'node')
    .attr('transform', d => `translate(${d.y},${d.x})`)
    .style('cursor', 'pointer')
    .on('click', (event, d) => {
      if (onNodeClick) onNodeClick(d.data);
    });

  // Node rectangles
  node.append('rect')
    .attr('x', -60)
    .attr('y', -25)
    .attr('width', 120)
    .attr('height', 50)
    .attr('rx', 8)
    .attr('fill', d => getNodeColor(d.data.type, d.data.path === highlightPath))
    .attr('stroke', d => getNodeBorderColor(d.data.type, d.data.path === highlightPath))
    .attr('stroke-width', 2)
    .style('filter', 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))');

  // Node labels
  node.append('text')
    .attr('dy', -5)
    .attr('text-anchor', 'middle')
    .attr('fill', 'white')
    .attr('font-weight', 'bold')
    .attr('font-size', '12px')
    .text(d => d.data.name.length > 15 ? d.data.name.substring(0, 15) + '...' : d.data.name);

  // Node values
  node.filter(d => d.data.value !== undefined)
    .append('text')
    .attr('dy', 12)
    .attr('text-anchor', 'middle')
    .attr('fill', 'white')
    .attr('font-size', '10px')
    .attr('opacity', 0.9)
    .text(d => {
      const val = String(d.data.value);
      return val.length > 18 ? val.substring(0, 18) + '...' : val;
    });

  // Tooltips
  node.append('title')
    .text(d => `Path: ${d.data.path}\nType: ${d.data.type}${d.data.value !== undefined ? `\nValue: ${d.data.value}` : ''}`);

  // Initial transform
  const initialTransform = d3.zoomIdentity.translate(150, height / 2).scale(0.8);
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