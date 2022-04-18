/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import StaticValidation from '../../../private/common/staticValidation';
import get from '../../../private/common/utils/get';

import '../../../../resources/dist/css/ln/components/label-text.css';

import LotteryCard from '../../../private/LN/services/lotteries/LotteryCard';

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
                    {lotteries.map(lottery => (
                        <LotteryCard {...lottery} />
                    ))}
                </div>
            </StaticValidation>
        )
    );
};

LotteryGrid.label = 'LN Loteria Home Grilla';

LotteryGrid.propTypes = { id: PropTypes.string.isRequired };

export default LotteryGrid;
