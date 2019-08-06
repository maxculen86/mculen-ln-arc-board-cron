import React, { Component } from 'react';

import Date from './articleDate';
import Title from './articleTitle';
import Image from '../imageBase';

export default class Index extends Component {
    render() {
        return (
            <article className={`mod-caja-nota ${this.props.extraClasses}`}>
                <section className="cont-figure">
                    <Image
                        sources={this.props.image_sources}
                        altText=""
                        zoom="false"
                        href={this.props.canonical_url}
                    />
                </section>
                <div className="mod-caja-nota__descrip">
                    <Title
                        titleText={this.props.headlines.basic}
                        volanta={this.props.volanta}
                        url={this.props.canonical_url}
                    />
                    <Date display_date={this.props.display_date} />
                </div>
            </article>
        );
    }
}
