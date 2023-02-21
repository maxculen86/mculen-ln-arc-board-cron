import get from '../../../common/utils/get';
import sectionsValidation from '../../../../layouts/config/LN-Home.config';

export const getChildsFromSections = (sectionPosition, renderable = []) => {
    return get(renderable, `[${sectionPosition}].children`, []);
};

export const isBombaVisible = (renderable = []) => {
    const features = getChildsFromSections(
        get(sectionsValidation, 'Bomba.position', 2) + 1,
        renderable
    );

    const bombaFiltered = features.filter(
        element =>
            get(element, 'props.customFields.hideFeature', false) !== true &&
            get(element, 'type', null) === 'LN-common/bomba'
    );

    return bombaFiltered.length === 1 || false;
};
