import React from 'react';
import { LAYOUTS } from '../utils/helper-WebApi';
import { FocalOnePlusFour } from './components/FocalOnePlusFour';

function BNFocal1({ cards = [] }) {
    return cards;
}

function BN2Grid({ boxType, cards = [] }) {
    return (
        <div
            className="grid grid-cols-8 grid-cols-12_md grid-cols-16_lg gap-32"
            data-test-id={`${boxType}-${LAYOUTS.BN_2_GRID}`}
        >
            {cards}
        </div>
    );
}

const componentsByLayout = {
    [LAYOUTS.BN_FOCAL_1]: BNFocal1,
    [LAYOUTS.BN_FOCAL_1_MAS_4]: FocalOnePlusFour,
    [LAYOUTS.BN_2_GRID]: BN2Grid
};

function RenderManualBox({ layout, boxType, cards = [] }) {
    const LayoutComponent = componentsByLayout[layout];
    if (!LayoutComponent) {
        return null;
    }

    return <LayoutComponent boxType={boxType} cards={cards} />;
}

export default RenderManualBox;
