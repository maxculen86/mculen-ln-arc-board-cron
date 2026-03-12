import React, { useState } from 'react';
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

    const hasRealChanges = (targetCollectionId, newCollectionName) => {
        const targetCollection = newCollectionName || targetCollectionId;
        const currentItem = items.find(item => item[filterKey] === bookmarkId);

        if (!currentItem) {
            console.warn('Item not found for validation');
            return false;
        }

        const isSameCollection = targetCollection === currentItem.bookmarkGroup;
        const isSameAsCurrentId = targetCollection === currentCollectionId;

        return !isSameCollection && !isSameAsCurrentId;
    };

    const handleConfirmMove = async (targetCollectionId, newCollectionName) => {
        try {
            if (!moveFunction) {
                handleClose();
                return false;
            }

            if (!hasRealChanges(targetCollectionId, newCollectionName)) {
                console.warn(
                    'No real changes detected, skipping move operation'
                );
                handleClose();
                return true;
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

export default OptionMove;
