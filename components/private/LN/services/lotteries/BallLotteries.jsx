import React from 'react';
import PropTypes from 'prop-types';
import '../../../../../resources/dist/css/ln/components/ball-lotteries.css';

const BallLotteries = ({ number, size, color }) => {
    return (
        <div
            className={`--twoxs --font-bold ball${size &&
                ` --${size}`}${color && ` --${color}`}`}
        >
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
