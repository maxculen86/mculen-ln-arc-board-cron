import React from 'react';
import PropTypes from 'prop-types';

const BallLotteries = ({ number, size, color }) => {
    return (
        <div className={`--twoxs --font-bold ball --${size} --${color}`}>
            {number}
        </div>
    );
};

BallLotteries.propTypes = {
    size: PropTypes.string,
    number: PropTypes.string,
    color: PropTypes.string
};

BallLotteries.defaultProps = {
    size: '',
    number: '',
    color: ''
};

export default BallLotteries;
