import React, { Component, Fragment } from 'react';
import TituloNota from '../../private/LN/nota/apertura/tituloNota/tituloNota';
import TagsNota from '../../private/LN/nota/apertura/tagsNota/tagsNota';
import Consumer from 'fusion:consumer';

class AperturaReceta extends Component {
    render() {
        return (
            <Fragment>
                <TituloNota {...this.props} />
                <TagsNota {...this.props} />
            </Fragment>
        );
    }
}

//AperturaReceta.label = 'Apertura receta'

export default Consumer(AperturaReceta);

/* import TituloNota from '../../private/LN/nota/apertura/tituloNota/tituloNota';
import TagsNota from '../../private/LN/nota/apertura/tagsNota/tagsNota';
import Consumer from 'fusion:consumer';

TituloNota.label = 'LN-AperturaReceta';

export default Consumer(TituloNota, TagsNota); */
