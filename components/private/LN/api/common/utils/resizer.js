export const getFocalPoint = query => {
    if (!query) return '';
    if (typeof query !== 'string') return '';

    const params = new URLSearchParams(query);
    return params.get('focal') || '';
};
