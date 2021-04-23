export default function({ nodeType, type }) {
    if (type === 'story') return 'nota';
    if (['section', 'tags', 'author', 'distributor'].includes(nodeType || type))
        return 'acumulado';
    return '';
}
