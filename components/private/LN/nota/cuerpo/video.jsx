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
        content: PropTypes.string.isRequired,
        list_type: PropTypes.string.isRequired,
        items: PropTypes.arrayOf.isRequired,
        type: PropTypes.string.isRequired
    }).isRequired,
    outputType: PropTypes.string.isRequired,
    primerParrafo: PropTypes.string,
    tituloNota: PropTypes.string
};

video.defaultProps = {
    primerParrafo: '',
    tituloNota: ''
};

export default video;
