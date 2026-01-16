/* eslint-disable react/no-danger */
import React from 'react';
import ensureIframeLazyLoading from './helpers/ensureIframeLazyLoading';

// TODO para front: realizar ajustes de estilos según diseño
function OEmbed({ data = {} }) {
    const { raw_oembed: rawOembed = {}, subtype } = data;
    const { html = '' } = rawOembed;

    return (
        <div
            dangerouslySetInnerHTML={ensureIframeLazyLoading({
                subtype,
                tagHtml: html
            })}
        />
    );
}

OEmbed.arcType = 'oembed_response';
OEmbed.outputType = 'default';
OEmbed.isStatic = true;

export default OEmbed;
