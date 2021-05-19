import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:context';
// Utils
import { getChildsFromSections } from '../../../private/LN/common/utils/homeHelper';
import getSectionName from '../../../private/LN/common/utils/getSectionName';
// Components
import PageBuilderMessage from '../../../private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage';
import AnexoIframe from '../../../private/LN/acumulado/anexoIframe';

// Este componente es de uso exclusivo de HOME
// Se agrega este index como constante por regla de negocio
// Actualmente el index '2' es la sección Anexo_1 del layout de LN-Home_Main.
// Al estar en la sección 'Anexo_1' del layout necesita tener la clase '--anexo-1'.
const INDEX_SECTION_ANEXO_1 = 2;
const CLASS_ANEXO_1 = '--anexo-1';
const NODE_TYPE_HOME = 'home';

const AnexoFeature = ({
    id,
    isAdmin,
    renderables,
    globalContent: { node_type: nodeType, type } = {},
    customFields: { url, hideByUrl, html, height, hideByHtml }
}) => {
    if (getSectionName({ nodeType, type }) !== NODE_TYPE_HOME) return <></>;

    const isInAnexo1 = getChildsFromSections(
        renderables,
        INDEX_SECTION_ANEXO_1
    ).some(el => el.props.id === id);

    const EXTRA_CLASS = (isInAnexo1 && CLASS_ANEXO_1) || '';

    const errorMessage =
        (!url &&
            !hideByUrl &&
            !html &&
            !hideByHtml &&
            'Se requiere agregue la URL o HTML del anexo') ||
        (html &&
            !hideByHtml &&
            !height &&
            'El alto fijo del anexo es un campo requerido para los anexos con HTML') ||
        '';

    return (
        (isAdmin && errorMessage && (
            <PageBuilderMessage
                key={id}
                type="warning"
                message={errorMessage}
            />
        )) ||
        (!errorMessage && !hideByHtml && html && (
            <div
                className={`com-anexo ${EXTRA_CLASS}`}
                style={{ height, overflow: 'hidden' }}
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                    __html: html
                }}
            />
        )) ||
        (!errorMessage && !hideByUrl && url && (
            <div className={`com-anexo ${EXTRA_CLASS}`}>
                <AnexoIframe url={url} id={id} />
            </div>
        )) || <></>
    );
};

AnexoFeature.label = 'LN Home Anexo';

AnexoFeature.propTypes = {
    id: PropTypes.string.isRequired,
    customFields: PropTypes.shape({
        url: PropTypes.url.tag({
            label: 'Url',
            group: 'Ajuste por URL',
            description: 'Ingrese aquí la URL del anexo',
            defaultValue: ''
        }),
        hideByUrl: PropTypes.bool.tag({
            label: 'Ocultar',
            group: 'Ajuste por URL',
            description: 'Marque para ocultar el anexo',
            defaultValue: false
        }),
        html: PropTypes.richtext.tag({
            label: 'HTML',
            group: 'Ajuste por HTML',
            description: 'Ingrese aquí el HTML del anexo',
            // formPlugin: 'html-editor',
            // disabled: true,
            defaultValue: ''
        }),
        height: PropTypes.number.tag({
            label: 'Alto',
            group: 'Ajuste por HTML',
            description: 'Ingrese aquí el alto fijo del anexo',
            defaultValue: 0
        }),
        hideByHtml: PropTypes.bool.tag({
            label: 'Ocultar',
            group: 'Ajuste por HTML',
            description: 'Marque para ocultar el anexo',
            defaultValue: false
        })
    })
};

AnexoFeature.defaultProps = {
    customFields: {
        url: '',
        hideByUrl: false,
        html: '',
        height: 0,
        hideByHtml: false
    }
};

export default Consumer(AnexoFeature);
