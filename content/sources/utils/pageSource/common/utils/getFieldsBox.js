import get from '../../../../../../components/private/common/utils/get';

const getFieldInBox = (pageSections, valueToFind, keyToFind, keyToGet) => {
    if (pageSections) {
        const sectionAcu = pageSections
            .map((v, i) => ({ v, i }))
            .find(t => get(t.v, keyToFind, null) === valueToFind);
        if (sectionAcu && sectionAcu.v) {
            return get(sectionAcu.v, keyToGet, null);
        }
    }
    return null;
};

export default getFieldInBox;
