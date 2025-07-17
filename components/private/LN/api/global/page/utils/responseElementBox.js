import get from '../../../../../common/utils/get';
import setTypeElement from './setTypeElement';
import setSectionAliasbyFeatureOrChain from './setSectionAliasbyFeatureOrChain';

const responseElementBox = (box, sectionWeb, configurations, layoutPage) => {
    // For validate response from boxes into other box
    const restRespElementBox = (
        boxElement,
        sectionWebParam,
        configurationsParam,
        layoutPageParam
    ) => {
        // If there is a box inside this box
        if (
            boxElement &&
            boxElement.articles &&
            !get(boxElement.articles, 'information', null)
        ) {
            return {
                ...boxElement,
                articles: boxElement.articles.map(articleBox => {
                    if (
                        get(articleBox, 'information', null) != null &&
                        !get(articleBox, 'information.hideCaja', null)
                    ) {
                        return responseElementBox(
                            articleBox,
                            sectionWebParam,
                            configurationsParam,
                            layoutPageParam
                        );
                    }
                    return articleBox;
                })
            };
        }
        return boxElement;
    };

    const sectionAliasMobile = setSectionAliasbyFeatureOrChain(
        box.information,
        sectionWeb
    );

    const typeElement = setTypeElement(sectionAliasMobile, layoutPage);

    return {
        type: typeElement,
        sectionAliasMobile,
        ...restRespElementBox(box, sectionWeb, configurations, layoutPage),
        configurations,
        sectionWeb
    };
};

export default responseElementBox;
