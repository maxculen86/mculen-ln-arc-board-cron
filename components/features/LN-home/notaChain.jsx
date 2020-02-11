import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';

export const Nota = ({ content }) => (
    <p>{content && content.headlines && content.headlines.basic}</p>
);

Nota.propTypes = {
    content: PropTypes.shape({
        headlines: PropTypes.shape({
            basic: PropTypes.string
        })
    }).isRequired
};

const NotaChain = props => {
    const {
        customFields: { idnota: id }
    } = props;

    const content = useContent({
        source: 'articleSourceNota',
        query: { id }
    });

    return <Nota content={content} />;
};

NotaChain.label = 'LN-HOME-NOTA';
NotaChain.propTypes = {
    customFields: PropTypes.shape({
        idnota: PropTypes.string.tag({
            label: 'Ingresar id de nota',
            description: 'Ingrese aquí el id de la nota'
        })
    })
};

export default NotaChain;
