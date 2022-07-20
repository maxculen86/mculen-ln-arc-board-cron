/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import Text from '../../../common/text';
import get from '../../../common/utils/get';

import '../../../../../resources/dist/css/ln/components/table-horizontal-results.css';

const TableHorizontalResults = ({
    id,
    className,
    results,
    date,
    letters,
    isMeaning,
    name,
    meaning
}) => {
    const classes = `table-horizontal-results ${className}`;
    const formatIndex = index => (index < 10 ? `0${index}` : index);
    const meaningNumber = get(results, '[0].length') && results[0].slice(-2);
    const meaningClass = isMeaning ? '--meaning-table' : '';

    return (
        <div className={classes} data-testid={`${id}-test`}>
            {!isMeaning && (
                <div className="header-table">
                    <Text
                        tag="h2"
                        extraClass="title-header-table"
                        weight="bold"
                        size="4xs"
                    >
                        {`${name} - ${date}`}
                    </Text>
                    <div className="sub-header-table">
                        {meaningNumber && (
                            <Text weight="bold" size="4xs">
                                A la Cabeza:
                                <Text weight="bold" size="large">
                                    {` ${meaningNumber} `}
                                </Text>
                                {meaning}
                            </Text>
                        )}
                        {letters.length !== 0 && (
                            <Text weight="bold" size="4xs">
                                {`Letras: ${letters}`}
                            </Text>
                        )}
                    </div>
                </div>
            )}
            <div className={`body-table ${meaningClass}`}>
                {results.map((number, index) => (
                    <div className={`number-box ${meaningClass}`} key={number}>
                        <Text
                            size="4xs"
                            extraClass={`numerator-table ${meaningClass}`}
                        >
                            {formatIndex(isMeaning ? index : index + 1)}
                        </Text>
                        <Text
                            key={number}
                            size="4xs"
                            extraClass={`number-table-horizontal ${meaningClass}`}
                        >
                            {number}
                        </Text>
                    </div>
                ))}
            </div>
        </div>
    );
};

TableHorizontalResults.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    date: PropTypes.string,
    letters: PropTypes.arrayOf(PropTypes.string),
    isMeaning: PropTypes.bool,
    name: PropTypes.string,
    meaning: PropTypes.string,
    results: PropTypes.arrayOf(PropTypes.string)
};

TableHorizontalResults.defaultProps = {
    id: '',
    className: '',
    date: '',
    letters: [],
    isMeaning: false,
    name: '',
    meaning: '',
    results: []
};

export default TableHorizontalResults;
