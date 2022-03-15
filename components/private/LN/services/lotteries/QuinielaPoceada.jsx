import React from 'react';
import PropTypes from 'prop-types';

import CardLayout from './CardLayout';
import BallLotteries from './BallLoteries';
import LabelText from './LabelText';

import '../../../../../resources/dist/css/ln/components/lotteries.css';

const QuinielaPoceada = ({ name, date, results, isDetail, link, letters }) => {
    return (
        <CardLayout
            title={name}
            subtitle={date}
            link={!isDetail && link}
            linkTitle={name}
        >
            <div className={`main-result ${isDetail && '--quiniela-poceada'}`}>
                <div className="box-result --grid-5-columns">
                    {results[0].result.map(number => (
                        <BallLotteries
                            key={number}
                            number={number}
                            size="large"
                        />
                    ))}
                </div>
                <LabelText text={`Letras: ${letters}`} />
            </div>
        </CardLayout>
    );
};

QuinielaPoceada.propTypes = {
    results: PropTypes.arrayOf,
    name: PropTypes.string,
    date: PropTypes.string,
    isDetail: PropTypes.bool,
    link: PropTypes.string,
    letters: PropTypes.string
};

QuinielaPoceada.defaultProps = {
    results: [],
    name: '',
    date: '',
    isDetail: false,
    link: '',
    letters: ''
};

export default QuinielaPoceada;
