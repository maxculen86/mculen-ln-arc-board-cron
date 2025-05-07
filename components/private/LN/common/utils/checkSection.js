import get from '../../../common/utils/get';

const checkSection = (target, globalContent = {}) => {
    const primarySection = get(globalContent, '_id', '');

    return primarySection === target;
};

export default checkSection;
