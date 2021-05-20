/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:context';
// Utils
import { getChildsFromSections } from '../../../private/LN/common/utils/homeHelper';
import getSectionName from '../../../private/LN/common/utils/getSectionName';
// Components
import PageBuilderMessage from '../../../private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage';
import AnexoIframe from '../../../private/LN/acumulado/anexoIframe';
import sectionsValidation from '../../../layouts/config/LN-Home.config.json';

// Este componente es de uso exclusivo de HOME
// Se agrega este index como constante por regla de negocio
// Al estar en la sección 'Anexo_1' del layout necesita tener la clase '--anexo-1'.

const AnexoFeature = ({
    id,
    isAdmin,
    renderables,
    globalContent: { node_type: nodeType, type } = {},
    customFields: { url, hideByUrl, html, height, hideByHtml }
}) => {
    if (getSectionName({ nodeType, type }) !== 'home') return <></>;

    const isInAnexo1 = getChildsFromSections(
        renderables,
        sectionsValidation.Anexo_1.position + 1
    ).some(el => el.props.id === id);

    const EXTRA_CLASS = (isInAnexo1 && '--anexo-1') || '';

    const errorMessage =
        (!url &&
            !hideByUrl &&
            !html &&
            !hideByHtml &&
            'Se requiere agregue la URL o HTML del anexo') ||
        (!html &&
            url &&
            !hideByUrl &&
            !height &&
            'El alto fijo del anexo es un campo requerido para los anexos con URL') ||
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
                dangerouslySetInnerHTML={{
                    __html: html
                }}
            />
        )) ||
        (!errorMessage && !hideByUrl && url && (
            <div style={{ height, overflow: 'hidden' }}>
                <AnexoIframe
                    url={url}
                    id={id}
                    extraClass={EXTRA_CLASS}
                    _props={{ height }}
                />
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
            group: 'Ajuste por URL',
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
