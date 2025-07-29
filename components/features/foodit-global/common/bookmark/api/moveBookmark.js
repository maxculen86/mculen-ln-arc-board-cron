import { PERSONALIZACION_API_FOODIT } from 'fusion:environment';
import { getAuthTokens } from '../../../../../private/common/auth/helper/loginHelper';
import { addStorageFolder, removeFromStorageFolder } from '../foldersHelper';
import { addErrorToast, addToast, TOAST } from './_helper';
import {
    safeGetJSON,
    safeSetJSON
} from '../../../../../private/LN/common/utils/safeLocalStorageHelpers';

function updateLocalStorageAfterMove({
    originalBookmarkId,
    newBookmarkId,
    newBookmarkTypeId,
    destinationCollection,
    isNewFolder,
    originalCollection
}) {
    try {
        const bookmarkedItems = safeGetJSON('bookmarkedItems', []);

        const filteredItems = bookmarkedItems.filter(
            item => item.bookmarkId !== originalBookmarkId
        );

        const updatedBookmarkedItems = filteredItems.concat([
            {
                bookmarkTypeId: newBookmarkTypeId,
                bookmarkId: newBookmarkId,
                bookmarkGroup: destinationCollection
            }
        ]);

        safeSetJSON('bookmarkedItems', updatedBookmarkedItems);

        if (
            originalCollection &&
            originalCollection !== destinationCollection
        ) {
            removeFromStorageFolder(originalCollection);
            addStorageFolder(destinationCollection);
        } else if (isNewFolder) {
            addStorageFolder(destinationCollection);
        }
    } catch (error) {
        console.error('Error updating localStorage after move:', error);
    }
}

async function moveBookmark({
    bookmarkId,
    bookmarkTypeId,
    targetCollectionId,
    targetCollectionName,
    bookmarkContent,
    bookmarkParent
}) {
    const { token, accessToken } = await getAuthTokens();

    if (!token || !accessToken) {
        console.error('Invalid authentication tokens:');
        return {
            success: false,
            error: 'Authentication tokens not available'
        };
    }

    const destinationCollection = targetCollectionName || targetCollectionId;
    const isNewFolder = Boolean(targetCollectionName);

    let originalCollection = null;
    try {
        const bookmarkedItems = safeGetJSON('bookmarkedItems', []);
        const originalBookmark = bookmarkedItems.find(
            item => item.bookmarkId === bookmarkId
        );
        originalCollection = originalBookmark?.bookmarkGroup;
    } catch (error) {
        console.error('Error getting original collection:', error);
    }

    let deleteResponse;
    let deleteData;
    let postResponse;
    let postData;

    try {
        deleteResponse = await fetch(
            `${PERSONALIZACION_API_FOODIT}bookmarks/${bookmarkId}`,
            {
                method: 'DELETE',
                headers: {
                    'X-Token': token,
                    Authorization: accessToken
                }
            }
        );

        deleteData = await deleteResponse.json();

        if (!deleteResponse.ok) {
            console.error(
                `Error while deleting bookmark ${bookmarkTypeId}, HTTP status: ${deleteResponse.status}, message: ${deleteData?.message}`
            );
            addErrorToast();
            return {
                success: false,
                error: deleteData.message || 'Error deleting bookmark'
            };
        }

        postResponse = await fetch(`${PERSONALIZACION_API_FOODIT}bookmarks/`, {
            method: 'POST',
            headers: {
                'X-Token': token,
                Authorization: accessToken
            },
            body: JSON.stringify({
                bookmarkType: 'article',
                bookmarkTypeId,
                bookmarkGroup: destinationCollection,
                bookmarkParent,
                bookmarkContent
            })
        });

        postData = await postResponse.json();

        if (!postResponse.ok) {
            console.error(
                `Error while saving ${bookmarkTypeId} in new collection, HTTP status: ${postResponse.status}, message: ${postData?.message}`
            );
            addErrorToast();
            return {
                success: false,
                error:
                    postData.message ||
                    'Error saving bookmark to new collection'
            };
        }

        if (!postData?.bookmarkId) {
            console.error(
                `POST response did not return a new bookmarkId for ${bookmarkTypeId}. Message: ${postData?.message}`
            );
            addErrorToast();
            return {
                postDataMessage: postData.message,
                success: false
            };
        }

        updateLocalStorageAfterMove({
            originalBookmarkId: deleteData.bookmarkId,
            newBookmarkId: postData.bookmarkId,
            newBookmarkTypeId: postData.bookmarkTypeId || bookmarkTypeId,
            destinationCollection,
            isNewFolder,
            originalCollection
        });

        addToast({
            variant: TOAST.SUCCESS.VARIANT,
            title: TOAST.SUCCESS.TITLE,
            message: TOAST.SUCCESS.MESSAGE.MOVE_COLLECTION
        });

        return {
            ...postData,
            success: true,
            originalBookmarkId: deleteData.bookmarkId,
            newBookmarkId: postData.bookmarkId,
            destinationCollection
        };
    } catch (error) {
        console.error(
            `Error in moveBookmark process for ${bookmarkTypeId}:`,
            error
        );
        addErrorToast();
        return {
            success: false,
            error:
                error.message ||
                'An unexpected error occurred during bookmark movement'
        };
    }
}

export default moveBookmark;
