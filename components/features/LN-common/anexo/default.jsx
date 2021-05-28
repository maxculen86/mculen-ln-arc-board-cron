/* eslint-disable react/prop-types */
/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:context';
// Utils
import getSectionName from '../../../private/LN/common/utils/getSectionName';
import { isInSection, getErrorMessage, getComponentType } from './anexoHelper';

// Components
import PageBuilderMessage from '../../../private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage';

const getComponentFromConfig = (_type, _props) => {
    const components = {
        Error: ({ id, errorMessage }) => (
            <PageBuilderMessage
                key={id}
                type="warning"
                message={errorMessage}
            />
        ),
        Html: ({ customFields: { html }, extraClass }) => (
            <div
                className={`com-anexo ${extraClass}`}
                dangerouslySetInnerHTML={{
                    __html: html
                }}
            />
        ),
        Iframe: ({ id, customFields: { url, height }, extraClass }) => (
            <div
                className={`com-anexo ${extraClass}`}
                style={{ height, overflow: 'hidden' }}
            >
                <iframe
                    id={`anexo-${id}`}
                    title={`anexo-${id}`}
                    src={url}
                    frameBorder="0"
                    width="100%"
                    height="100%"
                />
            </div>
        )
    };
    return (components[_type] && components[_type](_props)) || <></>;
};

const AnexoFeature = props => {
    const {
        id,
        renderables = [],
        globalContent: { node_type: nodeType, type } = {},
        customFields
    } = props;
    // Al estar en la sección 'Anexo_1' del layout necesita tener la clase '--anexo-1'.
    const EXTRA_CLASS =
        (isInSection({ sectionName: 'Anexo1', id, renderables }) &&
            '--anexo-1') ||
        '';

    const errorMessage = getErrorMessage({
        customFields,
        sectionName: getSectionName({ nodeType, type })
    });

    return getComponentFromConfig(
        getComponentType({ ...props, errorMessage }),
        {
            ...props,
            errorMessage,
            extraClass: EXTRA_CLASS
        }
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
