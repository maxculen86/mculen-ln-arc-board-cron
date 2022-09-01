/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import OrderedList from './lists/ordered';
import ModRowGap from '../../common/mod-rowgap';

const CajaTemaWrapper = ({
    notesQuantity,
    layoutName,
    isRanking,
    children,
    isVisible,
    withGridFour
}) => {
    if (!isVisible) return <></>;

    return (
        <ModRowGap column={notesQuantity} typeArticle={layoutName}>
            {isRanking ? (
                <OrderedList extraClass={withGridFour}>{children}</OrderedList>
            ) : (
                children
            )}
        </ModRowGap>
    );
};

CajaTemaWrapper.propTypes = {
    notesQuantity: PropTypes.number,
    children: PropTypes.node,
    layoutName: PropTypes.string,
    isRanking: PropTypes.bool,
    isVisible: PropTypes.bool,
    withGridFour: PropTypes.string
};

export default CajaTemaWrapper;
