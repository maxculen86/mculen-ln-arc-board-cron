/* eslint-disable camelcase */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useAppContext } from 'fusion:context';
import Static from 'fusion:static';
import Text from '../../../private/common/text';
import get from '../../../private/common/utils/get';
import ComLink from '../../../private/common/com-link';
import LotteryCard from '../../../private/LN/services/lotteries/LotteryCard';
import DetailsTable from '../../../private/LN/services/lotteries/DetailsTable';
import TableHorizontalResults from '../../../private/LN/services/lotteries/TableHorizontalResults';

import '../../../../resources/dist/css/ln/pages/lotteries.css';
import {
    games,
    reorderSubLotteries
} from '../../../../content/sources/utils/servicesSource/lottery/_config';

function LotteryDetailOpening() {
    const lottery = get(
        useAppContext(),
        'globalContent.dataService.lotteryDetail',
        []
    );
    const [firstLot = {}] = lottery;
    const { id = '' } = firstLot;
    const getOrder = get(games, `${id}.sublotteriesOrder`, []);
    const reorderedLotteries = reorderSubLotteries(lottery, getOrder);

    const metaData = get(useAppContext(), 'globalContent.metaData', {});
    const { lotteryName = '', completeDay = '' } = metaData;

    return (
        lottery.length && (
            <Static id={id} htmlOnly>
                <Text
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
                    {reorderedLotteries.map(lot => {
                        const { id: lotteryId, winners_table } = lot;
                        return !winners_table ? (
                            <TableHorizontalResults key={lotteryId} {...lot} />
                        ) : (
                            <>
                                <LotteryCard
                                    key={lotteryId}
                                    isDetail
                                    {...lot}
                                />
                                <DetailsTable data={lot} />
                            </>
                        );
                    })}
                </div>
                <Text size="5xs" extraClass="lottery-data-factory">
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
            </Static>
        )
    );
}

LotteryDetailOpening.label = 'LN Loteria Detalle Apertura';

export default LotteryDetailOpening;
