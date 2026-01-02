/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import Static from 'fusion:static';
import Consumer from 'fusion:consumer';
import Title from '../../private/LN/acumulado/acumuladoTitle';
import get from '../../private/common/utils/get';

function TitleFeature(props) {
    const { id: featureId = '' } = props;
    const { acumuladoColor, acumuladoGeneral } = get(
        props,
        'globalContent',
        {}
    );
    const {
        hidesectionslist = 'false',
        hierarchy_navigation: hierarchyManual
    } = acumuladoGeneral || {};
    const { id_logo_image: idLogoImage, navigation_color: navigationColor } =
        acumuladoColor || {};

    const Component = (
        <Title
            hideCategories={hidesectionslist}
            hierarchyManual={hierarchyManual}
            colorCategory={navigationColor}
            colorTags={navigationColor}
            idLogoImage={idLogoImage}
            {...props}
        />
    );

    return <Static id={featureId}>{Component}</Static>;
}

TitleFeature.label = 'LN-Acumulado-Titulo';

TitleFeature.propTypes = {
    id: PropTypes.string.isRequired,
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

export default Consumer(TitleFeature);
