import React from 'react';
import { LAYOUTS } from '../utils/helper-WebApi';
import { FocalOnePlusFour } from './components/FocalOnePlusFour';

const RenderManualBox = ({ layout, boxType, cards = [] }) => {
    const { BN_FOCAL_1, BN_FOCAL_1_MAS_4, BN_2_GRID } = LAYOUTS;

    const componentsByLayout = {
        [BN_FOCAL_1]: () => cards,
        [BN_FOCAL_1_MAS_4]: () => (
            <FocalOnePlusFour boxType={boxType} cards={cards} />
        ),
        [BN_2_GRID]: () => (
            <div
                className="grid grid-cols-8 grid-cols-12_md grid-cols-16_lg gap-32"
                data-test-id={`${boxType}-${BN_2_GRID}`}
            >
                {cards}
            </div>
        )
    };

    return (
        (componentsByLayout[layout] && componentsByLayout[layout]()) || <></>
    );
};

export default RenderManualBox;
