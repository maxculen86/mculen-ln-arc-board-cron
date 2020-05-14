import React, { useState } from 'react';
import PropTypes from 'fusion:prop-types';
import Media from '../../common/media';
import ComFigcaption from '../../../common/com-figcaption';
import ComText from '../../../common/com-text';
import EpigrafeAndCreditsData from '../../../common/utils/epigrafeAndCreditsData';

const aperturaNoticia = ({ basic }) => {
    const credito = EpigrafeAndCreditsData(basic);
    const [active, setActive] = useState(false);

    const handleClick = () => {
        setActive(!active);
        active
            ? document.body.classList.remove('--no-scroll')
            : document.body.classList.add('--no-scroll');
    };

    return (
        <Media
            mediaData={basic}
            withZoom="--zoom"
            handleClick={handleClick}
            active={active}
            isApertura
        >
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
