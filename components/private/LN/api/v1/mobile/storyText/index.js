import cuerpo from './cuerpo/index';
import { removeEmptyItems } from '../../common/utils/responseCleaner';

const indexNotaText = dataNota => {
    if (!dataNota) throw new Error(`La información de la nota esta vacia`);
    const resp = {};
    resp.contenido = removeEmptyItems(cuerpo(dataNota));

    return resp.contenido && resp.contenido.length > 0
        ? { contenido: resp.contenido.join('\n') }
        : {};
};

export default indexNotaText;
