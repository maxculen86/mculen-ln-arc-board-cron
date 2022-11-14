import React from 'react';
import PropTypes from 'prop-types';
import '../../../../../resources/dist/css/ln/components/ball-lotteries.css';
import setClassName from '../../../common/utils/setClassName';

const BallLotteries = ({ number, size, color }) => {
    const _size = size && `--${size}`;
    const _color = color && `--${color}`;
    const _className = setClassName({
        baseClass: '--twoxs --font-bold ball',
        _size,
        _color
    });

    return <div className={_className}>{number}</div>;
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
