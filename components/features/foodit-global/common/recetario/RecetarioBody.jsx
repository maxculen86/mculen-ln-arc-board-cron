import React, { useCallback, useEffect, useState } from 'react';

import useGetRecetarioData from './hooks/useGetRecetarioData';
import useGetUserData from '../../hooks/useGetUserData';
import { createSummaryList } from '../utils/recetarioHelper';

import CollectionBox from '../collectionBox/foodit';
import RoofFoodit from '../RoofFoodit/foodit';
import { EmptyStateComponent } from './helpers';
import DrawerRecetario from '../drawerRecetario/foodit';
import BookmarkedArticles from './components/BookmarkedArticles';
import EditFolderModal from './components/EditFolderModal';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';

const RecetarioBody = () => {
    const { loading, userBookmarks, setUserBookmarks } = useGetRecetarioData();
    const { userType } = useGetUserData();

    const [selectedItem, setSelectedItem] = useState({});
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

    const { id: selectedItemId, quantity: selectedItemQuantity } = selectedItem;

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
                <RoofFoodit
                    title={{ text: selectedItemId, as: 'h2' }}
                    buttonProps={
                        userBookmarks.length && selectedItemId !== 'Todas'
                            ? {
                                  text: 'RENOMBRAR',
                                  onClick: () => setIsModalOpen(true)
                              }
                            : undefined
                    }
                    icon={
                        <IconSprite
                            name={'delete'} //TODO: Actualizar icono a lapiz
                        />
                    }
                />
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
            {isModalOpen && (
                <EditFolderModal
                    isOpen={isModalOpen}
                    onClose={onClose}
                    folderId={selectedItemId}
                    setUserBookmarks={setUserBookmarks}
                    setSelectedItem={setSelectedItem}
                />
            )}
        </div>
    );
};

export default RecetarioBody;
