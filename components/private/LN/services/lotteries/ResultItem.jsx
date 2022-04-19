import React from 'react';
import PropTypes from 'prop-types';
import Text from '../../../common/text';
import '../../../../../resources/dist/css/ln/components/result-item.css';

const ResultItem = ({ text, result, className }) => {
    return (
        <div className={`result-item${` ${className}`}`}>
            <Text size="5xs" extraClass="labeled" text={text} />
            <div className="results-secondary">
                {result.map(number => (
                    <Text key={number} text={number} size="4xs" weight="bold" />
                ))}
            </div>
        </div>
    );
};

ResultItem.propTypes = {
    text: PropTypes.string,
    result: PropTypes.arrayOf,
    className: PropTypes.string
};

ResultItem.defaultProps = {
    text: '',
    result: [],
    className: ''
};
export default ResultItem;
