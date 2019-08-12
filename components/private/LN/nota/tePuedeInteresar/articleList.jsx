import React from 'react';
import PropTypes from 'prop-types';
import ArticleItem from './articleItem';

const articles = [
    {
        href: 'https://facebook.com',
        imgSrc: 'https://bucket1.glanacion.com/anexos/fotos/22/3054322h600.jpg',
        volanta: 'The school ',
        titulo:
            'que tiene de escudo al Che Guevara y donde izan la bandera de Cuba'
    },
    {
        href: 'https://facebook.com',
        imgSrc: 'https://bucket1.glanacion.com/anexos/fotos/22/3054322h600.jpg',
        volanta: 'The school ',
        titulo:
            'que tiene de escudo al Che Guevara y donde izan la bandera de Cuba'
    },
    {
        href: 'https://facebook.com',
        imgSrc: 'https://bucket1.glanacion.com/anexos/fotos/22/3054322h600.jpg',
        volanta: 'The school ',
        titulo:
            'que tiene de escudo al Che Guevara y donde izan la bandera de Cuba'
    },
    {
        href: 'https://facebook.com',
        imgSrc: 'https://bucket1.glanacion.com/anexos/fotos/22/3054322h600.jpg',
        volanta: 'The school ',
        titulo:
            'que tiene de escudo al Che Guevara y donde izan la bandera de Cuba'
    },
    {
        href: 'https://facebook.com',
        imgSrc: 'https://bucket1.glanacion.com/anexos/fotos/22/3054322h600.jpg',
        volanta: 'The school ',
        titulo:
            'que tiene de escudo al Che Guevara y donde izan la bandera de Cuba'
    },
    {
        href: 'https://facebook.com',
        imgSrc: 'https://bucket1.glanacion.com/anexos/fotos/22/3054322h600.jpg',
        volanta: 'The school ',
        titulo:
            'que tiene de escudo al Che Guevara y donde izan la bandera de Cuba'
    },
    {
        href: 'https://facebook.com',
        imgSrc: 'https://bucket1.glanacion.com/anexos/fotos/22/3054322h600.jpg',
        volanta: 'The school ',
        titulo:
            'que tiene de escudo al Che Guevara y donde izan la bandera de Cuba'
    },
    {
        href: 'https://facebook.com',
        imgSrc: 'https://bucket1.glanacion.com/anexos/fotos/22/3054322h600.jpg',
        volanta: 'The school ',
        titulo:
            'que tiene de escudo al Che Guevara y donde izan la bandera de Cuba'
    },
    {
        href: 'https://facebook.com',
        imgSrc: 'https://bucket1.glanacion.com/anexos/fotos/22/3054322h600.jpg',
        volanta: 'The school ',
        titulo:
            'que tiene de escudo al Che Guevara y donde izan la bandera de Cuba'
    }
];

const ArticleList = props => {
    // const { articles } = props;
    return articles.map(e => <ArticleItem e={e} />);
};

export default ArticleList;
