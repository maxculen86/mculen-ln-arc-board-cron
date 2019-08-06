import React, { Component } from 'react';
import WithArticles from '../hocs/withArticlesData';
import filter from '../../../../../../content/filters/LN/home/articles';

class Prueba extends Component {
    render() {
        if (this.props.articles) {
            console.log('ARTICULOS: ', this.props.articles);
        }
        return <div>Probando</div>;
    }
}

export default WithArticles(Prueba, filter);
