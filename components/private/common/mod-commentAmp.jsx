import React from 'react';
import PropTypes from 'fusion:prop-types';

import '../../../resources/dist/css/ln/modules/mod-commentamp.css';
import ComButton from './com-button';
import ComLink from './com-link';

const ModCommentAmp = props => {
    return (
        <section className="mod-commentamp">
            <ComButton
                textname="VER COMENTARIOS"
                classCondition="--secondary"
            />
            <ComLink link="#" textname="Ir a la nota original" />
        </section>
    );
};

export default ModCommentAmp;
