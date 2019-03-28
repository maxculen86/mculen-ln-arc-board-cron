import React, { Component } from 'react'
import get from 'lodash.get'
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
    console.log(this.props.article)
    const article = this.props.article
    
    const imgUrls = obtenerUrlsSourceSets('M', article.promo_items.basic.additional_properties.resizeUrl)
    
    return (
      <>
        <ArticleComponent 
          renderClasses="art-01 M"
          imgUrls={imgUrls}
          title={article.headlines.basic}
          url={article.website_url}
          volanta=""
          bajada=""
        /> 
      </>
    )
  }
}

const obtenerUrlsSourceSets = (size, url) => {
  const imgUrls = []
  const imgSizes = SourceSetSizes.find(s => s.name === size)
  imgSizes.values.forEach(el => {
    //Reemplazar con URL cuando veamos como subir imagenes al resizer
    const urlWithSize = url.replace('=/', `=/${el.value}x0/`)
    const sourceSet = {
      name: el.name,
      url: url
    }
    imgUrls.push(sourceSet)
  })
  return imgUrls
}

export default WithArticleData(Article, filter)