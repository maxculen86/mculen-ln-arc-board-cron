import indexNotaData from '../../common/story/indexNotaData';
import cuerpo from './cuerpo/index';
import { removeEmptyItems } from '../../common/utils/responseCleaner';

const indexNota = dataNota => {
    const resp = indexNotaData(dataNota, cuerpo);
    const banners = [
        { id: 1, name: 'caja' },
        { id: 2, name: 'caja' },
        { id: 3, name: 'caja' },
        { id: 4, name: 'caja' },
        { id: 5, name: 'caja' }
    ];
    resp.contenido.reduce((r, e) => {
        if (e && Array.isArray(e) && e.length > 0) {
            return r.concat(e);
        }
        return r;
    }, []);
    return removeEmptyItems(resp);
};

export default indexNota;
