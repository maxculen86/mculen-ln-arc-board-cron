import React from 'react';
import Consumer from 'fusion:consumer';
import { useAppContext } from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import Static from 'fusion:static';
import SubNavContent from './components/SubNavContent';

function SubNav(props) {
    const { id: featureId = '' } = props;
    const { globalContent = {} } = useAppContext();
    const { acumuladoColor, acumuladoGeneral } = globalContent;
    const {
        hidesectionslist = 'false',
        hierarchy_navigation: hierarchyManual
    } = acumuladoGeneral || {};
    const { id_logo_image: idLogoImage, navigation_color: navigationColor } =
        acumuladoColor || {};

    return (
        <Static id={featureId}>
            <SubNavContent
                {...props}
                globalContent={globalContent}
                hideCategories={hidesectionslist}
                hierarchyManual={hierarchyManual}
                colorCategory={navigationColor}
                idLogoImage={idLogoImage}
            />
        </Static>
    );
}

SubNav.label = 'LN-DS-SubNav';

SubNav.propTypes = {
    id: PropTypes.string,
    globalContent: PropTypes.shape({
        acumuladoColor: PropTypes.shape({
            id_logo_image: PropTypes.string,
            navigation_color: PropTypes.string
        }),
        acumuladoGeneral: PropTypes.shape({
            hidesectionslist: PropTypes.string,
            hierarchy_navigation: PropTypes.string
        })
    }),
    customFields: PropTypes.shape({
        prefixTitle: PropTypes.string.tag({ label: 'Prefijo del titulo' }),
        replaceTitle: PropTypes.string.tag({
            label: 'Reemplazar titulo',
            defaultValue: undefined
        })
    }).isRequired
};

SubNav.defaultProps = {
    id: '',
    globalContent: {}
};

export default Consumer(SubNav);
