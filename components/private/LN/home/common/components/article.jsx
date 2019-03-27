import React, { Component } from 'react'
import Image from './articleImage'
import Title from './articleTitle'
import Bajada from './articleBajada'

export default class Article extends Component {
    render() {
        console.log(this.props)
        return (
            <article className={this.props.renderClasses}>
                <Image imgUrls={this.props.imgUrls} url={this.props.url} />
                <Title volanta={this.props.volanta} title={this.props.title} />
                {this.props.bajada &&
                    <Bajada bajada={this.props.bajada} url={this.props.url} />
                }
            </article>
        )
    }
}
