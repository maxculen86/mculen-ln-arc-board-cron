import get from '../../../../../common/utils/get';
import setTypeElement from './setTypeElement';
import setSectionAliasbyFeatureOrChain from './setSectionAliasbyFeatureOrChain';

const responseElementBox = (box, sectionWeb, sectionMobile, configurations) => {
    // For validate response from boxes into other box
    const restRespElementBox = (
        boxElement,
        sectionWebParam,
        sectionMobileParam,
        configurationsParam
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
                            configurationsParam
                        );
                    }
                    return articleBox;
                })
            };
        }
        return boxElement;
    };
    return {
        type: setTypeElement(box.information),
        sectionAliasMobile: setSectionAliasbyFeatureOrChain(
            box.information,
            sectionMobile
        ),
        ...restRespElementBox(box, sectionWeb, sectionMobile, configurations),
        configurations,
        sectionMobile,
        sectionWeb
    };
};

export default responseElementBox;
