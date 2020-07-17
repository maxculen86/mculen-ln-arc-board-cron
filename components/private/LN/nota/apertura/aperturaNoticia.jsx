import React, { useState } from 'react';
import PropTypes from 'fusion:prop-types';
import Media from '../../common/media';
import ComText from '../../../common/com-text';
import ComFigcaption from '../../../common/com-figcaption';
import EpigrafeAndCreditsData from '../../../common/utils/epigrafeAndCreditsData';

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

    const Epigrafe = () => {
        return basic && type === 'image' ? (
            <>
                {basic.caption && (
                    <ComText
                        classCondition="--caption"
                        textname={basic.caption}
                    />
                )}
                {credito && (
                    <ComText classCondition="--credit" textname={credito} />
                )}
            </>
        ) : (
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
