import React, { Component } from 'react';
import GrillaNotasComponent from '../../private/LN/acumulado/grillaNotas';

class GrillaNotas extends Component {
    render() {
        return (
            <>
                <GrillaNotasComponent />
            </>
        );
    }
}

GrillaNotas.label = 'LN-Acumulado-Grilla-Notas';
GrillaNotas.static = true;

export default GrillaNotas;
