import React from 'react';
import PropTypes from 'fusion:prop-types';

import '../../../resources/dist/css/ln/modules/mod-commentamp.css';
import ComLink from './com-link';

const ModCallToComments = ({ defaultLink, commentsLink, outputType }) => {
    return (
        (defaultLink && commentsLink && outputType === 'amp' && (
            <section className="mod-commentamp">
                <ComLink
                    textname="VER COMENTARIOS"
                    classCondition="--secondary"
                    link={commentsLink}
                />
                <ComLink link={defaultLink} textname="Ir a la nota original" />
            </section>
        )) ||
        null
    );
};

ModCallToComments.propTypes = {
    defaultLink: PropTypes.string.isRequired,
    commentsLink: PropTypes.string.isRequired,
    outputType: PropTypes.string.isRequired
};

export default ModCallToComments;
