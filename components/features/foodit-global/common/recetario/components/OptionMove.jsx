import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SaveRecipe from '../../Modals/SaveRecipe/saveRecipe';

function OptionMove({
    bookmarkId,
    items,
    setItems,
    moveFunction,
    filterKey = 'bookmarkId',
    isOpen,
    onClose,
    currentCollectionId,
    collectionArticles
}) {
    const [indexStep, setIndexStep] = useState(1);

    const handleClose = () => {
        setIndexStep(1);
        onClose();
    };

    const handleConfirmMove = async (targetCollectionId, newCollectionName) => {
        try {
            if (!moveFunction) {
                handleClose();
                return false;
            }

            const result = await moveFunction({
                bookmarkId,
                targetCollectionId,
                newCollectionName
            });

            if (result) {
                const targetCollection =
                    newCollectionName || targetCollectionId;

                const updatedItems = items.map(item => {
                    if (item[filterKey] === bookmarkId) {
                        return {
                            ...item,
                            bookmarkGroup: targetCollection
                        };
                    }
                    return item;
                });

                setItems(updatedItems);
                handleClose();
                return true;
            }
            console.error('Failed to move item.');
            handleClose();
            return false;
        } catch (error) {
            console.error('Error moving item:', error);
            handleClose();
            return false;
        }
    };

    return (
        <SaveRecipe
            showModal={isOpen}
            close={handleClose}
            ids={[bookmarkId]}
            collectionArticles={collectionArticles}
            indexStep={indexStep}
            setIndexStep={setIndexStep}
            onConfirmMove={handleConfirmMove}
            currentCollectionId={currentCollectionId}
            fatherType="recetario"
        />
    );
}

OptionMove.propTypes = {
    bookmarkId: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    setItems: PropTypes.func.isRequired,
    moveFunction: PropTypes.func.isRequired,
    filterKey: PropTypes.string,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    currentCollectionId: PropTypes.string.isRequired,
    collectionArticles: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string
        })
    ).isRequired
};

OptionMove.defaultProps = {
    filterKey: 'bookmarkId'
};

export default OptionMove;
