import get from '../../../common/utils/get';

const checkSection = (globalContent = {}, target) => {
    const primarySection = get(globalContent, '_id', '');

    return primarySection === target;
};

export default checkSection;
