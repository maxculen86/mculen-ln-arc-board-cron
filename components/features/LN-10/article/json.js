import Consumer from 'fusion:consumer';
import get from '../../../private/common/utils/get';
import { renderProps } from '../../../private/LN/api/global/components/features/article/LN10/renderProps';
import { articleSourceNotaSourceInclude } from '../../../private/LN/api/global/components/features/article/common/sources/articleSourceNotaSourceInclude';
import { validateProps } from '../../../private/LN/api/global/components/features/article/LN10/props/validateProps';
import { validatePropsRender } from '../../../private/LN/api/global/components/features/article/LN10/props/validatePropsRender';
import {
    getChainConfig,
    validateArticleFeature,
    isInApertura,
    checkForId
} from './common/_helper-WebApi';
import videoFilterLN10 from '../../../../content/filters/LN/home/LN10/videoFilterLN10';
import { getArticleComments } from '../../../private/LN/api/common/elements/story/comments';

class ArticleFeature {
    constructor(props) {
        this.state = {};
        const {
            customFields: { noteId, imageId, video: videoId, variant },
            id: featureId,
            renderables = [],
            layout: layoutPageBuilder
        } = props;

        this.configs = getChainConfig({ featureId, renderables }) || {};
        const { config = {}, index } = this.configs;
        this.onlyOneApeturaValidateForWWW = isInApertura({
            layoutPageBuilder,
            renderables,
            featureId,
            config,
            articlePosition: index
        });

        const imageConfig = this.configs && this.configs.imageConfig;
        const typeCard = variant || 'default';
        const sourceInclude = articleSourceNotaSourceInclude(typeCard);
        this.props = validateProps(props, this.configs);

        const website = 'la-nacion-ar';

        if (checkForId(videoId)) {
            this.fetchContent({
                articleVideoLN10: {
                    source: 'videosJwSource',
                    query: {
                        id: checkForId(videoId),
                        website,
                        imageConfig,
                        isInApertura: this.onlyOneApeturaValidateForWWW,
                        arcSite: website
                    },
                    filter: videoFilterLN10
                }
            });
        }

        if (noteId) {
            this.fetchContent({
                articleSourceNotaLN10: {
                    source: 'articleSourceNota',
                    query: {
                        id: noteId.trim(),
                        imageConfig,
                        published: true,
                        checkExclusiveAccess: false,
                        isInApertura: this.onlyOneApeturaValidateForWWW,
                        sourceInclude,
                        isApi: true
                    }
                }
            });
        }

        if (imageId && imageId.trim()) {
            this.fetchContent({
                articleImageLN10: {
                    source: 'relatedImageSource',
                    query: {
                        id: imageId.trim(),
                        published: true,
                        imageConfig,
                        'arc-site': website,
                        nid: noteId,
                        boxType: 'ArticleFeature',
                        isInApertura: this.onlyOneApeturaValidateForWWW
                    }
                }
            });
        }

        this.fetchContent({
            navigationTreeSourceLN10: {
                source: 'navigationTreeSource',
                query: {
                    website: 'la-nacion-ar'
                },
                filter: `{
                            Termicas {
                                mostrar_videoloop,
                                livefyre
                            }
                            migration {
                                deadline_livefyre
                            }    
                         }`
            }
        });
    }

    render() {
        const { navigationTreeSourceLN10 } = this.state || {};
        const isVideoLoopEnabled =
            get(
                navigationTreeSourceLN10,
                'Termicas.mostrar_videoloop',
                'false'
            ) === 'true';

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

            articleSourceNotaRender.isVideoLoopEnabled = isVideoLoopEnabled;

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

            const dataNota = {
                ...articleSourceNotaRender,
                navigationTreeSource: navigationTreeSourceLN10,
                isVideoLoopEnabled
            };

            articleSourceNotaRender.comentarios = getArticleComments(dataNota);

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
