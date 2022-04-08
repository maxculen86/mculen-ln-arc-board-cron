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
import {
    reorderSubLotteries,
    quini6Order,
    lotoPlusOrder
} from '../../../private/LN/services/lotteries/utils';
import ComLink from '../../../private/common/com-link';
import Text from '../../../private/common/text';

import '../../../../resources/dist/css/ln/pages/lotteries.css';

const LotteryDetailOpening = ({ id: featureId }) => {
    const lottery = get(
        useAppContext(),
        'globalContent.dataService.lotteryDetail',
        []
    );
    const [firstLot = {}] = lottery;
    const metaData = get(useAppContext(), 'globalContent.metaData', {});
    const { lotteryName = '', completeDay = '' } = metaData;

    if (firstLot.id === 'Quini_6') reorderSubLotteries(lottery, quini6Order);
    if (firstLot.id === 'Loto') reorderSubLotteries(lottery, lotoPlusOrder);
    return (
        lottery.length && (
            <StaticValidation id={featureId} htmlOnly persistent>
                <Text
                    font="sueca"
                    size="xs"
                    weight="regular"
                    tag="h2"
                    extraClass="com-paragraph"
                >
                    {`Últimos resultados en ${lotteryName}, ${completeDay} de ${new Date().getFullYear()}`}
                </Text>
                <div
                    className={`lotteries ${
                        !lottery[0].winners_table
                            ? 'quinielas-detail-layout row-gap-tablet-2'
                            : 'lottery-detail-box'
                    }`}
                >
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
                                    <>
                                        <Lottery key={id} isDetail {...lot} />
                                        <DetailsTable data={lot} />
                                    </>
                                )}
                            </>
                        );
                    })}
                    <Text size="5xs">
                        Información provista por
                        {`${' '}`}
                        <ComLink
                            link="https://www.datafactory.la/"
                            target="_blank"
                            rel="nofollow"
                            title="Ir a Data Factory"
                        >
                            Data Factory
                        </ComLink>
                    </Text>
                </div>
            </StaticValidation>
        )
    );
};

LotteryDetailOpening.label = 'LN Loteria Detalle Apertura';

LotteryDetailOpening.propTypes = { id: PropTypes.string.isRequired };

export default LotteryDetailOpening;
