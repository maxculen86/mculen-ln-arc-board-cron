import React from 'react';
import PropTypes from 'fusion:prop-types';
import dateAndTimeUtil from '../common/utils/dateAndTimeUtil';
import '../../../resources/dist/css/ln/components/com-hour.css';

const ComHour = ({ display_date, labelEdicionImpresa, size }) => {
    const { text: textEdicionImpresa } = labelEdicionImpresa || {};
    const { time } = dateAndTimeUtil(display_date);
    return (
        <>
            {textEdicionImpresa !== 'Impresa' ? (
                <time className={`com-hour ${size || '--twoxs'}`}>{time}</time>
            ) : (
                <></>
            )}
        </>
    );
};

ComHour.propTypes = {
    display_date: PropTypes.string.isRequired,
    labelEdicionImpresa: PropTypes.string
};

export default ComHour;
