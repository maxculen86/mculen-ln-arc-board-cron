import React from 'react';
import PropTypes from 'prop-types';
import Text from '../../../common/text';
import '../../../../../resources/dist/css/ln/components/result-item.css';

const ResultItem = ({ text, result }) => {
    return (
        <div className="result-item">
            <Text size="5xs" extraClass="labeled" text={text} />
            <Text extraClass="results-secondary" weight="bold" size="4xs">
                {result.map(number => (
                    <Text key={number} text={number} />
                ))}
            </Text>
        </div>
    );
};

ResultItem.propTypes = {
    text: PropTypes.string,
    result: PropTypes.arrayOf
};

ResultItem.defaultProps = {
    text: '',
    result: []
};

export default ResultItem;
