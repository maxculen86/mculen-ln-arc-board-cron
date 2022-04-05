import React from 'react';
import PropTypes from 'prop-types';

import CardLayout from './CardLayout';
import BallLotteries from './BallLoteries';
import LabelText from './LabelText';
import ResultItem from './ResultItem';
import { setTraditionFirst, hasTraditionalResult } from './utils';

const Brinco = ({ name, vacantPot, date, results, isDetail, link }) => {
    const resultsTomap = setTraditionFirst(results);
    const arrResults = resultsTomap.slice(1, 5);
    if (hasTraditionalResult(isDetail, resultsTomap)) return <></>;
    return (
        <CardLayout title={name} subtitle={date} link={!isDetail && link}>
            <div className="main-result --brinco">
                <div className="box-result --brinco">
                    {(!isDetail ? resultsTomap[0].result : results).map(
                        number => (
                            <BallLotteries
                                key={number}
                                number={number}
                                size="large"
                            />
                        )
                    )}
                </div>
                {!isDetail && vacantPot && (
                    <LabelText text={`Pozo vacante: ${vacantPot}`} />
                )}
            </div>
            <div className="extra-results --brinco">
                {!isDetail &&
                    arrResults.map(({ name: subLottery, result }) => (
                        <ResultItem
                            key={subLottery}
                            text={subLottery}
                            result={result}
                        />
                    ))}
            </div>
        </CardLayout>
    );
};

Brinco.propTypes = {
    results: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.shape({
                name: PropTypes.string,
                winners: PropTypes.string,
                amount: PropTypes.string
            }),
            PropTypes.string
        ])
    ),
    name: PropTypes.string,
    date: PropTypes.string,
    vacantPot: PropTypes.string,
    isDetail: PropTypes.bool,
    link: PropTypes.string
};

Brinco.defaultProps = {
    results: [],
    name: '',
    date: '',
    isDetail: false,
    link: '',
    vacantPot: ''
};

export default Brinco;
