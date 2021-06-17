import handleCookie from '../../LN/common/utils/handleCookie';

const urlApiSuscripcion =
    'https://api-paywall.lanacion.com.ar/1/SuscripcionV1/ObtenerSuscripcionDigitalAnalytics';

export const setStorageConfiguration = notaId => {
    if (typeof window === 'undefined') return false;
    counterNota(notaId);
    return true;
};

export const getAndSaveCustomDimension = () => {
    const { getCookie } = handleCookie();
    const usuarioLogeado = getCookie('token');
    const productoId = getCookie('ProductoPremiumId');
    const clubLn = getCookie('usuarioDetalleClubNacion');
    const userId = getCookie('usuario%5Fid');
    const usuarioRegistrado = getCookie('usuarioemail');

    if (usuarioLogeado != null) {
        getSuscriptorType(usuarioLogeado);
        localStorage.setItem('CDusuarioLogeado', 'yes');
    } else {
        localStorage.setItem('CDsuscriptorType', 'N/A');
        localStorage.setItem('CDusuarioLogeado', 'no');
    }

    localStorage.setItem('CDcacheCommon', Date.now());
    localStorage.setItem('CDpayUser', productoId ? 'yes' : 'no');
    localStorage.setItem('CDcredentialType', clubLn || 'N/A');
    localStorage.setItem('CDuserId', userId || 'N/A');
    localStorage.setItem(
        'CDusuarioRegistrado',
        usuarioRegistrado ? 'yes' : 'no'
    );

    return true;
};

const getSuscriptorType = token => {
    fetch(urlApiSuscripcion, {
        method: 'POST',
        headers: {
            'X-Token': token,
            'Content-Type': 'application/json'
        },
        body: undefined
    })
        .then(res => res.json())
        .then(res => saveSuscriptorType(res));
};

const saveSuscriptorType = data => {
    if (data && data.code === '0000') {
        const combo = data.response && data.response.nombre;
        localStorage.setItem('CDsuscriptorType', combo);
    } else {
        localStorage.setItem('CDsuscriptorType', 'N/A');
    }
};

export const counterNota = notaId => {
    let lsNotasCounter = JSON.parse(localStorage.getItem('NotasCounterData'));

    const today = new Date();
    const fecha = `${today.getFullYear()}-${today.getMonth() +
        1}-${today.getDate()}`;

    if (lsNotasCounter != null) {
        // Se encarga de filtrar las notas que superan los X dias ( 28 seteado hoy )
        lsNotasCounter = filterNotesWithinDays(lsNotasCounter, 28);

        if (!lsNotasCounter.some(n => n.notaId === notaId)) {
            lsNotasCounter.push({ notaId, fecha });
        }
    }

    if (lsNotasCounter == null) {
        lsNotasCounter = [{ notaId, fecha }];
    }

    localStorage.setItem('NotasCounterData', JSON.stringify(lsNotasCounter));
    localStorage.setItem('countNotas', lsNotasCounter.length);
};

export const filterNotesWithinDays = (notas, days) => {
    const today = new Date();
    const lsDayCheckCounter = localStorage.getItem('DayCheckCounter');
    let newNotas = { ...notas };
    // Una vez por dia para ser mas performante
    if (lsDayCheckCounter !== today.getDate()) {
        newNotas = notas.filter(n => checkDateCounter(n.fecha, days));
    }
    localStorage.setItem('DayCheckCounter', today.getDate());
    return newNotas;
};

const checkDateCounter = (fechaCheck, days) => {
    const date1 = new Date(fechaCheck);
    const date2 = new Date(Date.now());
    // eslint-disable-next-line radix
    const diffDays = parseInt((date2 - date1) / (1000 * 60 * 60 * 24));

    if (diffDays < days) {
        return true;
    }

    return false;
};

/*
    export const init = () => {
        const { getCookie } = handleCookie();
        const cookieToken = getCookie('token');

        if (cookieToken === '') {
            clearLocalstorage();
            return false;
        }

        const lsToken = localStorage.getItem('token');
        // si la cookie tiene el mismo token que el localstorage
        if (cookieToken === lsToken) {
            // Devuelve si la sesion sigue siendo valida
            if (!isSessionDateExpired()) {
                return true;
            }
        }

        clearLocalstorage();
        // Se llama al clearCustomDImension porque unicamente se limpia al 
        // cambiarse el token y no al deslogearse
        clearCustomDimension();
        localStorage.setItem('token', cookieToken);
        localStorage.setItem('sessionCreated', Date.now());
        localStorage.setItem('CDusuarioLogeado', 'yes');
        return true;
    };

    const isSessionDateExpired = () => {
        const sessionCreatedDate = localStorage.getItem('sessionCreated');
        let sessionCacheMiliseconds = 900000; // TODO:pasar a configuracion
        let dif = 0;

        if (sessionCreatedDate === null) {
            return true;
        }

        dif = Date.now() - sessionCreatedDate;
        if (dif < sessionCacheMiliseconds) {
            return false;
        }
        return true;
    };

    const clearLocalstorage = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('sugerenciasTitulares');
        localStorage.removeItem('fechaSugerenciaTitulares');
        localStorage.removeItem('CDusuarioLogeado');
    };
    
    const clearCustomDimension = () => {
        // Solo tiene que llamarse al clearCustomDimension cuando cambio el token y
        // no cuando se deslogeo
        localStorage.removeItem('CDcacheCommon');
        localStorage.removeItem('CDusuarioLogeado');
        localStorage.removeItem('CDusuarioRegistrado');
        localStorage.removeItem('CDpayUser');
        localStorage.removeItem('CDsuscriptorType');
        localStorage.removeItem('CDcredentialType');
        localStorage.removeItem('CDuserId');
    };
*/
