import { useEffect } from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import groupBannerConfig from './_utils/_groupBannerConfig';
import buildBodyCustomFields from './_utils/_buildBodyCustomFields';
import BuildBody from './_children/_buildBody';
import useLazyEmbeds from '../../LN-common/hooks/useLazyEmbeds';
import useScrollDispatcher, {
    registerScrollTrigger
} from '../../LN-common/hooks/useScrollDispatcher';
function body({ customFields }) {
    const { outputType, globalContent = {} } = useAppContext();
    const banners = groupBannerConfig(customFields);
    const { _id, content_elements: contentElements } = globalContent;

    useLazyEmbeds({
        contentElements,
        outputType,
        bodyOrigin: 'Body default',
        noteId: _id,
        selector: 'cuerpo__nota'
    });

    useScrollDispatcher({
        startSelector: 'h1', //titulo
        endSelector: '#fin-de-nota'
    });

    useEffect(() => {
        registerScrollTrigger({
            id: 'scroll-body-GA',
            type: 'percentage',
            threshold: 10,
            thresholdStep: 10,
            callback: percent => {
                if (window.dataLayer) {
                    window.dataLayer.push({
                        event: 'scroll_tracking_nota',
                        scroll_percent: percent,
                        content_type: 'nota'
                    });
                }
            }
        });
    }, []);

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
