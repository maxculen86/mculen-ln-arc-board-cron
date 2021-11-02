import Consumer from 'fusion:consumer';
import IndexNotaV1 from '../../../private/LN/api/general/v1/nota';
import IndexNotaMobileV1 from '../../../private/LN/api/mobile/v1/nota';
import browser from '../../../private/common/utils/browser';

class Story {
    constructor(props) {
        this.props = props;

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
                                livefyre
                            }
                            migration {
                                deadline_livefyre
                            }
                         }`
            }
        });
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
        const indexNota = this.apiData[
            browser.getApiType(this.props.requestUri)
        ][browser.getApiVersion(this.props.requestUri)];
        const { navigationTreeSource } = this.state || {};
        const { globalContent } = this.props;
        try {
            return indexNota({
                ...globalContent,
                navigationTreeSource
            });
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(Story);
