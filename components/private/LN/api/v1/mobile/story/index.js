import get from 'lodash.get';
import indexNotaData from '../../common/story/indexNotaData';
import cuerpo from './cuerpo/index';
import { removeEmptyItems } from '../../common/utils/responseCleaner';

const indexNota = dataNota => {
    const trust = get(dataNota, 'label.trust.text', null);
    let isTrust;
    if (trust) {
        isTrust = /nomostrartrust/.test(
            trust
                .toLowerCase()
                .replace(/ /g, '')
                .trim()
        );
    }
    const resp = {
        ...indexNotaData(dataNota, cuerpo),
        trust: !isTrust
    };
    let elmentsAdd = 1;
    const boxElements = [0, 4, 7, 9, 11];
    if (resp.contenido) {
        const { length } = resp.contenido;
        boxElements.forEach((boxElement, index) => {
            resp.contenido.forEach((element, i) => {
                const banner = { _t: 'banner' };
                if (i === boxElement && length >= boxElement) {
                    resp.contenido.splice(i + elmentsAdd, 0, banner);
                    elmentsAdd += 1;
                    if (i === 0) elmentsAdd = 1;
                }
            });
        });
    }
    return removeEmptyItems(resp);
};

export default indexNota;
