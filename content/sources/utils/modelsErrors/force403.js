import UnAuthorization from './unAuthorization';

const force403 = msj => {
    throw new UnAuthorization(`Acceso No autorizado - ${msj}`);
};

export default force403;
