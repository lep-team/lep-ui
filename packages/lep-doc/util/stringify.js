function stringify(nodes) {
    if (Array.isArray(nodes)) {
        return `[${nodes.map(item => `${stringify(item)}`).join(',')}]`;
    }
    if (typeof nodes === 'object' && nodes !== null) {
        const objStr = Object.keys(nodes).map((key) => {
        const value = nodes[key];
        return `"${key}": ${stringify(value)}`;
        }).join(',')
        return `{${objStr}}`;
    }
    if (typeof nodes === 'function') {
        return nodes.toString()
    }
    return JSON.stringify(nodes);
};

module.exports = stringify