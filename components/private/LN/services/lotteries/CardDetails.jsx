import React from 'react';
import PropTypes from 'prop-types';
import LabelText from './LabelText';
import ResultItem from './ResultItem';
import BallLotteries from './BallLotteries';

const CardDetail = ({
    isDetail,
    hasExtraResults,
    reorderedResults,
    isQuiniela,
    extraResultsModificator,
    hasJackpot,
    jackpot
}) => {
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
        </>
    );
};

CardDetail.propTypes = {
    isDetail: PropTypes.bool,
    hasExtraResults: PropTypes.bool,
    reorderedResults: PropTypes.arrayOf(PropTypes.string),
    isQuiniela: PropTypes.bool,
    extraResultsModificator: PropTypes.string,
    hasJackpot: PropTypes.bool,
    jackpot: PropTypes.string
};

CardDetail.defaultProps = {
    hasExtraResults: false,
    reorderedResults: [],
    isQuiniela: PropTypes.bool,
    extraResultsModificator: PropTypes.string,
    hasJackpot: PropTypes.bool,
    jackpot: '',
    isDetail: false
};

export default CardDetail;
