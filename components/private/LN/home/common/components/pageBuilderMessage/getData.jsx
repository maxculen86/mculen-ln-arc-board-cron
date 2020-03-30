import PropTypes from 'fusion:prop-types';

export const getClass = type => {
    return `--${type}`;
};

getClass.propTypes = {
    type: PropTypes.string.isRequired
};

// TODO: Acá se deberá retornar el título que corresponde agregar según el tipo del mensaje
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

getTitle.propTypes = {
    type: PropTypes.string.isRequired
};
