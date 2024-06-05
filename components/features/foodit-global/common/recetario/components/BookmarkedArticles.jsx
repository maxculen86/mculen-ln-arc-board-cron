import React, { memo, useEffect, useState } from 'react';

import get from '../../../../../private/common/utils/get';
import getAuthorsAsString from '../../../../../private/common/utils/getAuthorsAsString';
import { getImagesToLoadWithPicture } from '../../../../../private/LN/common/utils/mediaHelper';
import fetchDeleteBookmark from '../../bookmark/api/deleteBookmark';

import CommonCardFoodit from '../../CommonCardFoodit/foodit';
import { Button } from '@ln/foodit-ui-button';

const BookmarkedArticles = ({
    userBookmarks,
    selectedItemId,
    selectedItemQuantity,
    setSelectedItem,
    setUserBookmarks
}) => {
    const [displayArticlesNum, setDisplayArticlesNum] = useState(24);

    useEffect(() => {
        setDisplayArticlesNum(24);
    }, [selectedItemId]);

    return (
        <>
            <div className="grid grid-cols-8 grid-cols-8_md grid-cols-12_lg gap-32">
                {userBookmarks
                    .filter(
                        ({ bookmarkGroup }) =>
                            selectedItemId === 'Todas' ||
                            bookmarkGroup === selectedItemId
                    )
                    .slice(0, displayArticlesNum)
                    .map(({ bookmarkTypeId, bookmarkId, bookmarkContent }) => {
                        const {
                            image = {},
                            time = null,
                            headlines = {},
                            canonical_url,
                            variant,
                            tag
                        } = bookmarkContent || {};

                        const { url = {}, resized_urls = [] } = image;

                        const title = get(headlines, 'basic', '');

                        return (
                            <CommonCardFoodit
                                key={bookmarkId}
                                articleId={bookmarkTypeId}
                                showTime={Boolean(time)}
                                time={time}
                                className="col-span-8 col-span-4_md"
                                linksProps={{
                                    href: canonical_url,
                                    title: title
                                }}
                                size={'small'}
                                variant={variant || 'm'}
                                src={get(url, 'resizedUrl', '')}
                                alt={title}
                                sources={getImagesToLoadWithPicture(
                                    resized_urls
                                )}
                                loading={'lazy'}
                                fetchPriority={'low'}
                                tag={tag}
                                fill={true}
                                title={title}
                                author={getAuthorsAsString(
                                    bookmarkContent,
                                    false
                                )}
                                bookmarkAction={() =>
                                    fetchDeleteBookmark(
                                        [
                                            {
                                                bookmarkId,
                                                bookmarkTypeId
                                            }
                                        ],
                                        setUserBookmarks,
                                        setSelectedItem
                                    )
                                }
                            />
                        );
                    })}
            </div>
            {displayArticlesNum < selectedItemQuantity && (
                <div className="text-center pt-24">
                    <Button
                        title="Ver más"
                        onClick={() =>
                            setDisplayArticlesNum(displayArticlesNum + 24)
                        }
                        variant="secondary"
                        size={{ sm: 32, lg: 40 }}
                    >
                        Ver más
                    </Button>
                </div>
            )}
        </>
    );
};

export default memo(BookmarkedArticles, (prevProps, nextProps) => {
    return (
        prevProps.userBookmarks === nextProps.userBookmarks &&
        prevProps.selectedItemId === nextProps.selectedItemId
    );
});
