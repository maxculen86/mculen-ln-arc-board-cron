import React from 'react';
import PropTypes from 'fusion:prop-types';
import Media from '../../common/media';
import ComFigcaption from '../../../common/com-figcaption';
import ComText from '../../../common/com-text';
import EpigrafeAndCreditsData from '../../../common/utils/epigrafeAndCreditsData';

const image = ({ data, withZoom }) => {
    const credito = EpigrafeAndCreditsData(data);
    return (
        <>
            <Media mediaData={data} withZoom={withZoom} colNumber={12}>
                {data && (
                    <ComFigcaption>
                        {data.caption && (
                            <ComText
                                classCondition="--caption"
                                textname={data.caption}
                            />
                        )}
                        <ComText classCondition="--credit" textname={credito} />
                    </ComFigcaption>
                )}
            </Media>
        </>
    );
};

image.arcType = 'image';

image.propTypes = {
    data: PropTypes.shape({
        caption: PropTypes.string,
        distributor: PropTypes.string,
        vanity_credits: PropTypes.arrayOf,
        credits: PropTypes.arrayOf,
        type: PropTypes.string.isRequired
    }).isRequired,
    withZoom: PropTypes.string.isRequired
};

export default image;
