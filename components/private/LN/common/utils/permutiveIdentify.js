import { isValidString } from '../../../common/utils/dataValidation';
import handleCookie from './handleCookie';

const crypto = require('crypto');

const permutiveIdentify = usuarioDetalleEmail => {
    const { getCookie } = handleCookie();
    const idUser = getCookie('usuario%5Fid');
    const identitiesArray = [];

    isValidString(usuarioDetalleEmail) &&
        usuarioDetalleEmail &&
        identitiesArray.push({
            id: crypto
                .createHash('sha256')
                .update(usuarioDetalleEmail)
                .digest('hex'),
            tag: 'email_sha256',
            priority: 0
        });

    isValidString(idUser) &&
        idUser &&
        identitiesArray.push({
            id: idUser,
            tag: 'userID',
            priority: 1
        });

    return (
        identitiesArray.length > 0 &&
        window.permutive &&
        window.permutive.identify(identitiesArray)
    );
};

export default permutiveIdentify;
