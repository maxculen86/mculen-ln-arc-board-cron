import get from '../../../../common/utils/get';

const getChildrenBySection = ({
    renderables = [],
    section: { title, validation } = {}
}) => {
    const { position } = validation[title];
    return get(renderables, `[${position + 1}].children`, []);
};

export default getChildrenBySection;
