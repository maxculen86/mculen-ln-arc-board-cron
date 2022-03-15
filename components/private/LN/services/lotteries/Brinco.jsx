import React from 'react';
import PropTypes from 'prop-types';

import CardLayout from './CardLayout';
import BallLotteries from './BallLoteries';
import LabelText from './LabelText';
import ResultItem from './ResultItem';

const Brinco = ({ name, estimatedPot, date, results, isDetail, link }) => {
    const arrResults = results.slice(1, 5);

    return (
        <CardLayout
            title={name}
            subtitle={date}
            link={!isDetail && link}
            linkTitle={name}
        >
            <div className="main-result --brinco">
                <div className="box-result --brinco">
                    {results[0].result.map(number => (
                        <BallLotteries
                            key={number}
                            number={number}
                            size="large"
                        />
                    ))}
                </div>
                {!isDetail && (
                    <LabelText text={`Pozo vacante: ${estimatedPot}`} />
                )}
            </div>
            <div className="extra-results --brinco">
                {!isDetail &&
                    arrResults.map(({ text, result }) => (
                        <ResultItem key={text} text={text} result={result} />
                    ))}
            </div>
        </CardLayout>
    );
};

Brinco.propTypes = {
    results: PropTypes.arrayOf,
    name: PropTypes.string,
    date: PropTypes.string,
    estimatedPot: PropTypes.string,
    isDetail: PropTypes.bool,
    link: PropTypes.string
};

Brinco.defaultProps = {
    results: [],
    name: '',
    date: '',
    isDetail: false,
    link: '',
    estimatedPot: ''
};

export default Brinco;
