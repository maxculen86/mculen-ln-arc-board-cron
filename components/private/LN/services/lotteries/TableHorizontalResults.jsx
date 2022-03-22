import React from 'react';
import PropTypes from 'prop-types';
import Text from '../../../common/text';

const TableHorizontalResults = ({
    className,
    results,
    date,
    letters,
    isMeaning,
    lotteryDrawId,
    meaning
}) => {
    const classes = `table-horizontal-results ${className}`;
    const formatIndex = index => (index < 10 ? `0${index}` : index);
    const meaningNumber = results[0].slice(2, 4);

    return (
        <div className={classes}>
            {!isMeaning && (
                <div className="header-table">
                    <Text
                        extraClass="title-header-table"
                        weight="bold"
                        size="4xs"
                    >
                        {`${lotteryDrawId} - ${date}`}
                    </Text>
                    <div className="sub-header-table">
                        <Text weight="bold" size="4xs">
                            A la Cabeza:
                            <Text weight="bold" size="l">
                                {meaningNumber}
                            </Text>
                            {meaning}
                        </Text>
                        {letters && (
                            <Text weight="bold" size="4xs">
                                {`Letras: ${letters}`}
                            </Text>
                        )}
                    </div>
                </div>
            )}
            <div className={`body-table ${isMeaning && '--meaning-table'}`}>
                {results.map((number, index) => (
                    <div
                        className={`number-box ${isMeaning &&
                            '--meaning-table'}`}
                    >
                        <Text
                            key={number}
                            size="4xs"
                            extraClass={`numerator-table ${isMeaning &&
                                '--meaning-table'}`}
                        >
                            {formatIndex(isMeaning ? index : index + 1)}
                        </Text>
                        <Text
                            key={number}
                            size="4xs"
                            extraClass={`number-table-horizontal ${isMeaning &&
                                '--meaning-table'}`}
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
    className: PropTypes.string,
    date: PropTypes.string,
    letters: PropTypes.string,
    isMeaning: PropTypes.bool,
    lotteryDrawId: PropTypes.string,
    meaning: PropTypes.string,
    results: PropTypes.arrayOf
};

TableHorizontalResults.defaultProps = {
    className: '',
    date: '',
    letters: '',
    isMeaning: false,
    lotteryDrawId: '',
    meaning: '',
    results: []
};

export default TableHorizontalResults;
