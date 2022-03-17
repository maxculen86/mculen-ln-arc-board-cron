/* eslint-disable camelcase */
import transformISODate from '../../../../../components/private/common/utils/transformISODate';
import { games } from './_config';

export const transformLotteryDetail = data => {
    const newLotteries = data.map(lottery => {
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
        const winnersTable = prizes
            .filter(prize => prize.name !== 'carton')
            .map(prize => {
                const {
                    name: prizeName = '',
                    winners = '',
                    amount = ''
                } = prize;
                const newPrizeName = prizeName.split(' ');
                return {
                    name:
                        newPrizeName.length < 2
                            ? newPrizeName.shift()
                            : newPrizeName
                                  .filter(
                                      item =>
                                          item !== 'aciertos' &&
                                          item !== 'jackpot'
                                  )
                                  .join(''),
                    ...(winners && { winners }),
                    ...(amount && { amount })
                };
            });
        const winnersCarton = prizes
            .filter(prize => prize.name === 'carton')
            .map(prize => {
                const { winners = '', amount = '' } = prize;
                return {
                    numbers: winners,
                    amount
                };
            });
        return {
            name,
            id,
            ...(lottery_draw_id && { lottery_draw_id }),
            date,
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
                estimated_pot: estimated_pot.shift()
            }),
            results,
            ...(winnersTable.length && { winners_table: winnersTable }),
            ...(winnersCarton.length && {
                winner_carton: winnersCarton
            })
        };
    });
    return newLotteries;
};

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
