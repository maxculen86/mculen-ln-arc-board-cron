import indexNotaData from '../../common/nota/indexNotaData';
import cuerpo from './cuerpo/index';
import { removeEmptyItems } from '../../common/utils/responseCleaner';

const indexNota = dataNota => {
    return removeEmptyItems(indexNotaData(dataNota, cuerpo));
};

export default indexNota;
