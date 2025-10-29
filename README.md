# JSON Tree Visualizer

An interactive web application to visualize JSON data as hierarchical tree structures with search and highlighting functionality.

## Features

- ✅ JSON input with validation
- ✅ D3.js-based tree visualization
- ✅ Color-coded nodes (Objects, Arrays, Primitives)
- ✅ Search by JSON path with highlighting
- ✅ Zoom controls (In/Out/Fit View)
- ✅ Pan by dragging
- ✅ Dark/Light mode
- ✅ Click nodes to copy paths
- ✅ Download tree as PNG image
- ✅ Responsive design

## Installation
```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## Usage

1. **Input JSON**: Paste your JSON data in the left panel
2. **Visualize**: Click "Visualize Tree" button
3. **Search**: Enter JSON path (e.g., `$.user.name`) and click search
4. **Navigate**: Use zoom controls, drag to pan
5. **Copy Path**: Click any node to copy its path
6. **Download**: Click download button to save as image

## Search Path Examples

- `$.user.name` - Access object property
- `$.items[0].product` - Access array element
- `$.user.address.city` - Access nested property

## Technology Stack

- React 18
- D3.js v7
- Tailwind CSS
- Lucide React (icons)

## Project Structure
```
src/
├── components/          # React components
│   ├── JSONInput/      # JSON input component
│   ├── SearchPanel/    # Search functionality
│   ├── TreeVisualization/ # Tree rendering
│   ├── Legend/         # Color legend
│   └── UI/             # Reusable UI components
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── services/           # External services
└── styles/             # Global styles
```

## Author

Pavani Adina