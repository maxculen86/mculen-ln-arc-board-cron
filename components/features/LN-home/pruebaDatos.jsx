import React, { Component } from 'react';
import Prueba from '../../private/LN/home/common/containers/prueba';

class PruebaDatos extends Component {
    render() {
        return (
            <div>
                <Prueba id="recetas" />
            </div>
        );
    }
}

PruebaDatos.label = 'LN-Home-Prueba';
PruebaDatos.static = true;

export default PruebaDatos;
