import React from 'react';
import { SITE_LANACION } from 'fusion:environment';
import '../../../resources/dist/css/ln/modules/mod-carrousel-crypto.css';
import Text from './text';
import ComLink from './com-link';

const ModCriptoCarrousel = () => {
    return (
        <div className="container-widget-carrousel">
            <div className="widget-carrousel-coins">
                <ComLink
                    link="/tema/criptomonedas-tid63718/"
                    title="Ir a Criptomonedas"
                    type="text/css"
                >
                    <Text
                        tag="h2"
                        size="--twoxs"
                        weight="bold"
                        extraClass="cripto-title"
                        text="Criptomonedas"
                    />
                </ComLink>
                <div
                    className="livecoinwatch-widget-5"
                    lcw-base="USD"
                    lcw-color-tx="#000000"
                    lcw-marquee-1="coins"
                    lcw-marquee-2="none"
                    lcw-marquee-items="20"
                />
            </div>
            <Text size="5xs" extraClass="cripto-info">
                Información provista por
                {`${' '}`}
                <ComLink
                    link="https://www.livecoinwatch.com/"
                    target="_blank"
                    rel="nofollow"
                    title="Ir a Live Coin Watch"
                >
                    Live Coin Watch
                </ComLink>
            </Text>
        </div>
    );
};

export default ModCriptoCarrousel;
