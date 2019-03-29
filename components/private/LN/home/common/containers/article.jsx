import React, { Component } from 'react'
import get from 'lodash.get'
import ArticleComponent from '../components/article'
import SourceSetSizes from '../config/sourceSets.json'
import filter from '../../../../../../content/filters/LN/home/article'
import WithArticleData from '../hocs/withArticleData'
import { getClassesArticle } from '../utils/classHelper'


class Article extends Component {
  render() {
    const data = {
        renderClasses: 'art-01 m',
    }
    console.log(this.props)
    const article = this.props.article
    
    const imgUrls = getUrlsSourceSets('M', article.promo_items.basic.additional_properties.resizeUrl)
    const title = getTitle(this.props.homeTitle, article.headlines.basic)
    const renderClasses = getClassesArticle(this.props)
    return (
      <>
        <ArticleComponent 
          renderClasses={renderClasses}
          imgUrls={imgUrls}
          title={title}
          url={article.website_url}
          teaser={this.props.teaser}
          subheader={this.props.subheader}
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