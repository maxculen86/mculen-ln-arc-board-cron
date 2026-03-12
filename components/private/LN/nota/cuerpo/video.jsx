/* eslint-disable react/require-default-props */
import React from 'react';
import Media from '../../common/media';
import { getEpigrafe } from '../../common/utils/mediaHelper';

const video = ({ data, outputType, tituloNota, primerParrafo }) => {
    const parrafo = primerParrafo || 'LA NACION';
    const { caption, credit } = getEpigrafe(data);

    return (
        <Media
            mediaData={data}
            colNumber={12}
            outputType={outputType}
            tituloNota={tituloNota}
            parrafo={parrafo}
        >
            {caption}
            {credit}
        </Media>
    );
};

video.arcType = 'video';

export default video;
