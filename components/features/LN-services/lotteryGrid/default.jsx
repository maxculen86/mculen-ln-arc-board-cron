/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import StaticValidation from '../../../private/common/staticValidation';
import get from '../../../private/common/utils/get';

import '../../../../resources/dist/css/ln/components/card-lotteries.css';
import '../../../../resources/dist/css/ln/components/result-item.css';
import '../../../../resources/dist/css/ln/components/label-text.css';
import '../../../../resources/dist/css/ln/components/ball-lotteries.css';

import Brinco from '../../../private/LN/services/lotteries/Brinco';
import Loto5 from '../../../private/LN/services/lotteries/Loto5';
import LotoPlus from '../../../private/LN/services/lotteries/LotoPlus';
import Quini6 from '../../../private/LN/services/lotteries/Quini6';
import QuinielaPlus from '../../../private/LN/services/lotteries/QuinielaPlus';
import QuinielaPoceada from '../../../private/LN/services/lotteries/QuinielaPoceada';
import Quinielas from '../../../private/LN/services/lotteries/Quinielas';
import Telekino from '../../../private/LN/services/lotteries/Telekino';

export const components = {
    Brinco,
    Loto5,
    LotoPlus,
    Quini6,
    QuinielaPlus,
    QuinielaPoceada,
    Quinielas,
    Telekino
};

const LotteryGrid = ({ id: featureId }) => {
    const lotteries = get(
        useAppContext(),
        'globalContent.dataService.lotteries',
        []
    );
    return (
        lotteries.length && (
            <StaticValidation id={featureId} htmlOnly persistent>
                <div className="lotteries home-lottery-grid row-gap-tablet-3">
                    {lotteries.map(lottery => {
                        const { component: cardComponent, id } = lottery;
                        const Lottery = components[cardComponent];
                        return <Lottery key={id} {...lottery} />;
                    })}
                </div>
            </StaticValidation>
        )
    );
};

LotteryGrid.label = 'LN Loteria Home Grilla';

LotteryGrid.propTypes = { id: PropTypes.string.isRequired };

export default LotteryGrid;
