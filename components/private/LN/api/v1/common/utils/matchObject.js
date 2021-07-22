import get from 'lodash.get';
import Config from '../../../../../../layouts/config/LN-Notas.config.json';

const matchObject = obj => {
    let finded = [];
    Config.Externas.map(v => {
        finded = v.params.map((current, i, result) => {
            return compareObject(obj, current);
        });
        return finded;
    });

    return finded.filter(x => x === true).length === 0;
};

const compareObject = (obj, param) => {
    let finded = true;
    const result = Object.entries(param).map(([key, value]) => {
        const objOrigen = get(obj, key, null);
        if (objOrigen === null || objOrigen === 'undefined') {
            return false;
        }
        if (typeof objOrigen !== typeof value) {
            return false;
        }
        if (Array.isArray(value)) {
            if (JSON.stringify(objOrigen) === JSON.stringify(value)) {
                return true;
            }
            if (objOrigen.length === 0 && value.length === 0) {
                return true;
            }
            if (
                (objOrigen.length === 0 && value.length > 0) ||
                (objOrigen.length > 0 && value.length === 0)
            ) {
                return false;
            }

            return (
                value
                    .map(p => {
                        return (
                            objOrigen
                                .map(o => {
                                    return compareObject(o, p);
                                })
                                .filter(x => x === true).length > 0
                        );
                    })
                    .filter(x => x === false).length === 0
            );
        }
        if (typeof objOrigen === 'object' && typeof value === 'object') {
            return compareObject(objOrigen, value);
        }
        if (typeof value === 'string') {
            return objOrigen === value;
        }
        finded = true;
        return finded;
    });

    return result.filter(x => x === false).length === 0;
};

export default matchObject;
