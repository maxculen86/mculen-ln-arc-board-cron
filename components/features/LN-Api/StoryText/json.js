import Consumer from 'fusion:consumer';
import IndexNotaMobileV1Text from '../../../private/LN/api/v1/mobile/storyText';
import browser from '../../../private/common/utils/browser';
import get from '../../../private/common/utils/get';

// Responde al resolver que permite pasar las versiones existentes
// Regex actual: ^\/api\/mobile\/v([1])\/notas\/text\/(byId\/(.+)|byUrl\/(.+))(\/.*)$

class StoryText {
    constructor(props) {
        if (!props) throw new Error('Params prop cant be null or undefined');

        this.props = props;

        const {
            globalContent: { _id: storyId, isListenable: isListenableValue }
        } = props;

        // Obtengo la termica hide_listening_articles para luego filtrar si enviar la propiedad audio_url o no
        this.fetchContent({
            navigationTreeSource: {
                source: 'navigationTreeSource',
                query: {
                    website: 'la-nacion-ar'
                },
                filter: `{
                            Termicas {
                                hide_listening_articles,
                                hide_listening_articles_summary
                            }
                         }`
            }
        });

        this.audio = get(
            props.globalContent,
            'promo_items.audio_nota.embed.config',
            null
        );

        // Agrego validacion que permita distinguir si se debe buscar el audio de la nota
        if (isListenableValue && !this.audio) {
            this.fetch(storyId);
        }

        this.apiData = {
            mobile: {
                1: IndexNotaMobileV1Text
            }
        };
    }

    // Llamo al content source de audionews para obtener el audio de la nota
    fetch(storyid) {
        this.fetchContent({
            audionewsSource: {
                source: 'audionewsSource',
                query: {
                    id: storyid
                }
            }
        });
    }

    render() {
        const indexNota =
            this.apiData[browser.getApiType(this.props.requestUri)][
                browser.getApiVersion(this.props.requestUri)
            ];
        const { audionewsSource, navigationTreeSource } = this.state || {};
        const { globalContent } = this.props;

        try {
            return indexNota({
                dataAudio: this.audio || audionewsSource,
                ...globalContent,
                ...navigationTreeSource
            });
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(StoryText);
