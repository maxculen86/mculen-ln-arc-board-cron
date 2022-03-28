/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import StaticValidation from '../../../private/common/staticValidation';
import DetailsTable from '../../../private/LN/services/lotteries/DetailsTable';
import get from '../../../private/common/utils/get';

const LotteryDetailOpening = ({ id: featureId }) => {
    const lottery = get(
        useAppContext(),
        'globalContent.dataService.lotteryDetail',
        []
    );
    return (
        <StaticValidation id={featureId} htmlOnly persistent>
            <div className="lottery-detail-box lay">
                Apertura Detalle Lotería
            </div>
            {lottery.map(game => {
                return <DetailsTable data={game} />;
            })}
        </StaticValidation>
    );
};

LotteryDetailOpening.label = 'LN Loteria Detalle Apertura';

LotteryDetailOpening.propTypes = { id: PropTypes.string.isRequired };

export default LotteryDetailOpening;
