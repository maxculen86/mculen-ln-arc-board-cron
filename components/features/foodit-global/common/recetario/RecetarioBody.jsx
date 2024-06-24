import React, { useCallback, useEffect, useState } from 'react';

import useGetRecetarioData from './hooks/useGetRecetarioData';
import useGetUserData from '../../hooks/useGetUserData';
import { createSummaryList } from '../utils/recetarioHelper';
import { Text } from '@ln/common-ui-text';
import CollectionBox from '../collectionBox/foodit';
import { EmptyStateComponent } from './helpers';
import DrawerRecetario from '../drawerRecetario/foodit';
import BookmarkedArticles from './components/BookmarkedArticles';
import EditFolderModal from './components/EditFolderModal';

const RecetarioBody = () => {
    const { loading, userBookmarks, setUserBookmarks } = useGetRecetarioData();
    const { userType } = useGetUserData();

    const [selectedItem, setSelectedItem] = useState({});
    const { id: selectedItemId, quantity: selectedItemQuantity } = selectedItem;
    useEffect(() => {
        if (!loading && userBookmarks.length)
            setSelectedItem({ id: 'Todas', quantity: userBookmarks.length });
    }, [loading]);

    const [summaryList, setSummaryList] = useState([]);
    useEffect(() => {
        if (userBookmarks.length)
            setSummaryList(createSummaryList(userBookmarks));
    }, [userBookmarks]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const onClose = useCallback(() => setIsModalOpen(false), []);

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
                <div className="flex ai-center gap-24 mb-24">
                    <Text
                        className="prumo prumo-light text-24 text-32_md text-36_lg"
                        as="h2"
                    >
                        {selectedItemId}
                    </Text>
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
            <EditFolderModal
                isOpen={isModalOpen}
                onClose={onClose}
                folderId={selectedItemId}
                setUserBookmarks={setUserBookmarks}
                setSelectedItem={setSelectedItem}
            />
        </div>
    );
};

export default RecetarioBody;
