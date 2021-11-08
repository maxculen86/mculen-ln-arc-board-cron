import indexNotaData from '../../common/nota/indexNotaData';
import cuerpo from './cuerpo/index';

const indexNota = dataNota => {
    return indexNotaData(dataNota, cuerpo);
};

export default indexNota;
