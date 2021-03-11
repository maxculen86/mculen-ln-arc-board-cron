import React from 'react';
import PropTypes from 'fusion:prop-types';
import dateAndTimeUtil, { addHoursAndFormat } from './utils/dateAndTimeUtil';
import '../../../resources/dist/css/ln/components/com-hour.css';

const ComHour = props => {
    const {
        display_date: displayDate,
        labelEdicionImpresa,
        size,
        isUltimasNoticias
    } = props;
    const { text: textEdicionImpresa } = labelEdicionImpresa || {};
    const { time } = !isUltimasNoticias
        ? dateAndTimeUtil(displayDate)
        : dateAndTimeUtil(addHoursAndFormat(3, displayDate));
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
    labelEdicionImpresa: PropTypes.string,
    size: PropTypes.string,
    isUltimasNoticias: PropTypes.boolean
};

ComHour.defaultProps = {
    labelEdicionImpresa: null,
    size: '',
    isUltimasNoticias: false
};

export default ComHour;
