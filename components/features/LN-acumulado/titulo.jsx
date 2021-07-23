import React from 'react';
import PropTypes from 'fusion:prop-types';
import Title from '../../private/LN/acumulado/acumuladoTitle';
import useGlobalProviderAcu from '../../private/LN/acumulado/hooks/useGlobalProviderAcu';

const TitleFeature = props => {
    const { acumuladoColor, acumuladoGeneral } = useGlobalProviderAcu();
    const {
        hidesectionslist = 'false',
        hierarchy_navigation: hierarchyManual
    } = acumuladoGeneral || {};
    const { id_logo_image: idLogoImage, navigation_color: navigationColor } =
        acumuladoColor || {};

    return (
        <Title
            hideCategories={hidesectionslist}
            hierarchyManual={hierarchyManual}
            colorCategory={navigationColor}
            colorTags={navigationColor}
            idLogoImage={idLogoImage}
            {...props}
        />
    );
};

TitleFeature.label = 'LN-Acumulado-Titulo';

TitleFeature.propTypes = {
    customFields: PropTypes.shape({
        prefixTitle: PropTypes.string.tag({ label: 'Prefijo del titulo' }),
        replaceTitle: PropTypes.string.tag({
            label: 'Reemplazar titulo',
            defaultValue: undefined
        })
    })
};

TitleFeature.defaultProps = {
    customFields: {
        idCollection: undefined,
        prefixTitle: undefined
    }
};

TitleFeature.lazy = ['default', 'amp'];

export default TitleFeature;
