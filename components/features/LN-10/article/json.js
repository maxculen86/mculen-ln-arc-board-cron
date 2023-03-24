import Consumer from 'fusion:consumer';
import getProperties from 'fusion:properties';
import siteConfig from '../../../../properties/sites/la-nacion-ar';
import { renderProps } from '../../../private/LN/api/global/components/features/article/LN10/renderProps';
import { articleSourceNotaSourceInclude } from '../../../private/LN/api/global/components/features/article/common/sources/articleSourceNotaSourceInclude';
import { validateProps } from '../../../private/LN/api/global/components/features/article/LN10/props/validateProps';
import { validatePropsRender } from '../../../private/LN/api/global/components/features/article/LN10/props/validatePropsRender';
import withResizerV2 from '../../../private/common/utils/image/enableResizerV2';
import {
    getChainConfig,
    validateArticleFeature,
    isInApertura
} from './common/_helper-WebApi';
import videoFilterLN10 from '../../../../content/filters/LN/home/LN10/videoFilterLN10';
import filterVideo from '../../../../content/filters/LN/home/videoFilter';

class ArticleFeature {
    constructor(props) {
        this.state = {};
        const {
            customFields: { noteId, imageId, video: videoId, variant },
            id: featureId,
            arcSite,
            renderables = [],
            layout: layoutPageBuilder
        } = props;
        const { cajaTemaConfig } = getProperties(arcSite);
        const { layoutsName = {} } = siteConfig || {};

        this.configs = getChainConfig(featureId, renderables, cajaTemaConfig);
        this.onlyOneApeturaValidateForWWW = isInApertura({
            layoutPageBuilder,
            renderables,
            featureId,
            config: this.configs
        });
        this.shouldUseV2 =
            withResizerV2 && layoutPageBuilder === layoutsName.HomeLN10;

        const imageConfig = this.configs && this.configs.imageConfig;
        const typeCard = variant || 'default';
        const sourceInclude = articleSourceNotaSourceInclude(typeCard);
        this.props = validateProps(props, this.configs);

        videoId &&
            videoId.trim() &&
            this.fetchContent({
                articleVideoLN10: {
                    source: 'videoSource',
                    query: {
                        id: videoId && videoId.trim(),
                        website: 'la-nacion-ar',
                        isInApertura: this.onlyOneApeturaValidateForWWW,
                        shouldUseV2: this.shouldUseV2
                    },
                    filter: this.shouldUseV2 ? videoFilterLN10 : filterVideo
                }
            });

        noteId &&
            this.fetchContent({
                articleSourceNotaLN10: {
                    source: 'articleSourceNota',
                    query: {
                        id: noteId.trim(),
                        imageConfig,
                        published: true,
                        checkExclusiveAccess: false,
                        isInApertura: this.onlyOneApeturaValidateForWWW,
                        shouldUseV2: this.shouldUseV2,
                        shouldUseV1: !this.shouldUseV2,
                        sourceInclude
                    }
                }
            });

        imageId &&
            imageId.trim() &&
            this.fetchContent({
                articleImageLN10: {
                    source: 'relatedImageSource',
                    query: {
                        id: imageId.trim(),
                        published: true,
                        imageConfig,
                        'arc-site': 'la-nacion-ar',
                        nid: noteId,
                        boxType: 'ArticleFeature',
                        isInApertura: this.onlyOneApeturaValidateForWWW,
                        shouldUseV2: this.shouldUseV2
                    }
                }
            });
    }

    render() {
        try {
            const {
                articleSourceNotaLN10,
                articleImageLN10,
                articleVideoLN10
            } = this.state || {};

            const { config = {}, layout, isBomba } = this.configs;
            const { variantsDisabled } = config;

            if (!articleSourceNotaLN10) {
                return null;
            }

            const {
                propsRender,
                articleSourceNotaRender,
                articleImageRender,
                articleVideoRender
            } = validatePropsRender(
                articleSourceNotaLN10,
                articleImageLN10,
                articleVideoLN10,
                this.props,
                this.configs
            );

            const { customFields = {} } = propsRender;
            const {
                variant: variantRender,
                noteId: noteIdRender,
                imageId: imageIdRender,
                video: videoIdRender
            } = customFields;

            const error = validateArticleFeature({
                id: noteIdRender,
                content: articleSourceNotaRender,
                image: articleImageRender,
                video: articleVideoRender,
                layout,
                imageId: imageIdRender,
                videoId: videoIdRender,
                config,
                variant: variantRender,
                variantsDisabled,
                isBomba
            });

            if (error) {
                // eslint-disable-next-line no-console
                console.warn(error);
                return null;
            }

            return renderProps(
                articleSourceNotaRender,
                articleImageRender,
                articleVideoRender,
                propsRender,
                this.configs
            );
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(ArticleFeature);
