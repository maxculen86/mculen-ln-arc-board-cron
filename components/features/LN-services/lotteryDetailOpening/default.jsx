/* eslint-disable camelcase */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import StaticValidation from '../../../private/common/staticValidation';
import { components } from '../lotteryGrid/default';
import get from '../../../private/common/utils/get';
import TableHorizontalResults from '../../../private/LN/services/lotteries/TableHorizontalResults';

const LotteryDetailOpening = ({ id: featureId }) => {
    const lottery = get(
        useAppContext(),
        'globalContent.dataService.lotteryDetail',
        []
    );
    const lotteryDetail = lottery.map(lot => {
        const { component: cardComponent, id, winners_table } = lot;
        const Lottery = components[cardComponent];
        return !winners_table ? (
            <TableHorizontalResults key={id} {...lot} />
        ) : (
            <Lottery key={id} isDetail {...lot} />
        );
    });
    return (
        lottery.length && (
            <StaticValidation id={featureId} htmlOnly persistent>
                <div className="lottery-detail-box lay">{lotteryDetail}</div>
            </StaticValidation>
        )
    );
};

LotteryDetailOpening.label = 'LN Loteria Detalle Apertura';

LotteryDetailOpening.propTypes = { id: PropTypes.string.isRequired };

export default LotteryDetailOpening;
