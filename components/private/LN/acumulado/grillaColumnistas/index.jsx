import PropTypes from 'fusion:prop-types';
import GrillaColumnistas from './components/grilla';
import WithColumnistData from '../hocs/WithColumnistData';

GrillaColumnistas.propTypes = {
    authors: PropTypes.arrayOf(PropTypes.object).isRequired,
    obtenerMasNotas: PropTypes.func.isRequired,
    mostrarBtnMasNotas: PropTypes.bool.isRequired,
    customFields: PropTypes.object
};

export default WithColumnistData(GrillaColumnistas);
