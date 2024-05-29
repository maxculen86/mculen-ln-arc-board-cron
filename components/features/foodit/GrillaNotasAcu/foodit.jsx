import React from 'react';
import Consumer from 'fusion:consumer';
import GridFooditServer from './helpers/gridFooditServer';
import GridFooditClient from './helpers/gridFooditClient';

const GrillaNotasFoodit = ({
    globalContent: { _id: id = '' },
    layout = ''
}) => {
    const maxArticles = 24;

    return (
        <>
            <GridFooditServer
                id={id}
                layout={layout}
                maxArticles={maxArticles}
            />
            <GridFooditClient
                id={id}
                layout={layout}
                maxArticles={maxArticles}
            />
        </>
    );
};

export default Consumer(GrillaNotasFoodit);
