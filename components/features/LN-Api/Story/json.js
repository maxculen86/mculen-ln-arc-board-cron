import Consumer from 'fusion:consumer';
import IndexNotaV1 from '../../../private/LN/api/v1/global/story';
import IndexNotaMobileV1 from '../../../private/LN/api/v1/mobile/story';
import browser from '../../../private/common/utils/browser';

class Story {
    constructor(props) {
        this.props = props;

        const {
            globalContent: { _id: storyId, isListenable: isListenableValue }
        } = props;

        // Responde al resolver que permite pasar las versiones existentes
        // Regex actual: ^/api/v([1]+)/notas/byId/(.+)/$

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
                                hide_articles_summary
                                hide_articles_glossary_apps
                            }
                            migration {
                                deadline_livefyre
                            }
                         }`
            }
        });

        if (isListenableValue) {
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
        const { _id, ...restAudioNewsSource } = audionewsSource || {};

        try {
            return indexNota({
                ...globalContent,
                navigationTreeSource,
                ...restAudioNewsSource
            });
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(Story);
