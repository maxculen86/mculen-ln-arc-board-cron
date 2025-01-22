import { useEffect } from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import buildBody from './children/_buildBody';
import { setStorageConfiguration } from '../../../private/common/utils/storage';
import {
    embedIntersectionObserver,
    takeEmbedScriptToDiffer
} from '../../LN-nota/body/_utils/_embedHelper';

function Body({ globalContent = {} }) {
    const { _id, content_elements: contentElements } = globalContent;

    useEffect(() => {
        try {
            setStorageConfiguration(_id);
            embedIntersectionObserver(takeEmbedScriptToDiffer(contentElements));
        } catch (error) {
            console.error('Error en setear Local Storage, CuerpoDefault', {
                error,
                IdNota: _id
            });
        }
    }, [_id, contentElements]);

    return buildBody({
        globalContent
    });
}
Body.propTypes = {
    globalContent: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        content_elements: PropTypes.arrayOf(PropTypes.shape({})).isRequired
    }).isRequired
};

export default Consumer(Body);
