/* eslint-disable camelcase */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import StaticValidation from '../../../private/common/staticValidation';
import DetailsTable from '../../../private/LN/services/lotteries/DetailsTable';
import get from '../../../private/common/utils/get';
import { components } from '../lotteryGrid/default';
import TableHorizontalResults from '../../../private/LN/services/lotteries/TableHorizontalResults';
import { reorderQuini6 } from '../../../private/LN/services/lotteries/utils';

const LotteryDetailOpening = ({ id: featureId }) => {
    const lottery = get(
        useAppContext(),
        'globalContent.dataService.lotteryDetail',
        []
    );
    const [firstLot = ''] = lottery;
    if (firstLot.id === 'Quini_6') reorderQuini6(lottery);
    return (
        lottery.length && (
            <StaticValidation id={featureId} htmlOnly persistent>
                <div className="lottery-detail-box lay">
                    {lottery.map(lot => {
                        const {
                            component: cardComponent,
                            id,
                            winners_table
                        } = lot;
                        const Lottery = components[cardComponent];
                        return (
                            <>
                                {!winners_table ? (
                                    <TableHorizontalResults key={id} {...lot} />
                                ) : (
                                    <Lottery key={id} isDetail {...lot} />
                                )}
                                <DetailsTable data={lot} />
                            </>
                        );
                    })}
                </div>
            </StaticValidation>
        )
    );
};

LotteryDetailOpening.label = 'LN Loteria Detalle Apertura';

LotteryDetailOpening.propTypes = { id: PropTypes.string.isRequired };

export default LotteryDetailOpening;
