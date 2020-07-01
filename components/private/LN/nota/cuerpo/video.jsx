import React from 'react';
import PropTypes from 'fusion:prop-types';
import Media from '../../common/media';
import ComText from '../../../common/com-text';

const video = ({ data, outputType }) => {
    const { promo_items: promoItems } = data || {};
    const { basic: basicVideo } = promoItems || {};
    const { caption: captionVideo, credito: creditoVideo } = basicVideo || {};

    const Epigrafe = () => {
        return (
            <>
                {captionVideo && (
                    <ComText
                        classCondition="--caption"
                        textname={captionVideo}
                    />
                )}
                {creditoVideo && (
                    <ComText
                        classCondition="--credit"
                        textname={creditoVideo}
                    />
                )}
            </>
        );
    };

    return (
        <>
            <Media mediaData={data} colNumber={12} outputType={outputType}>
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
    outputType: PropTypes.string.isRequired
};

export default video;
