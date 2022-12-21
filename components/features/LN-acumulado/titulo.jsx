/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import Static from 'fusion:static';
import Title from '../../private/LN/acumulado/acumuladoTitle';
import useGlobalProviderAcu from '../../private/LN/acumulado/hooks/useGlobalProviderAcu';
import checkHydrateOnly from '../../private/LN/common/utils/checkHydrateOnly';

const TitleFeature = props => {
    const { id } = props;
    const { acumuladoColor, acumuladoGeneral } = useGlobalProviderAcu();
    const {
        hidesectionslist = 'false',
        hierarchy_navigation: hierarchyManual
    } = acumuladoGeneral || {};
    const { id_logo_image: idLogoImage, navigation_color: navigationColor } =
        acumuladoColor || {};

    const { globalContent: { node_type: nodeType } = {} } = useAppContext();
    const hasHydrateOnly = checkHydrateOnly({ nodeType });

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

    return !hasHydrateOnly ? (
        <Static id={id} htmlOnly persistent>
            {Component}
        </Static>
    ) : (
        <>{Component}</>
    );
};

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

export default TitleFeature;
