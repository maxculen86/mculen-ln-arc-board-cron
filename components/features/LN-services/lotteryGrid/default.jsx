/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import StaticContent from '../../../private/common/staticContent';
import get from '../../../private/common/utils/get';

import '../../../../resources/dist/css/ln/components/label-text.css';

import LotteryCard from '../../../private/LN/services/lotteries/LotteryCard';

const LotteryGrid = () => {
    const lotteries = get(
        useAppContext(),
        'globalContent.dataService.lotteries',
        []
    );
    return (
        lotteries.length && (
            <StaticContent>
                <div className="lotteries home-lottery-grid row-gap-tablet-3">
                    {lotteries.map(lottery => (
                        <LotteryCard {...lottery} />
                    ))}
                </div>
            </StaticContent>
        )
    );
};

LotteryGrid.label = 'LN Loteria Home Grilla';
LotteryGrid.propTypes = { id: PropTypes.string.isRequired };

export default LotteryGrid;
