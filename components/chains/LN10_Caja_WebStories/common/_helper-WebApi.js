import pageBuilderValidator from '../../../private/common/utils/pageBuilderValidator';

export const validateChain = (filteredChildren, children) => {
    const rules = [
        {
            validation: filteredChildren.length < 4,
            message: 'Se necesitan al menos 4 webstorys'
        },
        {
            validation: !(children > filteredChildren),
            message:
                'Se requiere ingresar el link / ID de imagen de la webstory'
        }
    ];
    return pageBuilderValidator(rules);
};

export const filterWebStoriesChildren = (filteredWebStories, children) => {
    return (
        children.filter(child =>
            filteredWebStories.find(c => child.key === c.props.id)
        ) || []
    );
};

export const filterWebStories = renderables => {
    const filteredChain = renderables
        .filter(ren => ren.collection === 'sections')
        .find(section =>
            section.children.find(
                child => child.type === 'LN10_Caja_WebStories'
            )
        )
        .children.filter(child => child.type === 'LN10_Caja_WebStories');

    const [webStoryChain = {}] = filteredChain;

    return webStoryChain.children.filter(
        c => c.props.customFields.link && c.props.customFields.imageId
    );
};

export const filterWebStoriesRenderables = renderables => {
    const filteredWebStories = filterWebStories(renderables);

    const filteredRenderables = renderables;

    const unfilteredWebstories = renderables.find(
        ren => ren.type === 'LN10_Caja_WebStories'
    );

    const replacedWebstories = unfilteredWebstories.children.splice(
        0,
        unfilteredWebstories.children.length,
        ...filteredWebStories
    );

    filteredRenderables[unfilteredWebstories] = replacedWebstories;

    return filteredRenderables;
};
