import React from 'react';
import PropTypes from 'prop-types';
import Text from '../../../common/text';

const TableHorizontalResults = ({
    className,
    results,
    date,
    letters,
    isDetail,
    lotteryDrawId,
    meaning
}) => {
    const classes = `table-horizontal-results ${className}`;
    const formatIndex = index => (index < 10 ? `0${index}` : index);
    const meaningNumber = results[0].slice(2, 4);

    return (
        <div className={classes}>
            {!isDetail && (
                <div className="header-table">
                    <Text className="title" weight="bold" size="4xs">
                        {`${lotteryDrawId} - ${date}`}
                    </Text>
                    <div className="sub-header">
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
            <div className={`body-table ${isDetail && '--detail'}`}>
                {results.map((number, index) => (
                    <div className={`number-box ${isDetail && '--detail'}`}>
                        <Text
                            key={number}
                            size="4xs"
                            className={`numerator ${isDetail && '--detail'}`}
                        >
                            {formatIndex(isDetail ? index : index + 1)}
                        </Text>
                        <Text
                            key={number}
                            size="4xs"
                            className={`number ${isDetail && '--detail'}`}
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
    isDetail: PropTypes.bool,
    lotteryDrawId: PropTypes.string,
    meaning: PropTypes.string,
    results: PropTypes.arrayOf
};

TableHorizontalResults.defaultProps = {
    className: '',
    date: '',
    letters: '',
    isDetail: false,
    lotteryDrawId: '',
    meaning: '',
    results: []
};

export default TableHorizontalResults;
