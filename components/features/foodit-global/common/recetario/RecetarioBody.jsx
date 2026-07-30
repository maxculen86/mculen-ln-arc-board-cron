import React, { useCallback, useEffect, useState } from 'react';

import { Button } from '@ln/foodit-ui-button';
import { Icon } from '@ln/common-ui-icon';
import { Text } from '@ln/common-ui-text';
import { cx } from '@ln/cva';
import { createSummaryList } from '../utils/recetarioHelper';
import useGetRecetarioData from './hooks/useGetRecetarioData';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';
import CollectionBox from '../collectionBox/foodit';

import { getVariantBarrier } from '../emptyState/helpers';
import { EmptyStateDS } from '../../../ui/foodit/emptyState/default';
import DrawerRecetario from '../drawerRecetario/foodit';
import BookmarkedArticles from './components/BookmarkedArticles';
import EditFolderModal from './components/EditFolderModal';
import useGetUserConfig from '../../hooks/useGetUserConfig';
import { SkeletonRecetario } from '../skeletons/Recetario/foodit';

function RecetarioBody() {
    const { loading, userBookmarks, setUserBookmarks } = useGetRecetarioData();
    const { userType, isSubscribed } = useGetUserConfig();
    const [selectedItem, setSelectedItem] = useState({});
    const { id, quantity } = selectedItem;
    const selectedItemId = id ?? (userBookmarks.length ? 'Todas' : id);
    const selectedItemQuantity = quantity ?? userBookmarks.length;
    useEffect(() => {
        if (!loading && userBookmarks.length)
            setSelectedItem({ id: 'Todas', quantity: userBookmarks.length });
    }, [loading]);

    const [summaryList, setSummaryList] = useState([]);
    useEffect(() => {
        if (userBookmarks.length)
            setSummaryList(createSummaryList(userBookmarks));
        else setSummaryList([]);
    }, [userBookmarks]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const onClose = useCallback(() => setIsModalOpen(false), []);

    const classEmptyState = cx(
        isSubscribed
            ? 'col-span-8 col-span-12_lg min-h-344'
            : 'col-span-8 col-span-12_md col-span-16_lg'
    );

    return (
        <>
            {loading ? (
                <SkeletonRecetario />
            ) : (
                <div className="grid grid-cols-8 grid-cols-12_md grid-cols-16_lg">
                    {isSubscribed ? (
                        <aside className="sm-none col-span-4 bg-positive p-24 p-32_lg">
                            <CollectionBox
                                title="Colecciones"
                                list={summaryList}
                                onItemSelected={setSelectedItem}
                                selectedItemId={selectedItemId}
                            />
                        </aside>
                    ) : null}
                    <section className={classEmptyState}>
                        <div className="floating-button-sentinel" />
                        <div className="flex ai-center gap-24">
                            <Text
                                className="prumo prumo-light text-24 text-32_md mt-24 text-36_lg"
                                as="h2"
                            >
                                {selectedItemId}
                            </Text>
                            {userBookmarks.length &&
                            selectedItemId !== 'Todas' ? (
                                <Button
                                    data-testid="rename-collection-button"
                                    onClick={() => setIsModalOpen(true)}
                                    iconOnly
                                    variant="secondary"
                                    size={32}
                                    className="p-12_md"
                                >
                                    <Icon size={16}>
                                        <IconSprite name="edit" />
                                    </Icon>
                                </Button>
                            ) : null}
                        </div>
                        {userBookmarks.length ? (
                            <BookmarkedArticles
                                userBookmarks={userBookmarks}
                                setUserBookmarks={setUserBookmarks}
                                selectedItemId={selectedItemId}
                                setSelectedItem={setSelectedItem}
                                selectedItemQuantity={selectedItemQuantity}
                            />
                        ) : (
                            <div>
                                <EmptyStateDS
                                    variant={getVariantBarrier(userType)}
                                />
                            </div>
                        )}
                    </section>
                </div>
            )}
            <DrawerRecetario
                summaryList={summaryList}
                onItemSelected={setSelectedItem}
            />
            <EditFolderModal
                isOpen={isModalOpen}
                onClose={onClose}
                folderId={selectedItemId}
                setUserBookmarks={setUserBookmarks}
                setSelectedItem={setSelectedItem}
            />
        </>
    );
}

export default RecetarioBody;
