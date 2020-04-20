import React from 'react';

export const ERRORS = {
    META_TAG_ATTRIBUTELESS: 'Debe especificar los atributos de la etiqueta meta'
};

const MetaTagsFactory = props => {
    if (!props) throw new Error(ERRORS.META_TAG_ATTRIBUTELESS);

    return React.createElement('meta', { ...props });
};

export default MetaTagsFactory;
