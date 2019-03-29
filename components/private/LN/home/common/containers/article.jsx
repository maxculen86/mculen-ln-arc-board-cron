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
        url: 'https://www.lanacion.com.ar/economia/dolar/devaluacion-por-que-sube-dolar-argentina-nid2231139'
    }
    console.log(this.props)
    const article = this.props.article
    
    const imgUrls = getUrlsSourceSets('M', article.promo_items.basic.additional_properties.resizeUrl)
    const title = getTitle(this.props.customFields.homeTitle1, article.headlines.basic)

    return (
      <>
        <ArticleComponent 
          renderClasses="art-01 M"
          imgUrls={imgUrls}
          title={title}
          url={article.website_url}
          teaser={this.props.customFields.homeTeaser1}
          subheader={this.props.customFields.homeSubheader1}
        /> 
      </>
    )
  }
}

const getTitle = (homeTitle, title) => {
  if(homeTitle){
    return homeTitle
  }
  return title
}

const getUrlsSourceSets = (size, url) => {
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