import get from '../../private/common/utils/get';

const checkChildInSection = (childId, sectionChildren) => {
    return sectionChildren.some(
        child => get(child, 'props.id', undefined) === childId
    );
};

export default checkChildInSection;
