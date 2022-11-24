/* eslint-disable no-console */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/require-default-props */
import React, { useEffect } from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import groupBannerConfig from './_utils/_groupBannerConfig';
import buildBodyCustomFields from './_utils/_buildBodyCustomFields';
import BuildBody from './_children/_buildBody';
import addEventListener from '../../../private/common/hooks/useEventListener';
import handleScrollForNota from '../../../private/LN/nota/dataLayer/handleScrollForNota';
import { setStorageConfiguration } from '../../../private/common/utils/storage';
import AudioPlayerDesktop from '../../../private/common/audioNews/AudioPlayerDesktop';
import { embedIntersectionObserver } from './_utils/_embedHelper';

const body = ({ customFields }) => {
    const { outputType, globalContent = {} } = useAppContext();
    const banners = groupBannerConfig(customFields);
    const { _id, isListenable, last_updated_date: date } = globalContent;

    useEffect(() => {
        try {
            setStorageConfiguration(_id);
            embedIntersectionObserver();
        } catch (error) {
            console.error('Error en setear Local Storage, CuerpoDefault', {
                error,
                outputType,
                IdNota: _id
            });
        }
    }, [_id, outputType]);

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
            {
                <AudioPlayerDesktop
                    isListenable={isListenable}
                    publishDate={date}
                    noteId={_id}
                />
            }
            {renderComponents}
        </>
    );
};

body.label = 'LN-Nota-Body';

body.propTypes = {
    customFields: PropTypes.shape(buildBodyCustomFields())
};

export default body;
