export const transform = (data = {}) => {
    const { byline = '', _id = '' } = data;

    return {
        ...data,
        name: byline,
        canonical_url: encodeURI(`/autor/${_id || ''}/`)
    };
};

export default transform;
