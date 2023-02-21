export const validateChildrens = childrens => {
    if (!childrens || !Array.isArray(childrens)) {
        return null;
    }
    if (childrens.filter(c => c === null).length === childrens.length) {
        return null;
    }
    return childrens;
};

export default validateChildrens;
