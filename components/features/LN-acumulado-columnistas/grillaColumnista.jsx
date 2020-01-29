import React from 'react';
import PropTypes from 'fusion:prop-types';
import GrillaColumnistas from '../../private/LN/acumulado/grillaColumnistas';
import WithColumnistData from '../../private/LN/acumulado/hocs/WithColumnistData';

const ColumnistasFeature = ({
    authors,
    obtenerMasNotas,
    mostrarBtnMasNotas
}) => {
    return (
        <GrillaColumnistas
            authors={authors}
            obtenerMasNotas={obtenerMasNotas}
            mostrarBtnMasNotas={mostrarBtnMasNotas}
        />
    );
};

ColumnistasFeature.label = 'LN-Acumulado-Grilla-Columnistas';

ColumnistasFeature.propTypes = {
    authors: PropTypes.arrayOf(PropTypes.object).isRequired,
    obtenerMasNotas: PropTypes.func.isRequired,
    mostrarBtnMasNotas: PropTypes.bool.isRequired
};

export default WithColumnistData(ColumnistasFeature);
