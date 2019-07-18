/* import React, { Component } from 'react';
import {TituloNota} from '../../private/LN/nota/apertura/tituloNota';
import Consumer from 'fusion:consumer';

class AperturaReceta extends Component {
    render() {
        return <TituloNota {...this.props} />;
    }
}

//AperturaReceta.label = 'Apertura receta'

export default Consumer(AperturaReceta) */

import { TituloNota } from '../../private/LN/nota/apertura/tituloNota/index';
import Consumer from 'fusion:consumer';

TituloNota.label = 'LN-AperturaReceta';

export default Consumer(TituloNota);
