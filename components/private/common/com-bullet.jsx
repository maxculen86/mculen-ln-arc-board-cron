import React from 'react';
import PropTypes from 'fusion:prop-types';
import '../../../resources/dist/css/ln/components/com-bullet.css';
import ComIco from './com-icon';

const ComBullet = props => {
    const { size, sizeBullet } = props;
    const color = {
        color: '#cccccc'
    };

    return (
        <div className="com-bullet">
            <ComIco
                style={color}
                iconName="bullet-xs"
                sizeBullet={sizeBullet}
            />
        </div>
    );
};

export default ComBullet;
