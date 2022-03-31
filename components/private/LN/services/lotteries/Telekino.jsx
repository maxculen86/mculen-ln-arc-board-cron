import React from 'react';
import PropTypes from 'prop-types';

import CardLayout from './CardLayout';
import BallLotteries from './BallLoteries';
import LabelText from './LabelText';
import ResultItem from './ResultItem';
import { setTraditionFirst, hasTraditionalResult } from './utils';

const Telekino = ({ name, date, results, isDetail, link }) => {
    const resultsTomap = setTraditionFirst(results);
    const arrResults = resultsTomap.slice(1, 5);
    if (hasTraditionalResult(isDetail, resultsTomap)) return <></>;
    return (
        <CardLayout
            title={name}
            subtitle={date}
            link={!isDetail && link}
            linkTitle={name}
        >
            <div
                className={`main-result --telekino ${isDetail && '--detalle'}`}
            >
                {!isDetail && <LabelText text={resultsTomap[0].name} />}
                <div
                    className={`box-result --grid-5-columns ${isDetail &&
                        'detail'}`}
                >
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
            </div>
            {!isDetail && (
                <div className="extra-results">
                    {arrResults.map(item => (
                        <ResultItem
                            key={item.name}
                            text={item.name}
                            result={item.result}
                        />
                    ))}
                </div>
            )}
        </CardLayout>
    );
};

Telekino.propTypes = {
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
    isDetail: PropTypes.bool,
    link: PropTypes.string
};

Telekino.defaultProps = {
    results: [],
    name: '',
    date: '',
    isDetail: false,
    link: ''
};

export default Telekino;
