import indexNotaData from '../../common/story/indexNotaData';
import cuerpo from './cuerpo/index';
import { removeEmptyItems } from '../../common/utils/responseCleaner';

const indexNota = dataNota => {
    const resp = indexNotaData(dataNota, cuerpo);
    /*   resp.contenido.reduce((r, e, i) => {
        if (e) {
            const banner = { _t: 'banner' };
            if (i === 0) {
                r.splice(i + 1, 0, banner);
            }
            return r.concat(e);
        }
        return r;
    }, []); */
    const { length } = resp.contenido;
    const boxElements = [4, 7, 9, 11];
    let elmentsAdd = 0;
    for (let index = 0; index <= length; index++) {
        const banner = { _t: 'banner' };
        if (index === 0) {
            resp.contenido.splice(index + elmentsAdd + 1, 0, banner);
        }
        if (index === 4 && length >= 4) {
            resp.contenido.splice(index + elmentsAdd + 1, 0, banner);
            elmentsAdd++;
        }
        if (index === 7 && length >= 7) {
            resp.contenido.splice(index + elmentsAdd + 1, 0, banner);
        }
        if (index === 9 && length >= 9) {
            resp.contenido.splice(index + elmentsAdd + 2, 0, banner);
            elmentsAdd++;
        }
        if (index === 11 && length >= 11) {
            resp.contenido.splice(index + elmentsAdd + 3, 0, banner);
            elmentsAdd++;
        }
    }
    return removeEmptyItems(resp);
};

export default indexNota;
