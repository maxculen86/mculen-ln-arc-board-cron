import indexNotaData from '../../common/story/indexNotaData';
import cuerpo from './cuerpo/index';
import { removeEmptyItems } from '../../common/utils/responseCleaner';

let elmentsAdd = 0;
const addBanner = (index, contenido, boxElement, length) => {
    const banner = { _t: 'banner' };
    if ((index === boxElement && length >= boxElement) || index === 1) {
        contenido.splice(index + elmentsAdd, 0, banner);
        elmentsAdd += 1;
    }
};
const indexNota = dataNota => {
    const resp = indexNotaData(dataNota, cuerpo);
    /*    let elmentsAdd = 0;
    const { length } = resp.contenido;
    resp.contenido.forEach((element, index) => {
        const banner = { _t: 'banner' };
        if (index === 0 && length >= 0) {
            resp.contenido.splice(index + 1, 0, banner);
            elmentsAdd++;
        }
        if (index === 4 && length >= 4) {
            resp.contenido.splice(index + elmentsAdd, 0, banner);
            elmentsAdd++;
        }
        if (index === 7 && length >= 7) {
            resp.contenido.splice(index + elmentsAdd, 0, banner);
            elmentsAdd++;
        }
        if (index === 9 && length >= 9) {
            resp.contenido.splice(index + elmentsAdd, 0, banner);
            elmentsAdd++;
        }
        if (index === 11 && length >= 11) {
            resp.contenido.splice(index + elmentsAdd, 0, banner);
            elmentsAdd++;
        }
    }); */
    const { length } = resp.contenido;
    const boxElements = [0, 4, 7, 9, 11];
    for (let index = 0; index <= length; index++) {
        addBanner(index, resp.contenido, 0, length);
        addBanner(index, resp.contenido, 4, length);
        addBanner(index, resp.contenido, 7, length);
        addBanner(index, resp.contenido, 9, length);
        addBanner(index, resp.contenido, 11, length);
    }
    return removeEmptyItems(resp);
};

export default indexNota;
