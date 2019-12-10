import React from 'react';
import PropTypes from 'fusion:prop-types';
import Carousell from '../private/common/carousell';
import Title from '../private/common/title';

const Carrusel = props => {
    return (
        <section>
            <Carousell>{props.children}</Carousell>
        </section>
    );
};

Carrusel.propTypes = {
    customFields: PropTypes.shape({
        title: PropTypes.string.tag({ label: 'Titulo' })
    })
};

export default Carrusel;
