/* eslint-disable react/no-danger */
import React from 'react';
import ensureIframeLazyLoading from './helpers/ensureIframeLazyLoading';
import { WrapperBody } from '../wrapperBody/default';

// TODO para front: realizar ajustes de estilos según diseño
function OEmbed({ data = {} }) {
    const { raw_oembed: rawOembed = {}, subtype } = data;
    const { html = '' } = rawOembed;

    return (
        <WrapperBody className="mb-64">
            <div
                className="flex items-center justify-center min-w-0 overflow-hidden"
                dangerouslySetInnerHTML={ensureIframeLazyLoading({
                    subtype,
                    tagHtml: html
                })}
            />
        </WrapperBody>
    );
}

OEmbed.arcType = 'oembed_response';
OEmbed.outputType = 'default';
OEmbed.isStatic = true;

export default OEmbed;
