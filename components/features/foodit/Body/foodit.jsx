/* eslint-disable no-console */
/* eslint-disable react/require-default-props */

import React, { useEffect } from 'react';
import Consumer from 'fusion:consumer';

import buildBody from './children/_buildBody';
import { setStorageConfiguration } from '../../../private/common/utils/storage';
import {
    embedIntersectionObserver,
    takeEmbedScriptToDiffer
} from '../../../../components/features/LN-nota/body/_utils/_embedHelper';

const Body = ({ globalContent = {} }) => {
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

    const renderComponents = buildBody({
        globalContent
    });

    return <>{renderComponents}</>;
};

export default Consumer(Body);
