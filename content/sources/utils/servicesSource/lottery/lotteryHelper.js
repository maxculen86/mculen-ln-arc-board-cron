/* eslint-disable camelcase */
import transformISODate from '../../../../../components/private/common/utils/transformISODate';
import { games, LOCATIONS } from './_config';
import { getTodayDateForAcuDolar } from '../../../../../components/private/common/utils/dateAndTimeUtil';

export const transformLotteryDetail = data => data;

const getValue = (input, key) => input.filter(e => e.id === key);

export const transformLotteryHome = data =>
    Object.keys(games).reduce((acc, lottery) => {
        const newValue = getValue(data, lottery);
        const [
            {
                name = '',
                date = '0000-00-00T00:00:00',
                additional_properties = {}
            } = {}
        ] = newValue;
        const { letters = [], estimated_pot = [] } = additional_properties;
        newValue.length &&
            acc.push({
                name,
                date: transformISODate(date),
                ...(letters.length && {
                    letters: letters.shift().split(' ')
                }),
                ...(estimated_pot.length && {
                    estimated_pot: estimated_pot.shift()
                }),
                results: transformResult(newValue)
            });
        return acc;
    }, []);

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

const formatter = new Intl.ListFormat('es', {
    style: 'long',
    type: 'conjunction'
});

const gamesQtyText = {
    0: '',
    1: 'y su modalidad:',
    default: 'y sus modalidades:'
};

export const metaDataLotteryDetail = (dataService, serviceType) => {
    const { items } = dataService;
    const { name: lotteryName, lottery_draw_number = '' } = items[0];
    const gamesModes = extractGameTypes(dataService, serviceType);

    const singularOrPluralSelector =
        gamesModes.length >= 2 ? 'default' : gamesModes.length;

    const modalities = `${
        gamesQtyText[singularOrPluralSelector]
    } ${formatter.format(gamesModes)}`;

    return {
        lotteryName,
        lotteryNumber: lottery_draw_number,
        modalities,
        date: getTodayDateForAcuDolar(),
        location: LOCATIONS[lotteryName]
    };
};
