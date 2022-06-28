/* eslint-disable react/prop-types */
import React from 'react';
import getStreams from '../../../LN/common/utils/getStreams';
import VideoPlayerSnippet from '../../../common/scriptManager/snippetVideo';

const ProgramSnippet = props => {
    const { globalContent } = props;
    const {
        duration = 0,
        headlines: { basic = '' },
        promo_items = {},
        created_date = '',
        streams = []
    } = globalContent;

    const minStream = getStreams(streams);
    const mediaData = {
        promo_items,
        duration,
        created_date
    };
    const parrafo = {
        content: `Programa: ${basic}`
    };

    return (
        <VideoPlayerSnippet
            mediaData={mediaData}
            minStream={minStream}
            parrafo={parrafo}
            tituloNota={basic}
        />
    );
};

export default ProgramSnippet;
