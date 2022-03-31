import React from 'react';
import PropTypes from 'prop-types';

import CardLayout from './CardLayout';
import BallLotteries from './BallLoteries';
import LabelText from './LabelText';

const QuinielaPoceada = ({ name, date, results, isDetail, link, letters }) => {
    return (
        <CardLayout title={name} subtitle={date} link={!isDetail && link}>
            <div className={`main-result ${isDetail && '--quiniela-poceada'}`}>
                <div className="box-result --grid-5-columns">
                    {(!isDetail ? results[0].result : results).map(number => (
                        <BallLotteries
                            key={number}
                            number={number}
                            size="large"
                        />
                    ))}
                </div>
                <LabelText text={`Letras: ${letters.join(',')}`} />
            </div>
        </CardLayout>
    );
};

QuinielaPoceada.propTypes = {
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
    link: PropTypes.string,
    letters: PropTypes.arrayOf(PropTypes.string)
};

QuinielaPoceada.defaultProps = {
    results: [],
    name: '',
    date: '',
    isDetail: false,
    link: '',
    letters: []
};

export default QuinielaPoceada;
