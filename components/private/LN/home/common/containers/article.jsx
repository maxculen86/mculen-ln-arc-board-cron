import React, { Component } from 'react'
import ArticleComponent from '../components/article'
import SourceSetSizes from '../config/sourceSets.json'
import { tagsRevista } from '../config/tags.json'
import filter from '../../../../../../content/filters/LN/home/article'
import WithArticleData from '../hocs/withArticleData'
import { getClassesArticle } from '../utils/classHelper'


const SLUG_ESPACIO_PATROCINADO = 'espaciopatrocinado'
let classTag = ''
class Article extends Component {
  render() {
    const article = this.props.article
    
    const imgUrls = getUrlsSourceSets('M', article.promo_items.basic.additional_properties.resizeUrl)
    const title = getTitle(this.props.homeTitle, article.headlines.basic)
    const tag = getTagRender(article.taxonomy.tags, this.props.isContentLab)
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
          tagName={tag}
          classTag={classTag}
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

const getTagRender = (tags, isContentLab) => {
  const slugs = tags.map(n => n.slug)
  let tagName = ''
  if(slugs.includes(SLUG_ESPACIO_PATROCINADO)){
    tagName = tags.find(t => t.slug === SLUG_ESPACIO_PATROCINADO).description
  }else if(isContentLab){
    tagName = `CONTENT LAB PARA ${tags[0].description}`
  }else if(tagsRevista.some(tr => slugs.includes(tr))){
    tagName = tagsRevista.find(tr => slugs.includes(tr)).description
    //Agrego clase logos al tag cuando es revista. 
    classTag = 'logos'
  }

  return tagName
}

export default WithArticleData(Article, filter)