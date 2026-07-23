const LEVEL_TAG = { 1: 'h2', 2: 'h3', 6: 'h3' };

export const getHeadingTag = level => LEVEL_TAG[level] || 'h4';
