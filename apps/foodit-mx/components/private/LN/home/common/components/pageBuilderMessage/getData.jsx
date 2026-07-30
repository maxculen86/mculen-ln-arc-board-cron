export const getClass = type => `--${type}`;

export const getTitle = type => {
    switch (type) {
        case 'danger':
            return 'Error';
        case 'warning':
            return 'Advertencia';
        case 'info':
            return 'Información';
        case 'success':
            return 'Proceso exitoso';
        default:
            return type;
    }
};
