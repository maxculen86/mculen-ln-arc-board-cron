/* eslint-disable react/no-danger */
import React from 'react';
import ensureIframeLazyLoading from './helpers/ensureIframeLazyLoading';
import ensureResponsiveIframe from './helpers/ensureResponsiveIframe';
import { WrapperBody } from '../wrapperBody/default';

// TODO para front: realizar ajustes de estilos según diseño
function OEmbed({ data = {} }) {
    const { raw_oembed: rawOembed = {}, subtype } = data;
    const { html = '' } = rawOembed;

    const responsiveHtml = ensureResponsiveIframe({ subtype, tagHtml: html });

    return (
        <WrapperBody className="mb-64">
            <div
                className="flex items-center justify-center w-full min-w-0 overflow-hidden"
                dangerouslySetInnerHTML={ensureIframeLazyLoading({
                    subtype,
                    tagHtml: responsiveHtml
                })}
            />
        </WrapperBody>
    );
}

OEmbed.arcType = 'oembed_response';
OEmbed.outputType = 'default';
OEmbed.isStatic = true;

export default OEmbed;
