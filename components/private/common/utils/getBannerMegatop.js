import React from 'react';
import PageBuilderMessage from '../../LN/home/common/components/pageBuilderMessage/pageBuilderMessage';

const getBannerMegatop = (element, outputType, tree, isAdmin) => {
    // const { children } = tree;
    // children[0] => Section BannerMegatop
    // const { children: childrenSectionBannerMegatop } = children[0];
    const isValid = outputType !== 'amp';
    const component = isValid ? (
        element
    ) : (
        <PageBuilderMessage
            id="LN-nota-noticia-error"
            type="warning"
            message="La sección BannerMegatop solo permite un banner y no se mostrará en salida AMP"
        />
    );
    if (isAdmin) return component;
    return isValid ? component : null;
};

export default getBannerMegatop;
