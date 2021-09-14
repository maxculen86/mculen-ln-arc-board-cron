import Consumer from 'fusion:consumer';
import { removeEmptyItems } from '../../private/LN/api/common/utils/responseCleaner';

const LNAcumuladoColumnistasLayout = props => {
    const { children } = props;
    const authors = children
        .filter(e => e && Array.isArray(e) && e.length > 0)
        .map(c => c);
    return removeEmptyItems(authors);
};

export default Consumer(LNAcumuladoColumnistasLayout);
