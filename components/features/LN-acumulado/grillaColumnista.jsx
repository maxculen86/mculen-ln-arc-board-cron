import PropTypes from 'fusion:prop-types';
import GrillaColumnistas from '../../private/LN/acumulado/grillaColumnistas';

GrillaColumnistas.label = 'LN-Acumulado-Grilla-Columnistas';

GrillaColumnistas.propTypes = {
    authors: PropTypes.arrayOf(PropTypes.object).isRequired,
    obtenerMasNotas: PropTypes.func.isRequired,
    mostrarBtnMasNotas: PropTypes.bool.isRequired,
    customFields: PropTypes.shape({
        gridTitle: PropTypes.string.tag({
            label: `Titulo de la Grilla`
        })
    })
};

export default GrillaColumnistas;
