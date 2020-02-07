import React from 'react';
import Proptypes from 'fusion:prop-types';

import '../../../../../resources/dist/css/ln/modules/caja-autoracu.css';

const CajaAutor = props => (
    <article className="mod-caja-autorAcu">
        {/* <a
            href={`${bio_page}?_website=la-nacion-ar`}
            title={`${firstName} ${lastName}`}
        > */}
        {console.log(props)}
        <a>
            <h3 className="com-title-section-autor hlp-marginBottom-10">
                {/* Joaquín Morales Solá */}
                {props.customFields.author}
            </h3>
            <p>
                {/* {typeof role === 'string' && role
            ? role.toUpperCase()
            : role} */}
                LA NACION
            </p>

            <figure className="mod-caja-autorAcu__figure">
                {/* {image && <img src={image} alt={`${firstName} ${lastName}`} />} */}
            </figure>

            <span className="--btn --secondary --small">TODAS LAS NOTAS</span>
        </a>
    </article>
);

export default CajaAutor;
