import Consumer from 'fusion:consumer';
import { getCollectionNotes as transform } from '../../../private/LN/api/common/collection';
import { BackendLnError } from '../../../private/LN/api/common/models/backendLnError';
import { removeEmptyItems } from '../../../private/LN/api/common/utils/responseCleaner';

class CollectionExternalClient {
    constructor(props) {
        this.props = props;
    }

    render() {
        try {
            const { globalContent: collection } = this.props;

            if (!collection) {
                throw new BackendLnError('No se encontro la collección.');
            }

            if (collection && collection?.content_elements.length === 0) {
                throw new BackendLnError('La collección no contiene notas.');
            }

            return removeEmptyItems(transform(collection));
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(CollectionExternalClient);
