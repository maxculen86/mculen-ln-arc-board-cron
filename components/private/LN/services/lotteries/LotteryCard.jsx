import React from 'react';
import PropTypes from 'prop-types';
import get from '../../../common/utils/get';
import '../../../../../resources/dist/css/ln/components/lottery-card.css';

import {
    games,
    reorderSubLotteries
} from '../../../../../content/sources/utils/servicesSource/lottery/_config';

import CardLayout from './CardLayout';
import LabelText from './LabelText';
import Text from '../../../common/text';
import ResultItem from './ResultItem';
import BallLotteries from './BallLotteries';

const LotteryCard = ({
    id,
    name,
    date,
    link,
    isDetail,
    results,
    letters,
    meaning,
    vacantPot,
    jackpot
}) => {
    const getDate = get(games, `${id}.getLotteryDate`, () => date);
    const getOrder = get(games, `${id}.sublotteriesOrder`, []);
    const isQuiniela = get(games, `${id}.isQuiniela`, false);
    const boxResultClass = get(games, `${id}.boxResultClass`, '');
    const showVacantPot = get(games, `${id}.showVacantPot`, false);
    const showLetters = get(games, `${id}.showLetters`, false);
    const showFirstLotteryName = get(
        games,
        `${id}.showFirstLotteryName`,
        false
    );
    const hasJackpot = get(games, `${id}.hasJackpot`, false);
    const hasExtraResults = get(games, `${id}.hasExtraResults`, false);
    const extraResultsModificator = get(
        games,
        `${id}.extraResultsModificator`,
        ''
    );
    const isQuini6 = boxResultClass.includes('--quini-6');

    const reorderedResults = reorderSubLotteries(results, getOrder);
    const [firstResult = {}] = reorderedResults;
    const {
        result = [],
        name: firstResultName = '',
        jackpot: firstResultJackpot = []
    } = firstResult;
    const [resultFirstChild = ''] = result;

    return (
        <CardLayout
            title={name}
            subtitle={getDate(date, firstResultName)}
            link={!isDetail && link}
        >
            <div className="main-result" data-testid={`${id}-test`}>
                {!isDetail && showFirstLotteryName && (
                    <LabelText text={firstResultName} />
                )}
                {isQuiniela && (
                    <Text weight="bold" size="2xl">
                        {resultFirstChild}
                    </Text>
                )}
                {!isQuiniela && !hasJackpot && (
                    <div
                        className={`${boxResultClass}${
                            isDetail && isQuini6 ? ' --detail' : ''
                        }${name === 'Pozo extra' ? ' --extra-pot' : ''}`}
                    >
                        {(!isDetail ? result : results).map(number => (
                            <BallLotteries
                                key={number}
                                number={number}
                                size={isQuini6 && !isDetail ? 'small' : ''}
                            />
                        ))}
                    </div>
                )}
                {isDetail && hasJackpot && (
                    <div
                        className={`${boxResultClass}${
                            isDetail ? '-detail' : ''
                        }`}
                    >
                        {(!isDetail ? result : results).map(number => (
                            <BallLotteries key={number} number={number} />
                        ))}
                    </div>
                )}
                {!isDetail && hasJackpot && (
                    <div className="traditional">
                        <div className={boxResultClass}>
                            {(!isDetail ? result : results).map(number => (
                                <BallLotteries key={number} number={number} />
                            ))}
                        </div>
                        <div className="jackpot-result">
                            {firstResultJackpot.map(number => (
                                <BallLotteries
                                    key={number}
                                    number={number}
                                    color="blue"
                                />
                            ))}
                        </div>
                    </div>
                )}
                {meaning && <LabelText text={meaning} />}
                {!isDetail && showVacantPot && (
                    <LabelText text={`Pozo vacante: ${vacantPot}`} />
                )}
                {showLetters && <LabelText text={`Letras: ${letters}`} />}
            </div>
            {!isDetail && hasExtraResults && (
                <div className="extra-results">
                    {reorderedResults.slice(1, 5).map(item => (
                        <ResultItem
                            key={item.name}
                            text={
                                isQuiniela
                                    ? `${item.date} - ${item.name}`
                                    : item.name
                            }
                            result={
                                !isQuiniela ? item.result : [item.result[0]]
                            }
                            className={extraResultsModificator}
                        />
                    ))}
                </div>
            )}
            {!isDetail && hasJackpot && (
                <div className="extra-results --loto-plus">
                    {reorderedResults
                        .slice(1, 5)
                        .map(
                            ({
                                name: subLottery,
                                result: subLotteryResult,
                                jackpot: subLotteryJackpot
                            }) => (
                                <ResultItem
                                    key={subLottery}
                                    text={subLottery}
                                    result={[
                                        ...subLotteryResult,
                                        ...subLotteryJackpot
                                    ]}
                                    className={extraResultsModificator}
                                />
                            )
                        )}
                </div>
            )}
            {isDetail && jackpot && (
                <div className="extra-results --jackpot-details">
                    <LabelText
                        text="Jackpot"
                        className="jackpot-text-details"
                    />
                    <div className="jackpot-result-details">
                        {jackpot.map(number => (
                            <BallLotteries
                                key={number}
                                number={number}
                                color="blue"
                            />
                        ))}
                    </div>
                </div>
            )}
        </CardLayout>
    );
};

LotteryCard.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    date: PropTypes.string,
    link: PropTypes.string,
    letters: PropTypes.string,
    meaning: PropTypes.string,
    jackpot: PropTypes.string,
    vacantPot: PropTypes.string,
    isDetail: PropTypes.bool,
    results: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            date: PropTypes.string,
            result: PropTypes.arrayOf(PropTypes.string)
        })
    )
};

LotteryCard.defaultProps = {
    id: '',
    name: '',
    date: '',
    link: '',
    letters: '',
    meaning: '',
    jackpot: '',
    vacantPot: '',
    results: [],
    isDetail: false
};

export default LotteryCard;
