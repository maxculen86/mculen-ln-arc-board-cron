import {
    LOGIN_URL,
    SITIO_SEGURO_REGISTRACION,
    MY_ACCOUNT_URL
} from 'fusion:environment';

export const getCurrentUrlCallback = () =>
    typeof window === 'undefined' ? '' : window.btoa(window.location.href);

export const buttonData = {
    text: 'SUSCRIBITE AHORA',
    href: `${SITIO_SEGURO_REGISTRACION}/ln/suscribirme?cv=670&fc=744&callback=`
};

export const getButtonData = () => ({
    ...buttonData,
    href: `${buttonData.href}${getCurrentUrlCallback()}`
});

export const unLoggedData = {
    text: '¿Ya sos suscriptor?',
    textLink: 'Iniciar sesión',
    href: LOGIN_URL
};

export const loggedData = {
    text: '¿Tenés Club LA NACION Black o Premium?',
    textLink: 'Vincular credencial',
    href: `${MY_ACCOUNT_URL}/vincular-credencial/`
};

export const getFooterData = isLogged =>
    isLogged
        ? loggedData
        : {
              ...unLoggedData,
              href: `${unLoggedData.href}${getCurrentUrlCallback()}`
          };

export const barrierMessages = {
    BOOKMARK: 'Para guardar tus notas, necesitás suscribirte',
    IA_SUMMARY: 'Para acceder al resumen con IA, necesitás suscribirte',
    AUDIO: 'Para escuchar las notas, necesitás suscribirte'
};
