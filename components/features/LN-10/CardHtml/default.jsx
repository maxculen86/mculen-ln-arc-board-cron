/* eslint-disable react/require-default-props */
import React from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import { Cardhtml } from '@ln/contenidos-ui-cardhtml';
import WarningMessage from '../../../private/common/warningMessage/warningMessage';
import validateHtmlFeature from './_helper';
import SetFixedHeight from '../../../private/common/SetFixedHeight';

export default function HtmlFeature({
    id: featureId,
    customFields,
    customFields: {
        title,
        html,
        heightMobile,
        heightTablet,
        heightDesktop
    } = {}
}) {
    const { isAdmin } = useAppContext() || {};

    const error = validateHtmlFeature({ customFields });
    const iframeId = `iframe-responsive-${featureId}`;

    if (isAdmin && !!error) {
        return (
            <WarningMessage
                key={featureId}
                type={error.type}
                message={error.message}
            />
        );
    }

    return (
        !error && (
            <Cardhtml className="h-100">
                <SetFixedHeight
                    elementId={iframeId}
                    heightMobile={heightMobile}
                    heightTablet={heightTablet}
                    heightDesktop={heightDesktop}
                />
                <iframe
                    id={iframeId}
                    title={title}
                    width="100%"
                    height="100%"
                    loading="lazy"
                    sandbox="allow-popups allow-scripts allow-same-origin"
                    srcDoc={`
                        <style> html, body { width: 100%; height: 100%; overflow: hidden; }</style>
                        ${html}
                    `}
                />
            </Cardhtml>
        )
    );
}

HtmlFeature.label = 'LN10 Card Html';

HtmlFeature.propTypes = {
    customFields: PropTypes.shape({
        title: PropTypes.string.tag({
            name: 'Título',
            description:
                'Ingrese el texto del título. Máx: 100 caracteres incluyendo volanta.',
            default: ''
        }),
        heightDesktop: PropTypes.number.tag({
            label: 'Alto Desktop',
            group: 'Altos',
            description: 'Ingrese el alto fijo para Desktop',
            defaultValue: 0
        }),
        heightTablet: PropTypes.number.tag({
            label: 'Alto Tablet',
            group: 'Altos',
            description: 'Ingrese el alto fijo para Tablet',
            defaultValue: 0
        }),
        heightMobile: PropTypes.number.tag({
            label: 'Alto Mobile',
            group: 'Altos',
            description: 'Ingrese el alto fijo para Mobile',
            defaultValue: 0
        }),
        html: PropTypes.string.tag({
            name: 'Tablero / HTML',
            description: 'Ingrese aquí el html del tablero',
            default: ''
        }),
        hideAppMobile: PropTypes.boolean.tag({
            name: 'Ocultar feature en App Mobile (Android e iOS)',
            description: 'Marque para ocultar el feature en apps móviles',
            defaultValue: false
        })
    }),
    id: PropTypes.string
};
