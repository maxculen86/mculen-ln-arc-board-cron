import React from 'react';
import PropTypes from 'fusion:prop-types';
import Media from '../../common/media';
import ComText from '../../../common/text';
import get from '../../../common/utils/get';

const video = ({ data, outputType, tituloNota, primerParrafo }) => {
    const parrafo = primerParrafo || 'LA NACION';
    const { promo_items: promoItems } = data || {};
    const { basic: basicVideo } = promoItems || {};
    const { caption: captionVideo, credito: creditoVideo } = basicVideo || {};

    const textEpigrafe = get(data, 'headlines.basic', captionVideo);

    const Epigrafe = () => {
        return (
            <>
                {textEpigrafe && (
                    <ComText
                        extraClass="--caption --twoxs"
                        text={textEpigrafe}
                    />
                )}
                {creditoVideo && (
                    <ComText
                        extraClass="--credit --twoxs"
                        text={creditoVideo}
                    />
                )}
            </>
        );
    };

    return (
        <>
            <Media
                mediaData={data}
                colNumber={12}
                outputType={outputType}
                tituloNota={tituloNota}
                parrafo={parrafo}
            >
                <Epigrafe />
            </Media>
        </>
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

export default video;
