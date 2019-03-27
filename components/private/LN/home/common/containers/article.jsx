import React, { Component } from 'react'
import ArticleComponent from '../components/article'

export default class Article extends Component {
  render() {
    const data = {
        renderClasses: 'art-01 m',
        volanta: 'prueba volanta',
        title: 'titulo prueba',
        imgUrls: {
            desktop: 'http://bucket2.glanacion.com/anexos/fotos/44/2733144h420.jpg',
            desktopSM: 'http://bucket2.glanacion.com/anexos/fotos/44/2733144h420.jpg',
            tablet: 'http://bucket2.glanacion.com/anexos/fotos/44/2733144h420.jpg',
            tabletSM: 'http://bucket2.glanacion.com/anexos/fotos/44/2733144h420.jpg',
            mobile: 'http://bucket2.glanacion.com/anexos/fotos/44/2733144h420.jpg',
            mobileSM: 'http://bucket2.glanacion.com/anexos/fotos/44/2733144h420.jpg'
        },
        url: 'https://www.lanacion.com.ar/economia/dolar/devaluacion-por-que-sube-dolar-argentina-nid2231139'
    }

    return (
      <>
        <ArticleComponent { ...data }/>
      </>
    )
  }
}
