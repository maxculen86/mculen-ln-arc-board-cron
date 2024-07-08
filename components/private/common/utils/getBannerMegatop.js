import React from 'react';
import PageBuilderMessage from '../../LN/home/common/components/pageBuilderMessage/pageBuilderMessage';

const getBannerMegatop = (element, outputType, isAdmin) => {
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
