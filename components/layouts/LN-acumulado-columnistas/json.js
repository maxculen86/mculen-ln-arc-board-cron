import Consumer from 'fusion:consumer';
import { removeEmptyItems } from '../../private/LN/api/v1/common/utils/responseCleaner';

const layoutItemsColumnistas = [
    'Pre-Apertura',
    'Breadcrumb/Titulo',
    'Autores',
    'Aside'
];

const LNAcumuladoColumnistasLayout = props => {
    const { children } = props;
    const authors = children
        .filter(e => e && Array.isArray(e) && e.length > 0)
        .map(c => c);
    return removeEmptyItems(authors);
};

LNAcumuladoColumnistasLayout.sections = layoutItemsColumnistas;

export default Consumer(LNAcumuladoColumnistasLayout);
