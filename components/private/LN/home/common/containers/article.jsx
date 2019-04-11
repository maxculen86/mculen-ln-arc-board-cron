import React, { Component } from 'react'
import RegularArticleComponent from '../components/article'
import AuthorArticle from '../components/authorArticle'
import { tagsRevista } from '../config/tags.json'
import filter from '../../../../../../content/filters/LN/home/article'
import WithArticleData from '../hocs/withArticleData'
import { getClassesArticle } from '../utils/classHelper'


const SUBTYPE_NOTA_AUTOR = 4
const SUBTYPE_NOTA_CONTENT_LAB = 5
const SLUG_ESPACIO_PATROCINADO = 'espaciopatrocinado'

let classTag = ''
class Article extends Component {
  render() {
    const article = this.props.article
    if(!article){
      return getEmptyArticle(this.props.size, this.props.position)
    }
    const isAuthor = parseInt(article.subtype) === SUBTYPE_NOTA_AUTOR
    const author = article.credits.by.find(c => c.type === 'author')
    let imgs
    if(isAuthor){
      imgs = author.image.resized_urls
    }else{
      imgs = article.promo_items.basic.resized_urls
    }
    const imgUrls = getUrlsSourceSets(this.props.size, imgs)
    const title = getTitle(this.props.homeTitle, article.headlines.basic)
    const tag = getTagRender(article.taxonomy.tags, this.props.marquee, article.subtype)
    const renderClasses = getClassesArticle(this.props)
    
    let component
    if(isAuthor){
      component = <AuthorArticle 
                    renderClasses={renderClasses}
                    url={article.website_url}
                    imgUrls={imgUrls}
                    title={title}  
                    authorName={author.name}
                    subheader={this.props.subheader}
                    teaser={this.props.teaser}
                  />
    }else{
      component = <RegularArticleComponent 
                    renderClasses={renderClasses}
                    imgUrls={imgUrls}
                    title={title}
                    url={article.website_url}
                    teaser={this.props.teaser}
                    subheader={this.props.subheader}
                    tagName={tag}
                    classTag={classTag}
                  /> 
    }

    return (
      <>
        {component}
      </>
    )
  }
}

const getEmptyArticle = (size, position) => {
  const pos = ('0' + position).slice(-2)
  const classArtVacio = `art-${pos} ${size}`
  return(
    <article className={classArtVacio}>
      <h2>Articulo vacio</h2>
    </article>
  )
}

const getTitle = (homeTitle, title) => {
  if(homeTitle){
    return homeTitle
  }
  return title
}

const getUrlsSourceSets = (size, urls) => {
  const keys = Object.keys(urls)
  const filteredKeys = keys.filter(k => k.startsWith(size))
  const resultUrls = []
  filteredKeys.forEach(el => {
    const arr = el.split('_')
    resultUrls.push({
      name: arr[arr.length - 1],
      url: urls[el]
    })
  })
  return resultUrls
}

const getTagRender = (tags, marquee, subtype) => {
  const slugs = tags.map(n => n.slug)
  let tagName = ''
  if(slugs.includes(SLUG_ESPACIO_PATROCINADO)){
    tagName = tags.find(t => t.slug === SLUG_ESPACIO_PATROCINADO).description
  }else if(parseInt(subtype) === SUBTYPE_NOTA_CONTENT_LAB){
    tagName = `CONTENT LAB PARA ${tags[0].description}`
  }else if(tagsRevista.some(tr => slugs.includes(tr))){
    tagName = tags.find(t => tagsRevista.includes(t.slug)).description
    //Agrego clase logos al tag cuando es revista. 
    classTag = 'logos'
  }else if(marquee){
    tagName = marquee
  }

  return tagName
}

export default WithArticleData(Article, filter)