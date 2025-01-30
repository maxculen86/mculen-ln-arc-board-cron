import React from 'react';
import PropTypes from 'prop-types';
import { LAYOUTS } from '../utils/helper-WebApi';
import { FocalOnePlusFour } from './components/FocalOnePlusFour';

function BNFocal1({ cards }) {
    return cards;
}

BNFocal1.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.node)
};

BNFocal1.defaultProps = {
    cards: []
};

function BN2Grid({ boxType, cards }) {
    return (
        <div
            className="grid grid-cols-8 grid-cols-12_md grid-cols-16_lg gap-32"
            data-test-id={`${boxType}-${LAYOUTS.BN_2_GRID}`}
        >
            {cards}
        </div>
    );
}

BN2Grid.propTypes = {
    boxType: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(PropTypes.node)
};

BN2Grid.defaultProps = {
    cards: []
};

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

RenderManualBox.propTypes = {
    layout: PropTypes.oneOf(Object.values(LAYOUTS)).isRequired,
    boxType: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(PropTypes.node)
};

RenderManualBox.defaultProps = {
    cards: []
};

export default RenderManualBox;
