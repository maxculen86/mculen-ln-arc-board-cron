import Consumer from 'fusion:consumer';
import IndexNotaV1 from '../../../private/LN/api/v1/global/story';
import IndexNotaMobileV1 from '../../../private/LN/api/v1/mobile/story';
import browser from '../../../private/common/utils/browser';
import dateAndTimeUtil from '../../../private/common/utils/dateAndTimeUtil';
import get from '../../../private/common/utils/get';
import { getZocaloAppsProps } from '../../LN-nota/infoBox/helper';

class Story {
    constructor(props) {
        // Responde al resolver que permite pasar las versiones existentes
        // Regex actual: ^/api/v([1]+)/notas/byId/(.+)/$
        this.props = props;
        const {
            globalContent: { _id: storyId, isListenable: isListenableValue },
            globalContentConfig: { query }
        } = props;

        const audio = get(
            props.globalContent,
            'promo_items.audio_nota.embed.config',
            null
        );

        const isAudioNewsFetch = get(query, 'ticks', false);

        this.fetchContent({
            navigationTreeSource: {
                source: 'navigationTreeSource',
                query: {
                    website: 'la-nacion-ar'
                },
                filter: `{
                            Termicas {
                                banners,
                                liftigniter,
                                livefyre,
                                hide_articles_summary_apps,
                                hide_articles_glossary_apps
                            }
                            migration {
                                deadline_livefyre
                            }
                         }`
            }
        });

        // Si la nota es escuchable, no se obtuvo audio desde globalContent
        // y no se hizo ya la consulta a audionews, se realiza la consulta
        if (isListenableValue && !isAudioNewsFetch && !audio) {
            this.fetchContent({
                audionewsSource: {
                    source: 'audionewsSource',
                    query: {
                        id: storyId
                    }
                }
            });
        }

        this.apiData = {
            global: {
                1: IndexNotaV1
            },
            mobile: {
                1: IndexNotaMobileV1
            }
        };
    }

    render() {
        const indexNota =
            this.apiData[browser.getApiType(this.props.requestUri)][
                browser.getApiVersion(this.props.requestUri)
            ];
        const { navigationTreeSource, audionewsSource } = this.state || {};

        const { globalContent } = this.props;

        const path = get(globalContent, 'taxonomy.primary_section.path', null);
        const audio = get(
            globalContent,
            'promo_items.audio_nota.embed.config',
            null
        );
        const zocalo = getZocaloAppsProps(path);
        let footer = null;
        if (zocalo) {
            footer = [{ ...zocalo }];
        }

        const handleExternalStoryRedirection = () => ({
            id: 'N/A',
            url: globalContent?.externalApiRedirectUrl,
            enviarApps: false,
            fecha: `${Object.values(dateAndTimeUtil(new Date())).join(' • ')}`
        });

        const { _id, ...restAudioNewsSource } = audionewsSource || {};
        try {
            if (
                globalContent?.externalApiRedirectUrl &&
                Object.keys(globalContent?.externalApiRedirectUrl).length !== 0
            )
                return handleExternalStoryRedirection();

            return indexNota({
                ...globalContent,
                navigationTreeSource,
                dataAudio: audio || restAudioNewsSource,
                footer
            });
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(Story);
