import React, { Component } from 'react'
import StoriesBoxComponent from '../components/storiesBox'
import { defaultDiagram } from '../config/storiesBoxDiagrams.json'
import Article from './article'

export default class StoriesBox extends Component {
  render() {
    const articles = this.props.articles.map((a,i) => {
      const pos = defaultDiagram[i];
      return <Article 
        key={i}
        id={a.id} 
        url={a.url}
        teaser={a.teaser} 
        subheader={a.subheader}
        homeTitle={a.homeTitle}
        marquee={a.marquee}
        articleMark={a.articleMark}
        isExclusive={a.isExclusive}
        size={pos.size}
        position={pos.position}
      />
    })

    return (
      <StoriesBoxComponent>
        {articles}
      </StoriesBoxComponent>
    )
  }
}
