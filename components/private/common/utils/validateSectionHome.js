import React from 'react';
import PageBuilderMessage from '../../LN/home/common/components/pageBuilderMessage/pageBuilderMessage';

const validationsConfig = {
    anticipo: {
        quantity: 1,
        type: ['LN-common/cajaAnticipo']
    }
};

const findSectionChildren = (renderables, position) => {
    const sectionFinded = renderables.find(
        ren => ren.collection === 'sections' && ren.props.id === position
    );
    return sectionFinded.children || [];
};

const validateSectionHome = (section, position, renderables, isAdmin) => {
    console.log(
        '🚀 ~ file: validateSectionHome.js ~ line 24 ~ validateSectionHome ~ renderables',
        renderables
    );
    const sectionChildren = findSectionChildren(renderables, position);
    // const { children } = tree;
    // children[0] => Section BannerMegatop
    // const { children: childrenSectionBannerMegatop } = children[0];
    const isValid = false;
    const component = isValid ? (
        section
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

export default validateSectionHome;
