import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import ArticleComponent from '../components/article'
import SourceSetSizes from '../config/sourceSets.json'
import filter from '../../../../../../content/filters/LN/home/article'
import WithArticleData from '../hocs/withArticleData'

class Article extends Component {
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
    console.log(this.props)
    // obtenerUrlsSourceSets('M', this.props.promo_items.basic.additional_properties.resizeUrl)
    
    return (
      <>
        <ArticleComponent { ...data }/> 
      </>
    )
  }
}

const obtenerUrlsSourceSets = (size, url) => {
  const imgSizes = SourceSetSizes.find(s => s.name === size)
  console.log(imgSizes)
}

export default WithArticleData(Article, filter)