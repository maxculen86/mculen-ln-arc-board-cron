import Consumer from 'fusion:consumer';
import {
    getChainCollectionFormated as transformToChainCollectionNotes,
    getCollectionNotes as transformToExternalClientNotes
} from '../../../private/LN/api/common/collection';
import { BackendLnError } from '../../../private/LN/api/common/models/backendLnError';
import { removeEmptyItems } from '../../../private/LN/api/common/utils/responseCleaner';

const tranformsFuntion = [
    {
        pattern: /mobile/,
        transformFn: transformToChainCollectionNotes
    }
];
class CollectionExternalClient {
    constructor(props) {
        this.props = props;
    }

    render() {
        try {
            const { globalContent: collection, requestUri } = this.props;

            if (!collection) {
                throw new BackendLnError('No se encontro la collección.');
            }

            if (collection && collection?.content_elements.length === 0) {
                throw new BackendLnError('La collección no contiene notas.');
            }

            const transformFn =
                tranformsFuntion.find(t => t.pattern.test(requestUri))
                    ?.transformFn || transformToExternalClientNotes;

            return removeEmptyItems(transformFn(collection));
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(CollectionExternalClient);
