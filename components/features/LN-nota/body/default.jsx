/* eslint-disable no-console */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import groupBannerConfig from './_utils/_groupBannerConfig';
import buildBodyCustomFields from './_utils/_buildBodyCustomFields';
import BuildBody from './_children/_buildBody';
import addEventListener from '../../../private/common/hooks/useEventListener';
import handleScrollForNota from '../../../private/LN/nota/dataLayer/handleScrollForNota';
import { setStorageConfiguration } from '../../../private/common/utils/storage';
import AudioPlayerDesktop from '../../../private/common/audioNews/AudioPlayerDesktop';
import {
    embedIntersectionObserver,
    takeEmbedScriptToDiffer
} from './_utils/_embedHelper';
import { createIntersectionObserverForLinks } from '../../../private/common/utils/linksTracker';
import { FalsePlaceHolderAudioPlayer } from './_children/FalsePlaceHolderAudioPlayer';

/*
  TODO: Verificar el comportamiento de AudioPlayerDesktop para evitar el re-renderizado
  innecesario del componente body y asegurar una transición suave sin reflash al
  renderizar en el cliente. Se debe determinar por qué AudioPlayerDesktop no realiza
  renderización del lado del servidor y validar que el nombre 'Desktop' sea representativo
  de su funcionalidad. Tras investigar y solucionar estos aspectos, se deberá remover el
  componente FalsePlaceHolderAudioPlayer. Este comentario debe ser eliminado una vez que
  el problema se haya resuelto.
*/
const body = ({ customFields }) => {
    const [isClient, setIsClient] = useState(false);
    const { outputType, globalContent = {} } = useAppContext();
    const banners = groupBannerConfig(customFields);
    const {
        _id,
        isListenable,
        last_updated_date: date,
        content_elements: contentElements
    } = globalContent;

    useEffect(() => {
        try {
            setStorageConfiguration(_id);
            embedIntersectionObserver(takeEmbedScriptToDiffer(contentElements));
            createIntersectionObserverForLinks();
        } catch (error) {
            console.error('Error en setear Local Storage, CuerpoDefault', {
                error,
                outputType,
                IdNota: _id
            });
        }
    }, [_id, outputType, contentElements]);

    useEffect(() => {
        // Este efecto solo se ejecuta en el cliente
        setIsClient(true);
    }, []);

    if (typeof window !== 'undefined') {
        addEventListener('scroll', handleScrollForNota, window);
    }

    const renderComponents = BuildBody({
        banners,
        outputType,
        globalContent
    });

    return (
        <>
            {isClient ? (
                <AudioPlayerDesktop
                    isListenable={isListenable}
                    publishDate={date}
                    noteId={_id}
                    className={'--no-app'}
                    isClient={isClient}
                />
            ) : (
                <FalsePlaceHolderAudioPlayer isListenable={isListenable} />
            )}
            {renderComponents}
        </>
    );
};

body.label = 'LN-Nota-Body';

body.propTypes = {
    customFields: PropTypes.shape(buildBodyCustomFields())
};

export default body;
