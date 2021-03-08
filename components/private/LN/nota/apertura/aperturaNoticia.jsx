import React, { useState } from 'react';
import PropTypes from 'fusion:prop-types';
import Media from '../../common/media';
import ComText from '../../../common/com-text';
import ComFigcaption from '../../../common/com-figcaption';
import EpigrafeAndCreditsData from '../../../common/utils/epigrafeAndCreditsData';
import get from '../../../common/utils/get';

const aperturaNoticia = ({ basic, outputType, primerParrafo, tituloNota }) => {
    const parrafo = primerParrafo || 'LA NACION';
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

    const textEpigrafe = get(basic, 'headlines.basic', captionVideo);

    const Epigrafe = () => {
        return basic && type === 'image' ? (
            <>
                {basic.caption && (
                    <ComText
                        classCondition="--caption --twoxs"
                        textname={basic.caption}
                    />
                )}
                {credito && (
                    <ComText
                        classCondition="--credit --twoxs"
                        textname={credito}
                    />
                )}
            </>
        ) : (
            <>
                {textEpigrafe && (
                    <ComText
                        classCondition="--caption --twoxs"
                        textname={textEpigrafe}
                    />
                )}
                {creditoVideo && (
                    <ComText
                        classCondition="--credit --twoxs"
                        textname={creditoVideo}
                    />
                )}
            </>
        );
    };

    return (
        <section className="mod-opening">
            <Media
                mediaData={basic}
                withZoom="--zoom"
                handleClick={handleClick}
                active={active}
                isApertura
                outputType={outputType}
                parrafo={parrafo}
                tituloNota={tituloNota}
            >
                <ComFigcaption>
                    <Epigrafe />
                </ComFigcaption>
            </Media>
        </section>
    );
};

aperturaNoticia.propTypes = {
    basic: PropTypes.shape({
        distributor: PropTypes.string,
        caption: PropTypes.string,
        vanity_credits: PropTypes.array,
        credits: PropTypes.array
    }).isRequired,
    outputType: PropTypes.string.isRequired
};

export default aperturaNoticia;
