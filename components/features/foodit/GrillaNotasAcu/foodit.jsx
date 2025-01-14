import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import GridFooditServer from './helpers/gridFooditServer';
import GridFooditClient from './helpers/gridFooditClient';

function GrillaNotasFoodit({ globalContent: { _id: id = '' }, layout = '' }) {
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
}

GrillaNotasFoodit.propTypes = {
    globalContent: PropTypes.shape({
        _id: PropTypes.string
    }).isRequired,
    layout: PropTypes.string.isRequired
};

export default Consumer(GrillaNotasFoodit);
