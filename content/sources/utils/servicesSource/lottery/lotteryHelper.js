/* eslint-disable camelcase */
import transformISODate from '../../../../../components/private/common/utils/transformISODate';
import { games, LOCATIONS } from './_config';
import get from '../../../../../components/private/common/utils/get';

const getValue = (input, key) => input.filter(e => e.id === key);

export const transformLotteryDetail = data => {
    const [firstLottery = {}] = data;
    const newRules = get(games, `${firstLottery.id}.rules`, []);
    const lotteryDetail = data.map(lottery => {
        const {
            name = '',
            id = '',
            lottery_draw_id = '',
            date = '',
            additional_properties = {},
            prizes = [],
            results = []
        } = lottery;
        const {
            letters = [],
            jackpot = [],
            estimated_pot = [],
            meaning = ''
        } = additional_properties;
        const winnersTable = getWinnersTable(prizes);
        const winnersCarton = getWinnersCarton(prizes);
        return {
            name,
            id,
            ...(lottery_draw_id && { lottery_draw_id }),
            date: transformISODate(date, 'day dd/mm/yyyy'),
            ...(letters.length && {
                letters: letters.shift()
            }),
            ...(jackpot.length && {
                jackpot
            }),
            ...(meaning && {
                meaning
            }),
            ...(estimated_pot.length && {
                estimatedPot: estimated_pot.shift()
            }),
            results,
            ...(winnersTable.length && { winners_table: winnersTable }),
            ...(winnersCarton.length && {
                winner_carton: winnersCarton
            })
        };
    });
    return {
        lotteryDetail,
        ...(newRules.length && { rules: newRules })
    };
};

const getLotteryName = lotteries =>
    lotteries
        .filter(item => item !== 'aciertos' && item !== 'jackpot')
        .join('');

const getWinnersTable = prizes =>
    prizes
        .filter(prize => prize.name !== 'carton')
        .map(prize => {
            const { name: prizeName = '', winners = '', amount = '' } = prize;
            const newPrizeName = prizeName.split(' ');
            return {
                name:
                    newPrizeName.length < 2
                        ? newPrizeName.shift()
                        : getLotteryName(newPrizeName),
                ...(winners && { winners }),
                ...(amount && { amount })
            };
        });

const getWinnersCarton = prizes =>
    prizes
        .filter(prize => prize.name === 'carton')
        .map(prize => {
            const { winners = '', amount = '' } = prize;
            return {
                numbers: winners,
                amount
            };
        });

export const transformLotteryHome = data => ({
    lotteries: Object.keys(games).reduce((acc, lottery) => {
        const newValue = getValue(data, lottery);
        const cardComponent = get(games, `${lottery}.component`, '');
        const url = get(games, `${lottery}.url`, '');
        const [
            {
                id,
                name = '',
                date = '0000-00-00T00:00:00',
                additional_properties = {}
            } = {}
        ] = newValue;
        const { letters = [], estimated_pot = [] } = additional_properties;
        newValue.length &&
            acc.push({
                id,
                name,
                component: cardComponent,
                date: transformISODate(date),
                ...(url && { link: url }),
                ...(letters.length && {
                    letters: letters.shift().split(' ')
                }),
                ...(estimated_pot.length && {
                    estimatedPot: estimated_pot.shift()
                }),
                results: transformResult(newValue)
            });
        return acc;
    }, [])
});

const transformResult = values =>
    values &&
    values.map(item => {
        const {
            lottery_draw_name = 'Tradicional',
            date = '',
            results = [],
            additional_properties = {}
        } = item;
        const { jackpot = [] } = additional_properties;
        return {
            name: lottery_draw_name,
            date: transformISODate(date, 'dd/mm'),
            result: results,
            ...(jackpot.length && {
                jackpot
            })
        };
    });

const extractGameTypes = (dataService, serviceType) => {
    const { items } = dataService;
    return serviceType === 'detalle-loterias'
        ? items.reduce((acc, lottery) => {
              lottery.lottery_draw_id && acc.push(lottery.lottery_draw_id);
              return acc;
          }, [])
        : [];
};

const gamesQtyText = {
    0: '',
    1: 'y su modalidad: ',
    default: 'y sus modalidades: '
};

export const metaDataLotteryDetail = (dataService, serviceType) => {
    const { items } = dataService;
    const { name: lotteryName, lottery_draw_number = '', date = '' } = items[0];
    const gamesModes = extractGameTypes(dataService, serviceType);
    const completeDay = transformISODate(date, 'dia de mes');

    const singularOrPluralSelector =
        gamesModes.length >= 2 ? 'default' : gamesModes.length;

    const modalities = `${
        gamesQtyText[singularOrPluralSelector]
    }${gamesModes.join(', ').replace(/, ([^,]*)$/, ' y $1')}`;

    return {
        lotteryName,
        lotteryNumber: lottery_draw_number,
        modalities,
        completeDay,
        location: LOCATIONS[lotteryName] || LOCATIONS.default
    };
};
