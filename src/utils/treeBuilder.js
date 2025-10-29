export const getNodeType = (value) => {
  if (value === null) return 'primitive';
  if (Array.isArray(value)) return 'array';
  if (typeof value === 'object') return 'object';
  return 'primitive';
};

export const buildTreeData = (obj, key = 'root', path = '$') => {
  const type = getNodeType(obj);
  const isPrimitive = type === 'primitive';

  const node = {
    name: key,
    value: isPrimitive ? obj : undefined,
    type: type,
    path: path,
    children: []
  };

  if (type === 'object' && obj !== null) {
    node.children = Object.entries(obj).map(([k, v]) => 
      buildTreeData(v, k, `${path}.${k}`)
    );
  } else if (type === 'array') {
    node.children = obj.map((item, index) => 
      buildTreeData(item, `[${index}]`, `${path}[${index}]`)
    );
  }

  if (node.children.length === 0) {
    delete node.children;
  }

  return node;
};

export const findNodeByPath = (node, targetPath) => {
  if (node.path === targetPath) return true;
  if (node.children) {
    return node.children.some(child => findNodeByPath(child, targetPath));
  }
  return false;
};