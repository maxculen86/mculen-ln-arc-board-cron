export const toastProps = {
    success: {
        variant: 'success',
        title: '¡Listo!',
        message: `Pronto recibirás nuestro newsletter.`,
        closable: true,
        buttonProps: {
            label: 'Newsletter',
            href: 'https://newsletter.lanacion.com.ar/#/',
            variant: 'secondary',
            target: '_blank',
            title: 'Ir al newsletter de LA NACION'
        },
        pauseOnHover: true
    },
    error: {
        variant: 'danger',
        title: 'Ha ocurrido un error.',
        message: `No pudimos sincronizar tus suscripciones. Volvé a intentarlo en unos minutos.`,
        closable: true,
        pauseOnHover: true
    }
};
