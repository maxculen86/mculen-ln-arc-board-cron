import get from '../../../common/utils/get';
import sectionsValidation from '../../../../layouts/config/LN10-Home.config.json';

export const getChildrenFromSectionHome = (
    renderables,
    sectionName,
    sectionPosition
) => {
    const INDEX_SECTION =
        get(sectionsValidation, `${sectionName}.position`, sectionPosition) + 1;

    return (
        get(renderables, `[${INDEX_SECTION}].children`, []).filter(
            children =>
                !(
                    children.props.customFields.hideCaja ||
                    (children.props.customFields.hideByUrl &&
                        children.props.customFields.hideByHtml)
                )
        ) || []
    );
};

export default getChildrenFromSectionHome;
