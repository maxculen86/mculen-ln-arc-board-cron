import React from 'react';

import '../../../resources/dist/css/ln/modules/mod-cripto.css';
import Text from './text';
import Link from './com-link';

const ModCripto = () => {
    return (
        <div className="cripto">
            <div className="gradient">
                <div className="mod-cripto">
                    <div
                        className="livecoinwatch-widget-1"
                        lcw-coin="BTC"
                        lcw-base="USD"
                        lcw-secondary="ETH"
                        lcw-period="w"
                        lcw-color-tx="#000000"
                        lcw-color-pr="#126fff"
                        lcw-color-bg="#ffffff"
                        lcw-border-w="1"
                    />
                    <div
                        className="livecoinwatch-widget-1"
                        lcw-coin="ETH"
                        lcw-base="USD"
                        lcw-secondary="BTC"
                        lcw-period="w"
                        lcw-color-tx="#000000"
                        lcw-color-pr="#126fff"
                        lcw-color-bg="#ffffff"
                        lcw-border-w="1"
                    />
                    <div className="mini-widget">
                        <div
                            className="livecoinwatch-widget-6"
                            lcw-coin="BNB"
                            lcw-base="USD"
                            lcw-period="d"
                            lcw-color-tx="#000000"
                            lcw-color-bg="#ffffff"
                            lcw-border-w="1"
                        />
                        <div
                            className="livecoinwatch-widget-6"
                            lcw-coin="XRP"
                            lcw-base="USD"
                            lcw-period="d"
                            lcw-color-tx="#000000"
                            lcw-color-bg="#ffffff"
                            lcw-border-w="1"
                        />
                        <div
                            className="livecoinwatch-widget-6"
                            lcw-coin="ADA"
                            lcw-base="USD"
                            lcw-period="d"
                            lcw-color-tx="#000000"
                            lcw-color-bg="#ffffff"
                            lcw-border-w="1"
                        />
                        <div
                            className="livecoinwatch-widget-6"
                            lcw-coin="SOL"
                            lcw-base="USD"
                            lcw-period="d"
                            lcw-color-tx="#000000"
                            lcw-color-bg="#ffffff"
                            lcw-border-w="1"
                        />
                        <div
                            className="livecoinwatch-widget-6"
                            lcw-coin="DOT"
                            lcw-base="USD"
                            lcw-period="d"
                            lcw-color-tx="#000000"
                            lcw-color-bg="#ffffff"
                            lcw-border-w="1"
                        />
                        <div
                            className="livecoinwatch-widget-6"
                            lcw-coin="TRX"
                            lcw-base="USD"
                            lcw-period="d"
                            lcw-color-tx="#000000"
                            lcw-color-bg="#ffffff"
                            lcw-border-w="1"
                        />
                    </div>
                </div>
            </div>
            <div
                className="livecoinwatch-widget-5"
                lcw-base="USD"
                lcw-color-tx="#000000"
                lcw-marquee-1="coins"
                lcw-marquee-2="none"
                lcw-marquee-items="30"
            />
            <Text size="5xs">
                Información provista por
                {`${' '}`}
                <Link
                    link="https://www.livecoinwatch.com/"
                    target="_blank"
                    rel="nofollow"
                    title="Ir a Live Coin Watch"
                >
                    Live Coin Watch
                </Link>
            </Text>
        </div>
    );
};

export default ModCripto;
