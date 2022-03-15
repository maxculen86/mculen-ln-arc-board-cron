import React from 'react';
import PropTypes from 'prop-types';

import CardLayout from './CardLayout';
import BallLotteries from './BallLoteries';
import LabelText from './LabelText';
import ResultItem from './ResultItem';

import '../../../../../resources/dist/css/ln/components/lotteries.css';

const LotoPlus = ({ name, jackpot, date, results, isDetail, link }) => {
    const arrResults = results.slice(1, 5);

    return (
        <CardLayout
            title={name}
            subtitle={date}
            link={!isDetail && link}
            linkTitle={name}
        >
            <div className="main-result --loto-plus">
                {!isDetail && <LabelText text={results[0].name} />}
                <div className="traditional --loto-plus">
                    <div className="box-result --loto-plus">
                        {results[0].result.map(number => (
                            <BallLotteries
                                key={number}
                                number={number}
                                size="large"
                            />
                        ))}
                    </div>
                    {!isDetail && (
                        <div className="jackpot-result">
                            {jackpot.map(number => (
                                <BallLotteries
                                    key={number}
                                    number={number}
                                    size="large"
                                    color="blue"
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {!isDetail && (
                <div className="extra-results --loto-plus">
                    {arrResults.map(({ nameGame, result, jackpotResult }) => (
                        <ResultItem
                            key={nameGame}
                            text={name}
                            result={[...result, ...jackpotResult]}
                        />
                    ))}
                </div>
            )}
            {isDetail && (
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
                                size="large"
                                color="blue"
                            />
                        ))}
                    </div>
                </div>
            )}
        </CardLayout>
    );
};

LotoPlus.propTypes = {
    results: PropTypes.arrayOf,
    name: PropTypes.string,
    date: PropTypes.string,
    jackpot: PropTypes.string,
    isDetail: PropTypes.bool,
    link: PropTypes.string
};

LotoPlus.defaultProps = {
    results: [],
    name: '',
    date: '',
    isDetail: false,
    link: '',
    jackpot: ''
};

export default LotoPlus;
