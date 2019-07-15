const path = require('path');

const root = path.resolve(__dirname, '..');

module.exports = {
    root,
    config: path.resolve(root, 'config'),
    dist: path.resolve(root, 'resources', 'dist'),
    resources: path.resolve(root, 'resources')
};
