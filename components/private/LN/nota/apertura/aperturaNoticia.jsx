import React from 'react';
import PropTypes from 'fusion:prop-types';
import Media from '../../common/media';
import ComFigcaption from '../../../common/com-figcaption';
import ComText from '../../../common/com-text';
import EpigrafeAndCreditsData from '../../../common/utils/epigrafeAndCreditsData';

const aperturaNoticia = ({ basic }) => {
    console.log('aperturaNoticia -> basic *********** ', basic);
    const credito = EpigrafeAndCreditsData(basic);

    return (
        <Media mediaData={basic} colNumber={12} withZoom="--zoom">
            {basic && (
                <ComFigcaption>
                    {basic.caption && (
                        <ComText
                            classCondition="--caption"
                            textname={basic.caption}
                        />
                    )}
                    <ComText classCondition="--credit" textname={credito} />
                </ComFigcaption>
            )}
        </Media>
    );
};

aperturaNoticia.propTypes = {
    basic: PropTypes.shape({
        distributor: PropTypes.string,
        caption: PropTypes.string,
        vanity_credits: PropTypes.arrayOf,
        credits: PropTypes.arrayOf
    }).isRequired
};

export default aperturaNoticia;
