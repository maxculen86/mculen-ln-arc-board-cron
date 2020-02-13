import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';

export const NoteCard = ({ content }) => (
    <p>{content && content.headlines && content.headlines.basic}</p>
);

NoteCard.propTypes = {
    content: PropTypes.shape({
        headlines: PropTypes.shape({
            basic: PropTypes.string
        })
    }).isRequired
};

const NoteFeature = props => {
    const {
        customFields: { idnota: id }
    } = props;

    const content = useContent({
        source: 'articleSourceNota',
        query: { id }
    });

    return <NoteCard content={content} />;
};

NoteFeature.label = 'LN Home NoteCard';

NoteFeature.propTypes = {
    customFields: PropTypes.shape({
        idnota: PropTypes.string.tag({
            label: 'Ingresar id de nota',
            description: 'Ingrese aquí el id de la nota'
        })
    }).isRequired
};

export default NoteFeature;
