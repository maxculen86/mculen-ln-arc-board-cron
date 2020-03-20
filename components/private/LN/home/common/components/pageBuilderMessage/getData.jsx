import PropTypes from 'fusion:prop-types';

// TODO: Acá se deberá retornar la clase que corresponde agregar según el tipo del mensaje
export const getClass = type => type;

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
