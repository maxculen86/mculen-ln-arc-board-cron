/* eslint-disable import/prefer-default-export */
import get from '../../../../common/utils/get';

const checkChildInSection = (childId, sectionChildren) => {
    return sectionChildren.some(
        child => get(child, 'props.id', undefined) === childId
    );
};

export default checkChildInSection;
