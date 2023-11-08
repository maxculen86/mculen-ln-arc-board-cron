import get from '../../../common/utils/get';

const checkSection = (globalContent = {}, target) => {
    const primarySection = get(
        globalContent,
        'taxonomy.primary_section._id',
        ''
    );

    return primarySection === target;
};

export default checkSection;
