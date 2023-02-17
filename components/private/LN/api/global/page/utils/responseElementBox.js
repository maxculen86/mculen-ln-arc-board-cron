import get from '../../../../../common/utils/get';
import setTypeElement from './setTypeElement';
import setSectionAliasbyFeatureOrChain from './setSectionAliasbyFeatureOrChain';

const responseElementBox = (
    box,
    sectionWeb,
    sectionMobile,
    configurations,
    layoutPage
) => {
    // For validate response from boxes into other box
    const restRespElementBox = (
        boxElement,
        sectionWebParam,
        sectionMobileParam,
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
                            sectionMobileParam,
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
    return {
        type: setTypeElement(box.information, layoutPage),
        sectionAliasMobile: setSectionAliasbyFeatureOrChain(
            box.information,
            sectionMobile,
            layoutPage
        ),
        ...restRespElementBox(
            box,
            sectionWeb,
            sectionMobile,
            configurations,
            layoutPage
        ),
        configurations,
        sectionMobile,
        sectionWeb
    };
};

export default responseElementBox;
