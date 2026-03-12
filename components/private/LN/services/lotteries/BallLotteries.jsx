import React from 'react';
import '../../../../../resources/dist/css/ln/components/ball-lotteries.css';
import setClassName from '../../../common/utils/setClassName';

function BallLotteries({ number, size, color }) {
    const _size = size && `--${size}`;
    const _color = color && `--${color}`;
    const _className = setClassName({
        baseClass: '--twoxs --font-bold ball',
        _size,
        _color
    });

    return <div className={_className}>{number}</div>;
}

export default BallLotteries;
