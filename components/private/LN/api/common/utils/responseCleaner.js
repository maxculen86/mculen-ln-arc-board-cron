/* eslint-disable no-return-assign */
/* eslint-disable import/prefer-default-export */
const removeEmptyItems = obj => {
    if (Array.isArray(obj)) {
        return obj
            .map(v => (v && typeof v === 'object' ? removeEmptyItems(v) : v))
            .filter(
                v =>
                    !(v === null) &&
                    !(v === undefined) &&
                    !(v === '') &&
                    !(v.length === 0)
            );
    }
    return Object.entries(obj)
        .map(([k, v]) => [
            k,
            v && typeof v === 'object' ? removeEmptyItems(v) : v
        ])
        .reduce((a, [k, v]) => {
            if (v === null || v === undefined || v === '' || v.length === 0) {
                return a;
            }
            if (typeof v === 'object' && Object.keys(v).length === 0) {
                return a;
            }
            // eslint-disable-next-line no-param-reassign
            return (a[k] = v), a;
        }, {});

    if (Object.keys(obj).length === 0) {
        return null;
    }
};

export { removeEmptyItems };
