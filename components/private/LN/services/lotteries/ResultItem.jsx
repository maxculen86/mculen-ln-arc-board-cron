import { React } from 'react';
import PropTypes from 'prop-types';
import Text from '../../../../private/common/text';

const ResultItem = ({ text, result }) => {
    return (
        <div className="result-item">
            <Text size="5xs" className="labeled">
                {text}
            </Text>
            <Text className="results-secondary" weight="bold" size="5xs">
                {result.map(number => (
                    <Text key={number}>{number}</Text>
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
