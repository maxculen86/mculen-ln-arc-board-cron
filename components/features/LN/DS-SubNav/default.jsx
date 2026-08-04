import React from 'react';
import Consumer from 'fusion:consumer';
import { useAppContext } from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import SubNavContent from './components/SubNavContent';
import {
    buildSocialCustomFields,
    getSocialsFromCustomFields,
    NAV_TYPES,
    DEFAULT_NAV_TYPE
} from './_helpers';

function SubNav(props) {
    const { customFields = {} } = props;
    const { globalContent = {} } = useAppContext();
    const { acumuladoColor, acumuladoGeneral } = globalContent;
    const {
        hidesectionslist = 'false',
        hierarchy_navigation: hierarchyManual
    } = acumuladoGeneral || {};
    const { id_logo_image: idLogoImage } = acumuladoColor || {};
    const socials = customFields.showSocials
        ? getSocialsFromCustomFields(customFields)
        : [];
    const navigationType = customFields.navigationType || DEFAULT_NAV_TYPE;

    return (
        <div data-tw style={{ display: 'contents' }}>
            <SubNavContent
                {...props}
                globalContent={globalContent}
                hideCategories={hidesectionslist}
                hierarchyManual={hierarchyManual}
                idLogoImage={idLogoImage}
                socials={socials}
                navigationType={navigationType}
            />
        </div>
    );
}

SubNav.label = 'LN-DS-SubNav';

SubNav.propTypes = {
    id: PropTypes.string,
    globalContent: PropTypes.shape({
        acumuladoColor: PropTypes.shape({
            id_logo_image: PropTypes.string
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
        }),
        navigationType: PropTypes.oneOf(Object.keys(NAV_TYPES)).tag({
            label: 'Tipo de navegación',
            group: 'Configurar navegación',
            labels: NAV_TYPES,
            defaultValue: DEFAULT_NAV_TYPE
        }),
        showSocials: PropTypes.bool.tag({
            label: 'Mostrar redes sociales',
            group: 'Redes sociales',
            defaultValue: false
        }),
        ...buildSocialCustomFields()
    }).isRequired
};

SubNav.defaultProps = {
    id: '',
    globalContent: {}
};

export default Consumer(SubNav);
