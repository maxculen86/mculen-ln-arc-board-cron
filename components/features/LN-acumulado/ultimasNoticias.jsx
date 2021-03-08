import React, { useContext } from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import GrillaNotas from '../../private/LN/acumulado/grillaNotas/grillaNotas';
import { GlobalContext } from '../../private/common/context/globalContext';

const UltimasNoticias = props => {
    const { customFields } = props;
    const { sections } = customFields;
    const globalContext = useContext(GlobalContext);
    const { siteProperties, outputType } = useAppContext();
    // const sectionsFormated = JSON.stringify(sections);
    const sectionsFormated = JSON.stringify(sections)
        .replaceAll(',', '+OR+')
        .replace('[', '(')
        .replace(']', ')');
    // sections && sections.join().replace(',', '","').replace("\'", "\"");
    // (%22/el-mundo%22+OR+%22/deportes%22)
    return (
        <GrillaNotas
            sectionsIds={sectionsFormated}
            sourceOrigin="composer"
            size={30}
            page={1}
            siteProperties={siteProperties}
            typeArticle="Timeline"
            outputType={outputType}
            gc={globalContext}
        />
    );
}

UltimasNoticias.label = 'LN Acumulado Ultimas Noticias';

UltimasNoticias.propTypes = {
    customFields: PropTypes.shape({
        sections: PropTypes.list.tag({
            label: 'Secciones'
        }).isRequired
    }).isRequired
};

export default UltimasNoticias;
