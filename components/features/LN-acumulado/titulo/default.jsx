/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import Static from 'fusion:static';
import Title from '../../../private/LN/acumulado/acumuladoTitle';
import useGlobalProviderAcu from '../../../private/LN/acumulado/hooks/useGlobalProviderAcu';
import {
    buildSocialCustomFields,
    getSocialsFromCustomFields
} from './_helpers';

function TitleFeature(props) {
    const { id: featureId = '', customFields } = props;
    const { acumuladoColor, acumuladoGeneral } = useGlobalProviderAcu();
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
            socials={getSocialsFromCustomFields(customFields)}
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
        }),
        ...buildSocialCustomFields()
    }).isRequired
};

export default TitleFeature;
