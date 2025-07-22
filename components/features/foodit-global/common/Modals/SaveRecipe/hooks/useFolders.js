import { useState, useEffect, useCallback, useRef } from 'react';
import { loadBookmarkFolders } from '../../../bookmark/foldersHelper';
import { safeGetJSON } from '../../../../../../private/LN/common/utils/safeLocalStorageHelpers';

const CREATE_NEW_FOLDER = { bookmarkGroup: 'Crear colección', value: 'new' };

const formatFolders = folders =>
    folders.map(folder => ({
        bookmarkGroup: folder.bookmarkGroup,
        value: folder.bookmarkGroup,
        bookmarkCount: folder.bookmarkCount || 0
    }));

const getFoldersFromLocalStorage = async (mode, currentCollectionId) => {
    const localFolders = safeGetJSON('bookmarkFolders', null);

    if (localFolders) {
        const formatted = formatFolders(localFolders);
        return mode === 'move' && currentCollectionId
            ? formatted.filter(
                  folder => folder.bookmarkGroup !== currentCollectionId
              )
            : formatted;
    }

    try {
        const fetchedFolders = await loadBookmarkFolders();
        if (!fetchedFolders) return [];

        const parsed = safeGetJSON('bookmarkFolders', []);
        const formatted = formatFolders(parsed);
        return mode === 'move' && currentCollectionId
            ? formatted.filter(
                  folder => folder.bookmarkGroup !== currentCollectionId
              )
            : formatted;
    } catch (err) {
        console.error('useFolders - Error loading folders:', err);
        return [];
    }
};

export const useFolders = ({ mode, currentCollectionId }) => {
    const [folders, setFolders] = useState([CREATE_NEW_FOLDER]);
    const debounceTimeoutRef = useRef(null);

    const fetchFolders = useCallback(async () => {
        let availableFolders = [];

        availableFolders = await getFoldersFromLocalStorage(
            mode,
            currentCollectionId
        );

        const finalFolders = [CREATE_NEW_FOLDER, ...availableFolders];
        setFolders(finalFolders);
    }, [mode, currentCollectionId]);

    const debouncedFetchFolders = useCallback(() => {
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        debounceTimeoutRef.current = setTimeout(() => {
            fetchFolders();
        }, 300);
    }, [fetchFolders]);

    useEffect(() => {
        fetchFolders();
    }, [fetchFolders]);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const handleStorageChange = e => {
                if (e.key === 'bookmarkFolders') {
                    debouncedFetchFolders();
                }
            };

            const handleCustomFoldersChange = () => {
                debouncedFetchFolders();
            };

            window.addEventListener('storage', handleStorageChange);
            window.addEventListener(
                'bookmarkFoldersChanged',
                handleCustomFoldersChange
            );

            return () => {
                window.removeEventListener('storage', handleStorageChange);
                window.removeEventListener(
                    'bookmarkFoldersChanged',
                    handleCustomFoldersChange
                );

                if (debounceTimeoutRef.current) {
                    clearTimeout(debounceTimeoutRef.current);
                }
            };
        }

        return undefined;
    }, [debouncedFetchFolders]);

    return folders;
};
