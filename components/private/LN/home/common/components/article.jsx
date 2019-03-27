import React, { Component } from 'react'
import Image from './articleImage'
import Title from './articleTitle'

export default class Article extends Component {
    render() {
        console.log(this.props)
        return (
            <article className={this.props.renderClasses}>
                <a className="figure" href={this.props.url}>
                    <picture className="content-picture">
                        <Image imgUrls={this.props.imgUrls} />
                    </picture>
                </a>
                <Title volanta={this.props.volanta} title={this.props.title} />
            </article>
        )
    }
}
