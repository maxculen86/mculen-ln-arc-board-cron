import React, { useEffect, useState } from 'react';

import CollectionBox from '../collectionBox/foodit';
import RoofFoodit from '../RoofFoodit/foodit';
import CommonCardFoodit from '../CommonCardFoodit/foodit';
import get from '../../../../private/common/utils/get';
import { getImagesToLoadWithPicture } from '../../../../private/LN/common/utils/mediaHelper';
import getAuthorsAsString from '../../../../private/common/utils/getAuthorsAsString';
import fetchDeleteBookmark from '../bookmark/api/deleteBookmark';
import { createSummaryList } from '../utils/recetarioHelper';
import getToken from '../../../../private/common/utils/getToken';
import getBookmarks from '../bookmark/api/getBookmarks';
import { Button } from '@ln/foodit-ui-button';
import { EmptyStateComponent } from './helpers';
import useGetUserData, { isFooditSuscriptor } from '../../hooks/useGetUserData';
import DrawerRecetario from '../drawerRecetario/foodit';

const RecetarioBody = () => {
    const [userBookmarks, setUserBookmarks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState({});
    const [displayArticlesNum, setDisplayArticlesNum] = useState(24);

    const { userType } = useGetUserData();

    const { id: selectedItemId, quantity: selectedItemQuantity } = selectedItem;

    useEffect(() => {
        if (isFooditSuscriptor(getToken('ProductoPremiumId'))) {
            (async () => {
                const { data = [] } = await getBookmarks();
                setUserBookmarks(data);
                setSelectedItem({ id: 'Todas', quantity: data.length });
                setLoading(false);
            })();
        } else {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        setDisplayArticlesNum(24);
    }, [selectedItemId]);

    const summaryList = createSummaryList(userBookmarks);

    return (
        <div className="grid grid-cols-8 grid-cols-12_md grid-cols-16_lg">
            <aside className="sm-none col-span-4 bg-positive p-24 p-32_lg">
                <CollectionBox
                    title={'Colecciones'}
                    list={summaryList}
                    onItemSelected={setSelectedItem}
                />
            </aside>
            <section className="col-span-8 col-span-12_lg min-h-344">
                <div className="floating-button-sentinel" />
                <RoofFoodit title={{ text: selectedItemId, as: 'h2' }} />
                {userBookmarks.length ? (
                    <>
                        <div className="grid grid-cols-8 grid-cols-8_md grid-cols-12_lg gap-32">
                            {userBookmarks
                                .filter(
                                    ({ bookmarkGroup }) =>
                                        selectedItemId === 'Todas' ||
                                        bookmarkGroup === selectedItemId
                                )
                                .slice(0, displayArticlesNum)
                                .map(
                                    ({
                                        bookmarkTypeId,
                                        bookmarkId,
                                        bookmarkParent,
                                        bookmarkContent
                                    }) => {
                                        const {
                                            image = {},
                                            time = null,
                                            headlines = {},
                                            canonical_url
                                        } = bookmarkContent || {};

                                        const {
                                            url = {},
                                            resized_urls = []
                                        } = image;

                                        const title = get(
                                            headlines,
                                            'basic',
                                            ''
                                        );

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
                                                variant={'m'}
                                                src={get(url, 'resizedUrl', '')}
                                                alt={''}
                                                sources={getImagesToLoadWithPicture(
                                                    resized_urls
                                                )}
                                                loading={'lazy'}
                                                fetchPriority={'low'}
                                                tag={bookmarkParent}
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
                                                        setUserBookmarks
                                                    )
                                                }
                                            />
                                        );
                                    }
                                )}
                        </div>
                        {displayArticlesNum < selectedItemQuantity && (
                            <div className="text-center pt-24">
                                <Button
                                    title="Ver más"
                                    onClick={() =>
                                        setDisplayArticlesNum(
                                            displayArticlesNum =>
                                                displayArticlesNum + 24
                                        )
                                    }
                                    variant="secondary"
                                    size={{ sm: 32, lg: 40 }}
                                >
                                    Ver más
                                </Button>
                            </div>
                        )}
                    </>
                ) : (
                    <EmptyStateComponent
                        userType={userType}
                        loading={loading}
                    />
                )}
            </section>
            <DrawerRecetario
                summaryList={summaryList}
                onItemSelected={setSelectedItem}
            />
        </div>
    );
};

export default RecetarioBody;
