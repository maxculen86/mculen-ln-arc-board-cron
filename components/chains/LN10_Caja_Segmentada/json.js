import Consumer from 'fusion:consumer';
import get from '../../private/common/utils/get';
import { getCommonPropsJson } from '../../private/LN/common/utils/cajaTemasValidators';
import getViewabilityRoof from '../utils/getViewabilityRoof';
import isTodayEnabled from '../utils/isTodayEnabled';
import { validateChain } from './common/_helper-WebApi';

const LAYOUT_DIAGRAMATION = 'bn_3_grid';
const shouldSkipRender = (
    { hideCaja = false, enabledDays = [], shouldSchedule = false },
    isRenderableByTermica = false
) => {
    if (!shouldSchedule) {
        return hideCaja || !isRenderableByTermica;
    }

    return (
        hideCaja ||
        !isRenderableByTermica ||
        enabledDays.length === 0 ||
        !isTodayEnabled(enabledDays)
    );
};

const logConfigError = (configError, customFields) => {
    console.warn(
        JSON.stringify(
            {
                name: 'BackendLnWarn',
                log_details: {
                    message: `${typeof configError === 'object' ? JSON.stringify(configError) : ''}`,
                    customFields
                }
            },
            null,
            2
        )
    );
};

class CajaSegmentada {
    constructor(props) {
        const { customFields } = props;
        const { notesQuantity } = getCommonPropsJson(props);
        this.props = props;
        this.state = {};
        this.customFields = customFields;
        this.noteCount = notesQuantity;
        this.initialPosition = (customFields?.initialPosition ?? 1) - 1;
        this.fetchContent({
            navigationTreeSource: {
                source: 'navigationTreeSource',
                query: {
                    website: 'la-nacion-ar'
                },
                filter: `{
                            Termicas {
                                caja_segmentada
                            }
                         }`
            }
        });

        if (customFields?.idCollection.trim()) {
            const query = {
                id: customFields?.idCollection,
                website: 'la-nacion-ar',
                size: 20,
                from: this.initialPosition,
                filterRecomendar: true,
                filterRepetead: true,
                notesQuantity,
                diagramation: LAYOUT_DIAGRAMATION
            };

            this.fetchContent({
                articleList: {
                    source: 'collectionsSource',
                    query,
                    filter: `content_elements {
                                _id
                                website_url }`,
                    sourceInclude: 'content_elements'
                }
            });
        }
    }

    render() {
        try {
            const { id: chainId, renderables = [] } = this.props;
            const { navigationTreeSource, articleList } = this.state || {};
            const isRenderableByTermica =
                get(
                    navigationTreeSource,
                    `Termicas.caja_segmentada`,
                    'false'
                ) === 'true';

            const {
                idCollection,
                segment = '',
                ...propsForRoof
            } = this.customFields;

            if (shouldSkipRender(this.customFields, isRenderableByTermica)) {
                return null;
            }

            const articles = get(articleList, 'content_elements', []);

            const configError = validateChain(
                {
                    idCollection,
                    segment,
                    articles
                },
                true
            );

            if (configError) {
                logConfigError(configError, this.customFields);
                return null;
            }

            const viewabilityRoof = getViewabilityRoof(
                chainId,
                renderables,
                propsForRoof
            );

            const information = {
                ...this.customFields,
                initialPosition: this.initialPosition,
                layout: LAYOUT_DIAGRAMATION,
                noteCount: this.noteCount,
                viewabilityRoof
            };

            return {
                information,
                articles
            };
        } catch (err) {
            console.error(
                JSON.stringify(
                    {
                        name: 'BackendLnError',
                        log_details: {
                            message: err.message
                        }
                    },
                    null,
                    2
                )
            );
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(CajaSegmentada);
