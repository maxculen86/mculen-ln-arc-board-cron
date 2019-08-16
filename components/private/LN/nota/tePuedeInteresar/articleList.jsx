import React from 'react';
import PropTypes from 'prop-types';
import ArticleItem from './articleItem';

const articless = [
    {
        href: 'https://facebook.com',
        image: 'https://bucket1.glanacion.com/anexos/fotos/22/3054322h600.jpg',
        volanta: 'The school ',
        title:
            'que tiene de escudo al Che Guevara y donde izan la bandera de Cuba'
    },
    {
        href: 'https://facebook.com',
        image: 'https://bucket1.glanacion.com/anexos/fotos/22/3054322h600.jpg',
        volanta: 'The school ',
        title:
            'que tiene de escudo al Che Guevara y donde izan la bandera de Cuba'
    },
    {
        href: 'https://facebook.com',
        image: 'https://bucket1.glanacion.com/anexos/fotos/22/3054322h600.jpg',
        volanta: 'The school ',
        title:
            'que tiene de escudo al Che Guevara y donde izan la bandera de Cuba'
    },
    {
        href: 'https://facebook.com',
        image: 'https://bucket1.glanacion.com/anexos/fotos/22/3054322h600.jpg',
        volanta: 'The school ',
        title:
            'que tiene de escudo al Che Guevara y donde izan la bandera de Cuba'
    },
    {
        href: 'https://facebook.com',
        image: 'https://bucket1.glanacion.com/anexos/fotos/22/3054322h600.jpg',
        volanta: 'The school ',
        title:
            'que tiene de escudo al Che Guevara y donde izan la bandera de Cuba'
    },
    {
        href: 'https://facebook.com',
        image: 'https://bucket1.glanacion.com/anexos/fotos/22/3054322h600.jpg',
        volanta: 'The school ',
        title:
            'que tiene de escudo al Che Guevara y donde izan la bandera de Cuba'
    },
    {
        href: 'https://facebook.com',
        image: 'https://bucket1.glanacion.com/anexos/fotos/22/3054322h600.jpg',
        volanta: 'The school ',
        title:
            'que tiene de escudo al Che Guevara y donde izan la bandera de Cuba'
    },
    {
        href: 'https://facebook.com',
        image: 'https://bucket1.glanacion.com/anexos/fotos/22/3054322h600.jpg',
        volanta: 'The school ',
        title:
            'que tiene de escudo al Che Guevara y donde izan la bandera de Cuba'
    },
    {
        href: 'https://facebook.com',
        image: 'https://bucket1.glanacion.com/anexos/fotos/22/3054322h600.jpg',
        volanta: 'The school ',
        title:
            'que tiene de escudo al Che Guevara y donde izan la bandera de Cuba'
    }
];

const ArticleList = props => {
    const { articles } = props;
    console.log('TCL: articles', articles);
    return articles.map(e => <ArticleItem e={e} />);
};

export default ArticleList;
