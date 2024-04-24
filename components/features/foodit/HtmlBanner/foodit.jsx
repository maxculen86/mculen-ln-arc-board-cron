/* eslint-disable react/require-default-props */
import React from 'react';
import { useAppContext } from 'fusion:context';
import Static from 'fusion:static';
import PropTypes from 'fusion:prop-types';
import WarningMessage from '../../../private/common/warningMessage/warningMessage';
import validateHtmlFeature from './_helper';
import SetFixedHeight from '../../../private/common/SetFixedHeight';
import { Cardhtml } from '@ln/contenidos-ui-cardhtml';

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
                featureId={featureId}
                type={error.type}
                message={error.message}
            />
        );
    }

    return (
        <Static htmlOnly persistent id={featureId}>
            {!error && (
                <section className="flex flex-column">
                    <div className="w-100vw as-center py-72 bg-light-50">
                        <div className="container">
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
                                    sandbox="allow-scripts allow-popups"
                                    srcDoc={`
                                        <style> html, body { width: 100%; height: 100%; overflow: hidden; }</style>
                                        ${html}
                                    `}
                                />
                            </Cardhtml>
                        </div>
                    </div>
                </section>
            )}
        </Static>
    );
}

HtmlFeature.propTypes = {
    customFields: PropTypes.shape({
        title: PropTypes.string.tag({
            name: 'Título',
            description:
                'Ingrese el texto del título. Máx: 100 caracteres incluyendo volanta.',
            default: ''
        }),
        html: PropTypes.string.tag({
            name: 'HTML',
            description: 'Ingrese aquí el html del banner',
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
        })
    }),
    id: PropTypes.string
};
