import { SITE_LANACION } from 'fusion:environment';

const ICON_VARIANTS = {
    danger: {
        icon: 'danger',
        fill: 'var(--danger-500)'
    },
    success: {
        icon: 'checked',
        fill: 'var(--success-700)'
    },
    info: {
        icon: 'info',
        fill: 'var(--info-700)'
    }
};

export const getIconProps = ({ variant }) =>
    ICON_VARIANTS[variant] || {
        icon: 'warning',
        fill: 'currentColor'
    };

export const TOAST_CONFIG = {
    SUCCESS: {
        TITLE: '¡Listo!',
        VARIANT: 'success',
        MESSAGE: {
            DELETE_BOOKMARK: 'Se borró de "Mis notas"',
            ADD_BOOKMARK: 'Podés acceder desde "Menú de usuario"',
            ADD_NEWSLLETER: 'Pronto recibirás nuestro newsletter.'
        }
    },
    WARNING: {
        TITLE: '¡Atención!',
        VARIANT: 'warning',
        MESSAGE: {
            LIMIT_REACHED:
                'No se pudo guardar porque llegaste al límite permitido.'
        }
    },
    ERROR: {
        TITLE: '¡Ups!',
        VARIANT: 'danger',
        MESSAGE: {
            CONNECTION: 'Hubo un problema de conexión. Reintenta más tarde.',
            ADD_NEWSLLETER:
                'No pudimos sincronizar tus suscripciones. Volvé a intentarlo en unos minutos.'
        }
    },
    BUTTON_PROPS: {
        BOOKMARK: {
            children: 'Mis Notas',
            title: 'Ir a mis notas',
            'area-label': 'Ir a mis notas',
            href: `${SITE_LANACION}/mis-notas/`
        },
        NEWSLETTER_BOX: {
            children: 'Newsletter',
            title: 'Ir al newsletter de LA NACION',
            'area-label': 'Ir al newsletter de LA NACION',
            target: '_blank',
            href: 'https://newsletter.lanacion.com.ar/#/'
        }
    }
};
