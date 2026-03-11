import React from 'react';
import Text from '../../../common/text';
import '../../../../../resources/dist/css/ln/components/result-item.css';

function ResultItem({ text, result = [], className = '' }) {
    return (
        <div className="result-item">
            <Text size="5xs" extraClass="labeled" text={text} />
            <div className={`results-secondary ${className}`}>
                {result.map(number => (
                    <Text key={number} text={number} size="4xs" weight="bold" />
                ))}
            </div>
        </div>
    );
}

export default ResultItem;
