import React, { Component } from 'react';
import TaxonomyComponent from '../../common/taxonomyImportantList';

const tags = ({ tags, destacado }) => {
    const listTags = tags.map(x => {
        return {
            path: x.slug,
            text: x.text
        };
    });
    return <TaxonomyComponent list={listTags} destacado={destacado} />;
};

//proptypes para definir que me tiene que llegar un array de tags y un destacado bool

export default tags;
