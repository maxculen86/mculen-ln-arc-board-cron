import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import GridFooditServer from './helpers/gridFooditServer';
import GridFooditClient from './helpers/gridFooditClient';

function GrillaNotasFoodit({
    globalContent: { _id: id = '' },
    layout = '',
    customFields: { title = '', link = '', hide = false } = {}
}) {
    const maxArticles = 24;

    return (
        <>
            <GridFooditServer
                id={id}
                layout={layout}
                maxArticles={maxArticles}
                title={title}
                link={link}
                hide={hide}
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
    layout: PropTypes.string.isRequired,
    customFields: PropTypes.shape({
        title: PropTypes.string.tag({
            name: 'Título',
            description: 'Ingrese aquí el título de la grilla.',
            defaultValue: ''
        }),
        link: PropTypes.string.tag({
            name: 'URL del título',
            description:
                'Ingrese aquí la URL a la que debe redirigir el título de la grilla.',
            defaultValue: ''
        }),
        hide: PropTypes.bool.tag({
            name: 'Ocultar título',
            description: 'Clique si desea ocultar el título de la grilla.',
            defaultValue: false
        })
    }).isRequired
};

export default Consumer(GrillaNotasFoodit);
