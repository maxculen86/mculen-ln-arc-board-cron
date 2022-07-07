import get from '../../../../../common/utils/get';
import { storyCommon, storyHeadline } from '../../common/story/storyCommon';
import cuerpo from './cuerpo/index';
import { removeEmptyItems } from '../../common/utils/responseCleaner';

const indexNota = dataNota => {
    const resp = {
        ...storyCommon(dataNota, cuerpo),
        ...storyHeadline(dataNota, 'mobile')
    };

    let elmentsAdd = 0;
    const boxElements = [0, 3, 6, 8, 10];
    if (resp.contenido) {
        const { length } = resp.contenido;
        boxElements.forEach((boxElement, index) => {
            let boxElementValidate = boxElement + elmentsAdd;
            resp.contenido.every((element, i) => {
                const banner = { _t: 'banner' };
                const type = get(element, '_t', null);

                if (type && type === 'header' && i === boxElementValidate) {
                    boxElementValidate += 1;
                }
                if (i === boxElementValidate && length >= boxElement) {
                    resp.contenido.splice(i + 1, 0, banner);
                    elmentsAdd += 1;
                    return false;
                }
                return true;
            });
        });
    }
    return removeEmptyItems(resp);
};

export default indexNota;
