import React from 'react';
import PropTypes from 'fusion:prop-types';

import ComLink from './com-link';

const ModFirma = props => {
    const { autor, classCondition } = props;
    return (
        <div className="container-firma">
            {autor &&
                autor.map(author => (
                    <ComLink
                        key={author.name}
                        textname={author.name}
                        link={author.link}
                        classCondition={classCondition}
                        title={`Ir a las notas de ${author.name}`}
                    />
                ))}
        </div>
    );
};

ModFirma.propTypes = {
    autor: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            link: PropTypes.string
        })
    ).isRequired,
    classCondition: PropTypes.string.isRequired
};

export default ModFirma;
