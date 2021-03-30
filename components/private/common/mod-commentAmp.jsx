import React from 'react';
import PropTypes from 'fusion:prop-types';
import withStatic from '../common/hocs/withStatic';

import '../../../resources/dist/css/ln/modules/mod-commentamp.css';
import ComButton from './com-button';
import ComLink from './com-link';

const ModCommentAmp = props => {
    return (
        <section className="mod-commentamp">
            <ComLink link="#" textname="VER COMENTARIOS" />
            <ComLink link="#" textname="Ir a la nota original" />
        </section>
    );
};

export default withStatic(ModCommentAmp);
