/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-danger */
import React, { useEffect } from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import Static from 'fusion:static';
import PageBuilderMessage from '../../../private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage';
import get from '../../../private/common/utils/get';
import { getChildsFromSections } from '../../../private/LN/common/utils/homeHelper';
import sectionsValidation from '../../../layouts/config/LN-Home.config.json';
import { adjustByURL } from '../../../private/common/utils/propTypesHelper';

const AnexoFeature = props => {
    const { id, customFields } = props;
    const { renderables = [], isAdmin } = useAppContext();
    const { height } = customFields;
    const errorMessage = getErrorMessage({ customFields });
    const _type = getComponentType({ ...props, isAdmin, errorMessage });

    // Al estar en la sección 'Anexo_1' del layout necesita tener la clase '--anexo-1'.
    const EXTRA_CLASS = (
        (isInSection({ sectionName: 'Anexo1', id, renderables }) &&
            '--anexo-1 ') ||
        ''
    ).concat((!isAdmin && _type === 'Iframe' && 'skeleton-box') || '');

    const comp = () =>
        getComponentFromConfig(_type, {
            ...props,
            errorMessage,
            extraClass: EXTRA_CLASS,
            isAdmin
        });

    useEffect(() => {
        handleIframeProps(id);
    }, [id, comp]);

    return _type === 'Iframe' ? (
        <div
            className={`com-anexo ${EXTRA_CLASS}`}
            style={{ height, overflow: 'hidden', width: '100%' }}
        >
            {isInSection({ sectionName: 'Anexo1', id, renderables }) ? (
                <Static id={id} htmlOnly>
                    {comp()}
                </Static>
            ) : (
                comp()
            )}
        </div>
    ) : (
        comp()
    );
};

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
        Iframe: ({ id, customFields: { url } }) => {
            const anexoId = `anexo-${id}`;
            return (
                <iframe
                    id={anexoId}
                    title={`anexo-${id}`}
                    data-src={!_props.isAdmin ? url : undefined}
                    src={_props.isAdmin ? url : undefined}
                    frameBorder="0"
                    width="100%"
                    height="100%"
                />
            );
        }
    };
    return (components[_type] && components[_type](_props)) || <></>;
};

const getComponentType = ({
    isAdmin,
    errorMessage,
    customFields: { url, hideByUrl, html, height, hideByHtml }
}) =>
    (isAdmin && errorMessage && 'Error') ||
    (!errorMessage && !hideByHtml && html && 'Html') ||
    (!errorMessage && !hideByUrl && url && height && 'Iframe');

const getErrorMessage = ({
    customFields: { url, hideByUrl, html, height, hideByHtml } = {}
}) =>
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

const isInSection = ({ sectionName, id, renderables = [] }) => {
    const sectionPosition =
        get(sectionsValidation, `${sectionName}.position`, 1) + 1;
    return getChildsFromSections(renderables, sectionPosition).some(
        el => get(el, 'props.id', '') === id
    );
};

const adjustByHTML = 'Ajuste por HTML';

AnexoFeature.label = 'LN Anexo';

AnexoFeature.propTypes = {
    id: PropTypes.string.isRequired,
    customFields: PropTypes.shape({
        url: PropTypes.url.tag({
            label: 'Url',
            group: adjustByURL,
            description: 'Ingrese aquí la URL del anexo',
            defaultValue: ''
        }),
        hideByUrl: PropTypes.bool.tag({
            label: 'Ocultar',
            group: adjustByURL,
            description: 'Marque para ocultar el anexo',
            defaultValue: false
        }),
        html: PropTypes.richtext.tag({
            label: 'HTML',
            group: adjustByHTML,
            description: 'Ingrese aquí el HTML del anexo',
            // formPlugin: 'html-editor',
            // disabled: true,
            defaultValue: ''
        }),
        height: PropTypes.number.tag({
            label: 'Alto',
            group: adjustByURL,
            description: 'Ingrese aquí el alto fijo del anexo',
            defaultValue: 0
        }),
        hideByHtml: PropTypes.bool.tag({
            label: 'Ocultar',
            group: adjustByHTML,
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

export default AnexoFeature;

const handleIframeProps = id => {
    const iframeAnexo = document.getElementById(`anexo-${id}`);
    if (iframeAnexo) {
        iframeAnexo.parentElement.classList.remove('skeleton-box');
        iframeAnexo.src = iframeAnexo.dataset.src;
    }
};
