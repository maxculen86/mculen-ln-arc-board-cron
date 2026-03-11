/* eslint-disable react/require-default-props */
import React from 'react';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';
import WikiAuthor from '../../private/LN/acumulado/author/wikiAuthor';

const wikiAuthor = ({ globalContent, outputType, id: featureId }) => (
    <Static id={featureId}>
        <WikiAuthor data={globalContent} outputType={outputType} />
    </Static>
);

wikiAuthor.label = 'LN-Acumulado-Wiki-Autor';

export default Consumer(wikiAuthor);
