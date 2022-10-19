import Consumer from 'fusion:consumer';
import IndexNotaMobileV1Text from '../../../private/LN/api/v1/mobile/storyText';
import browser from '../../../private/common/utils/browser';

// Responde al resolver que permite pasar las versiones existentes
// Regex actual: ^\/api\/mobile\/v([1])\/notas\/text\/(byId\/(.+)|byUrl\/(.+))(\/.*)$

class StoryText {
    constructor(props) {
        if (!props) throw new Error('Params prop cant be null or undefined');

        this.props = props;

        const {
            globalContent: {
                _id: storyId,
                last_updated_date: lastUpdatedDate,
                isListenable: isListenableValue
            }
        } = props;

        // Agrego validacion que permita distinguir si se debe buscar el audio de la nota
        if (isListenableValue) {
            this.fetch(storyId, lastUpdatedDate);
        }

        this.apiData = {
            mobile: {
                1: IndexNotaMobileV1Text
            }
        };
    }

    // Llamo al content source de audionews para obtener el audio de la nota
    fetch(storyid, lastupdateddate) {
        this.fetchContent({
            audionewsSource: {
                source: 'audionewsSource',
                query: {
                    id: storyid,
                    date: lastupdateddate
                }
            }
        });
    }

    render() {
        const indexNota = this.apiData[
            browser.getApiType(this.props.requestUri)
        ][browser.getApiVersion(this.props.requestUri)];
        const { audionewsSource } = this.state || {};
        const { globalContent } = this.props;

        try {
            return indexNota({
                ...globalContent,
                ...audionewsSource
            });
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(StoryText);
