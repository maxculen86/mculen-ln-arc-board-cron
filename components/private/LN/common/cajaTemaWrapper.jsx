import React from 'react';
import OrderedList from './lists/ordered';
import ModRowGap from '../../common/mod-rowgap';

function CajaTemaWrapper({
    notesQuantity,
    layoutName,
    isRanking,
    children,
    isVisible,
    withGridFour
}) {
    if (!isVisible) return null;

    return (
        <ModRowGap column={notesQuantity} typeArticle={layoutName}>
            {isRanking ? (
                <OrderedList extraClass={withGridFour}>{children}</OrderedList>
            ) : (
                children
            )}
        </ModRowGap>
    );
}

export default CajaTemaWrapper;
