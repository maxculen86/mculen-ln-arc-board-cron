import React, { Component } from 'react'
import StoriesBoxComponent from '../components/storiesBox'
import Article from './article'

export default class StoriesBox extends Component {
  render() {
    console.log(this.props)
    const articles = this.props.articles.map(a => 
      <Article 
        id={a.id} 
        url={a.url}
        teaser={a.teaser} 
        subheader={a.subheader}
        homeTitle={a.homeTitle}
        marquee={a.marquee}
        articleMark={a.articleMark}
        isExclusive={a.isExclusive}
        size="M"
        position="1"
      />
    )

    return (
      <StoriesBoxComponent>
        {articles}
      </StoriesBoxComponent>
    )
  }
}
