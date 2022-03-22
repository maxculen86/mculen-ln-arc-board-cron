import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import { games } from '../../../../content/sources/utils/servicesSource/lottery/_config';
import StaticValidation from '../../../private/common/staticValidation';
import get from '../../../private/common/utils/get';

import '../../../../resources/dist/css/ln/components/lotteries.css';
import '../../../../resources/dist/css/ln/components/result-item.css';
import '../../../../resources/dist/css/ln/components/label-text.css';
import '../../../../resources/dist/css/ln/components/ball-lotteries.css';

const LotteryGrid = ({ id: featureId }) => {
    // const lotteries = get(useAppContext(), 'globalContent.dataService.lotteries', []);

    const outputApiResponse = [
        {
            name: 'LotoPlus',
            id: 'Loto',
            link: 'kkk',
            date: '00/00/0000',
            jackpot: ['1', '2'],
            estimated_pot: '$900000',
            results: [
                {
                    name: 'loto loco',
                    result: ['01', '02', '04', '03', '05', '06'],
                    jackpot: ['1', '2'],
                    date: '00/00/0000'
                },
                {
                    name: 'Tradicional',
                    result: ['01', '02', '04', '03', '05', '06'],
                    jackpot: ['1', '2'],
                    date: '00/00/0000'
                },
                {
                    name: 'LotoPlus junior',
                    result: ['01', '02', '04', '03', '05', '06'],
                    jackpot: ['1', '2', '3', '4'],
                    date: '00/00/0000'
                }
            ]
        },
        {
            name: 'LotoPlus',
            id: 'Loto',
            link: 'kkk',
            date: '00/00/0000',
            jackpot: ['1', '2'],
            estimated_pot: '$900000',
            results: [
                {
                    name: 'loto loco',
                    result: ['01', '02', '04', '03', '05', '06'],
                    jackpot: ['1', '2'],
                    date: '00/00/0000'
                },
                {
                    name: 'Tradicional',
                    result: ['01', '02', '04', '03', '05', '06'],
                    jackpot: ['1', '2'],
                    date: '00/00/0000'
                },
                {
                    name: 'LotoPlus junior',
                    result: ['01', '02', '04', '03', '05', '06'],
                    jackpot: ['1', '2', '3', '4'],
                    date: '00/00/0000'
                }
            ]
        }
    ];
    const { dataService: { lotteries = [] } = {} } = outputApiResponse;
    const { length: hasLotteries } = lotteries;
    return hasLotteries ? (
        <StaticValidation id={featureId} htmlOnly persistent>
            <div className="row-gap-3">
                {lotteries.map((lottery, i) => {
                    const { id } = lottery;
                    const { component: Component } = games[id];
                    return <Component {...lottery} />;
                })}
            </div>
        </StaticValidation>
    ) : (
        <></>
    );
};

LotteryGrid.label = 'LN Loteria Home Grilla';

LotteryGrid.propTypes = { id: PropTypes.string.isRequired };

export default LotteryGrid;
