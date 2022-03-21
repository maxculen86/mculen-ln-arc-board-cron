/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
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

video.propTypes = {
    data: PropTypes.shape({
        content: PropTypes.string,
        list_type: PropTypes.string,
        items: PropTypes.array,
        type: PropTypes.string
    }).isRequired,
    outputType: PropTypes.string,
    primerParrafo: PropTypes.shape({
        content: PropTypes.string
    }).isRequired,
    tituloNota: PropTypes.string
};

video.defaultProps = {
    tituloNota: ''
};

export default video;
