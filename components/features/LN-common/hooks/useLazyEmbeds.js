import { useEffect } from 'react';
import {
    embedIntersectionObserver,
    takeEmbedScriptToDiffer
} from '../../LN-nota/body/_utils/_embedHelper';
import { setStorageConfiguration } from '../../../private/common/utils/storage';

const useLazyEmbeds = ({
    contentElements = [],
    outputType = 'default',
    selector = '',
    bodyOrigin = 'Body default',
    noteId = ''
} = {}) => {
    useEffect(() => {
        try {
            if (noteId) {
                setStorageConfiguration(noteId);
            }
            embedIntersectionObserver(
                takeEmbedScriptToDiffer(contentElements),
                selector
            );
        } catch (error) {
            console.error(`Error en setear Local Storage, ${bodyOrigin}`, {
                error,
                outputType,
                IdNota: noteId
            });
        }
    }, [contentElements, outputType, selector, bodyOrigin, noteId]);
};

export default useLazyEmbeds;
