import { validateValueText } from '../../../../common/utils/validateValue';

const header = (nodo, dataNota) => {
    if (!nodo) return null;

    const value = nodo.content;

    if (!value) return null;
    if (validateValueText(value)) return null;

    return {
        _t: 'header',
        level: nodo.level,
        value
    };
};

export default header;
