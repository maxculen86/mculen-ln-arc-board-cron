import React from 'react';
import { useAppContext } from 'fusion:context';
import { useDisclosure } from '@ln/hooks';
import get from '../../../../../private/common/utils/get';
import getAuthorsAsString from '../../../../../private/common/utils/getAuthorsAsString';
import { getImagesToLoadWithPicture } from '../../../../../private/LN/common/utils/mediaHelper';
import CommonCardFoodit from '../../CommonCardFoodit/foodit';
import useGetRecetarioData from '../hooks/useGetRecetarioData';
import OptionDelete from '../../MenuSemanal/components/MenuOptions/OptionDelete';
import OptionMove from './OptionMove';

function RecetarioArticle({
    article,
    executeDeleteBookmark,
    executeMoveBookmark,
    isFirst = false
}) {
    const {
        bookmarkTypeId,
        bookmarkId,
        bookmarkGroup,
        bookmarkContent: {
            image = {},
            time = null,
            headlines = {},
            canonical_url: canonicalUrl,
            variant,
            tag
        } = {}
    } = article || {};
    const { url = {}, resized_urls: resizedUrls = [] } = image;
    const title = get(headlines, 'basic', '');

    const {
        isOpen: isDeleteOpen,
        onOpen: onDeleteOpen,
        onClose: onDeleteClose
    } = useDisclosure(false);

    const {
        isOpen: isMoveOpen,
        onOpen: onMoveOpen,
        onClose: onMoveClose
    } = useDisclosure(false);

    const { userBookmarks, setUserBookmarks } = useGetRecetarioData();

    const {
        siteProperties: { layoutsName = {} },
        layout
    } = useAppContext();
    const isMyRecipesLayout = layout === layoutsName.FooditRecetario;

    const handleConfirmDelete = async ({ bookmarkId: id }) => {
        try {
            return await executeDeleteBookmark(
                id || bookmarkId,
                bookmarkTypeId
            );
        } catch (error) {
            console.error('Error in handleConfirmDelete:', error);
            return false;
        }
    };

    const handleConfirmMove = async ({
        bookmarkId: id,
        targetCollectionId,
        newCollectionName
    }) => {
        try {
            return await executeMoveBookmark({
                bookmarkId: id || bookmarkId,
                bookmarkTypeId,
                targetCollectionId,
                targetCollectionName: newCollectionName,
                bookmarkContent: article.bookmarkContent,
                bookmarkParent: bookmarkGroup
            });
        } catch (error) {
            console.error('Error in handleConfirmMove:', error);
            return false;
        }
    };

    const handleOpenDeleteModal = () => {
        onDeleteOpen();
    };

    const handleOpenMoveModal = () => {
        onMoveOpen();
    };

    const handleCloseMoveModal = () => {
        onMoveClose();
    };

    return (
        <>
            <CommonCardFoodit
                key={bookmarkId}
                articleId={bookmarkTypeId}
                showTime={Boolean(time)}
                time={time}
                className="col-span-8 col-span-4_md"
                linksProps={{
                    href: canonicalUrl,
                    title
                }}
                size="small"
                variant={variant || 'm'}
                src={get(url, 'resizedUrl', '')}
                alt={title}
                sources={getImagesToLoadWithPicture(false, resizedUrls)}
                loading={isFirst ? 'eager' : 'lazy'}
                fetchPriority={isFirst ? 'high' : 'low'}
                tag={tag}
                title={title}
                author={getAuthorsAsString(article.bookmarkContent, false)}
                bookmarkAction={isMyRecipesLayout ? null : undefined}
                isMyRecipesLayout={isMyRecipesLayout}
                onDelete={isMyRecipesLayout ? handleOpenDeleteModal : null}
                onMove={isMyRecipesLayout ? handleOpenMoveModal : null}
            />

            <OptionMove
                items={userBookmarks}
                setItems={setUserBookmarks}
                moveFunction={handleConfirmMove}
                filterKey="bookmarkId"
                isOpen={isMoveOpen}
                onClose={handleCloseMoveModal}
                bookmarkId={bookmarkId}
                currentCollectionId={bookmarkGroup}
                collectionArticles={userBookmarks}
            />

            <OptionDelete
                items={userBookmarks}
                setItems={setUserBookmarks}
                deleteFunction={handleConfirmDelete}
                filterKey="bookmarkId"
                isOpen={isDeleteOpen}
                onClose={onDeleteClose}
                bookmarkId={bookmarkId}
                messageType="bookmark"
            />
        </>
    );
}

export default RecetarioArticle;
