import { useEffect } from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import groupBannerConfig from './_utils/_groupBannerConfig';
import buildBodyCustomFields from './_utils/_buildBodyCustomFields';
import BuildBody from './_children/_buildBody';
import addEventListener from '../../../private/common/hooks/useEventListener';
import handleScrollForNota from '../../../private/LN/nota/dataLayer/handleScrollForNota';
import { setStorageConfiguration } from '../../../private/common/utils/storage';
import {
    embedIntersectionObserver,
    takeEmbedScriptToDiffer
} from './_utils/_embedHelper';

function body({ customFields }) {
    const { outputType, globalContent = {} } = useAppContext();
    const banners = groupBannerConfig(customFields);
    const { _id, content_elements: contentElements } = globalContent;

    useEffect(() => {
        try {
            setStorageConfiguration(_id);
            embedIntersectionObserver(takeEmbedScriptToDiffer(contentElements));
        } catch (error) {
            console.error('Error en setear Local Storage, CuerpoDefault', {
                error,
                outputType,
                IdNota: _id
            });
        }
    }, [_id, outputType, contentElements]);

    if (typeof window !== 'undefined') {
        addEventListener('scroll', handleScrollForNota, window);
    }

    return BuildBody({
        banners,
        outputType,
        globalContent
    });
}

body.label = 'LN-Nota-Body';

body.propTypes = {
    customFields: PropTypes.shape(buildBodyCustomFields())
};

export default body;
