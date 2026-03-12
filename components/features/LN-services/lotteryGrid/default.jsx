/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useAppContext } from 'fusion:context';
import Static from 'fusion:static';
import get from '../../../private/common/utils/get';
import LotteryCard from '../../../private/LN/services/lotteries/LotteryCard';
import '../../../../resources/dist/css/ln/components/label-text.css';

function LotteryGrid() {
    const lotteries = get(
        useAppContext(),
        'globalContent.dataService.lotteries',
        []
    );
    const id = get(useAppContext(), 'globalContent.serviceType', '');
    return (
        lotteries.length && (
            <Static id={id} htmlOnly>
                <div className="lotteries home-lottery-grid row-gap-tablet-3">
                    {lotteries.map(lottery => (
                        <LotteryCard {...lottery} />
                    ))}
                </div>
            </Static>
        )
    );
}

LotteryGrid.label = 'LN Loteria Home Grilla';

export default LotteryGrid;
