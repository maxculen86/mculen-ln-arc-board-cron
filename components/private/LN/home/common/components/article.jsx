import React, { Component } from 'react'
import Image from './articleImage'
import Title from './articleTitle'
import Subheader from './articleSubheader'

export default class Article extends Component {
    render() {
        return (
            <article className={this.props.renderClasses}>
                <Image imgUrls={this.props.imgUrls} url={this.props.url} />
                <Title teaser={this.props.teaser} title={this.props.title} />
                {this.props.subheader &&
                    <Subheader subheader={this.props.subheader} url={this.props.url} />
                }
            </article>
        )
    }
}
