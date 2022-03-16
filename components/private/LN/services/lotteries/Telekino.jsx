import React from 'react';
import PropTypes from 'prop-types';

import CardLayout from './CardLayout';
import BallLotteries from './BallLoteries';
import LabelText from './LabelText';
import ResultItem from './ResultItem';
import { setTraditionFirst } from './utils';

import '../../../../../resources/dist/css/ln/components/lotteries.css';

const Telekino = ({ name, date, results, isDetail, link }) => {
    const resultsTomap = setTraditionFirst(results);
    const arrResults = resultsTomap.slice(1, 5);

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
                <div className={`traditional ${isDetail && 'detail'}`}>
                    {resultsTomap[0].result.map(number => (
                        <BallLotteries
                            key={number}
                            number={number}
                            size="small"
                        />
                    ))}
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
    results: PropTypes.arrayOf,
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
