import React, { useState } from 'react';
import PropTypes from 'fusion:prop-types';
import Media from '../../common/media';
import ComFigcaption from '../../../common/com-figcaption';
import ComText from '../../../common/com-text';
import EpigrafeAndCreditsData from '../../../common/utils/epigrafeAndCreditsData';

const aperturaNoticia = ({ basic, outputType }) => {
    const { type, promo_items: promoItems } = basic || {};
    const { basic: basicVideo } = promoItems || {};
    const { caption: captionVideo, credito: creditoVideo } = basicVideo || {};
    const credito = EpigrafeAndCreditsData(basic);
    const [active, setActive] = useState(false);

    const handleClick = () => {
        setActive(!active);
        active
            ? document.body.classList.remove('--no-scroll')
            : document.body.classList.add('--no-scroll');
    };

    const Epigrafe = () => {
        return (
            <>
                {basic &&
                    (type === 'image' ? (
                        <ComFigcaption>
                            {basic.caption && (
                                <ComText
                                    classCondition="--caption"
                                    textname={basic.caption}
                                />
                            )}
                            <ComText
                                classCondition="--credit"
                                textname={credito}
                            />
                        </ComFigcaption>
                    ) : (
                        <>
                            <ComFigcaption>
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
                            </ComFigcaption>
                        </>
                    ))}
            </>
        );
    };

    return (
        <Media
            mediaData={basic}
            withZoom="--zoom"
            handleClick={handleClick}
            active={active}
            isApertura
            outputType={outputType}
        >
            <Epigrafe />
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
