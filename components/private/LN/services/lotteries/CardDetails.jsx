import React from 'react';
import LabelText from './LabelText';
import ResultItem from './ResultItem';
import BallLotteries from './BallLotteries';
import { removeEmptyElements } from './helpers';

function CardDetail({
    isDetail,
    hasExtraResults,
    reorderedResults = [],
    isQuiniela,
    extraResultsModificator = '',
    hasJackpot,
    jackpot = []
}) {
    const filteredJackspot = removeEmptyElements(jackpot) || [];

    return (
        <>
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
                                name: subLottery = '',
                                result: subLotteryResult = [],
                                jackpot: subLotteryJackpot = []
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
            {isDetail && filteredJackspot.length > 0 && (
                <div className="extra-results --jackpot-details">
                    <LabelText
                        text="Jackpot"
                        className="jackpot-text-details"
                    />
                    <div className="jackpot-result-details">
                        {filteredJackspot.map(number => (
                            <BallLotteries
                                key={number}
                                number={number}
                                color="blue"
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}

export default CardDetail;
