import Consumer from 'fusion:consumer';
import IndexNotaV1 from '../../../private/LN/api/v1/nota';
import browser from '../../../private/common/utils/browser';
import get from '../../../private/common/utils/get';

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
                         }`
            }
        });

        this.versions = {
            1: IndexNotaV1
        };
    }

    render() {
        const indexNota = this.versions[
            browser.getApiVersion(this.props.requestUri)
        ];
        const { navigationTreeSource } = this.state || {};
        const { globalContent } = this.props;
        try {
            return indexNota({
                ...globalContent,
                termicas: get(navigationTreeSource, 'Termicas', null)
            });
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(Story);
