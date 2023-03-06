import { isValidString } from '../../../common/utils/dataValidation';
import handleCookie from './handleCookie';

const crypto = require('crypto');

const permutiveIdentify = UsuarioDetalleEmail => {
    const { getCookie } = handleCookie();
    const idUser = getCookie('usuario%5Fid');

    return (
        window.permutive &&
        window.permutive.identify([
            isValidString(UsuarioDetalleEmail) && {
                id: crypto
                    .createHash('sha256')
                    .update(UsuarioDetalleEmail)
                    .digest('hex'),
                tag: 'email_sha256',
                priority: 0
            },
            isValidString(idUser) && {
                id: idUser,
                tag: 'userID',
                priority: 1
            }
        ])
    );
};

export default permutiveIdentify;
