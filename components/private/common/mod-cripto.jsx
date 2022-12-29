/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import '../../../resources/dist/css/ln/modules/mod-cripto.css';
import Text from './text';
import Link from './com-link';

const commonProps = {
    className: 'livecoinwatch-widget-6',
    'lcw-base': 'USD',
    'lcw-period': 'd',
    'lcw-color-tx': '#000000',
    'lcw-color-bg': '#ffffff',
    'lcw-border-w': '1'
};

const commonProps2 = {
    className: 'livecoinwatch-widget-1',
    'lcw-base': 'USD',
    'lcw-period': 'w',
    'lcw-color-tx': '#000000',
    'lcw-color-pr': '#126fff',
    'lcw-color-bg': '#ffffff',
    'lcw-border-w': '1'
};

const ModCripto = () => {
    return (
        <div className="cripto">
            <div className="gradient">
                <div className="mod-cripto">
                    <div lcw-coin="BTC" lcw-secondary="ETH" {...commonProps2} />
                    <div lcw-coin="ETH" lcw-secondary="BTC" {...commonProps2} />
                    <div className="mini-widget">
                        <div lcw-coin="BNB" {...commonProps} />
                        <div lcw-coin="XRP" {...commonProps} />
                        <div lcw-coin="ADA" {...commonProps} />
                        <div lcw-coin="SOL" {...commonProps} />
                        <div lcw-coin="DOT" {...commonProps} />
                        <div lcw-coin="TRX" {...commonProps} />
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
