import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../common/context/authContext/foodit';
import { getConfig } from '../common/utils/promotions';
import getUserInitials from '../../../private/common/utils/getUserInitials';

const getUserType = (userEmail, isSubscribed) => {
    // TODO: Queda pendiente el validacion para el tipo suscribedPlus
    if (isSubscribed) {
        return 'subscribed';
    }

    if (userEmail) {
        return 'logged';
    }

    return 'unlogged';
};

const useGetUserData = () => {
    const {
        restoreContext,
        ProductoPremiumId = '',
        UsuarioDetalleEmail,
        UsuarioDetalleNombre,
        UsuarioDetalleApellido
    } = useContext(AuthContext) || {};

    // TODO: QUeda pendiente ver cual es la cookie para suscribedPlus
    const isSuscribed = ProductoPremiumId.includes('2');
    const [userType, setUserType] = useState('');

    useEffect(() => {
        setUserType(getUserType(UsuarioDetalleEmail, isSuscribed));
    }, []);

    return {
        userType,
        initials: getUserInitials(
            UsuarioDetalleNombre,
            UsuarioDetalleApellido,
            UsuarioDetalleEmail
        ),
        initialsClassName: isSuscribed ? 'bg-primary-positive' : 'bg-light-600',
        email: UsuarioDetalleEmail,
        suscription: isSuscribed ? 'Suscriptor digital' : 'Sin suscripción',
        isSuscribed,
        promotions: getConfig(userType),
        restoreContext
    };
};

export default useGetUserData;
