import React from 'react';
import Consumer from 'fusion:consumer';
import WikiAuthor from '../../private/LN/acumulado/author/wikiAuthor';
import withStatic from '../../private/common/hocs/withStatic';
// import ModWikiAuthor from '../../private/common/mod-wikiAuthor';

const wikiAuthor = ({ globalContent }) => {
    return <WikiAuthor data={globalContent} />;
};

wikiAuthor.label = 'LN-Acumulado-Wiki-Autor';
export default withStatic(Consumer(wikiAuthor));
