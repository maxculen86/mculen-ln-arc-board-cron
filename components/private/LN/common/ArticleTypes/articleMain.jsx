import React, { Component } from 'react';
import Article from '../articleBase';

class ArticleMain extends Component {
    render() {
        return (
            <Article extraClasses={this.props.extraClasses}>
                <section id="" className="cont-figure">
                    <a href={this.props.href} className="figure">
                        <picture className="content-pic picture">
                            <img
                                src={this.props.image.src}
                                alt={this.props.image.altText}
                                className="content-img"
                            />
                        </picture>
                    </a>
                </section>
                <div className="mod-caja-nota__descrip">
                    <h2 className="com-title-acu">
                        <a href={this.props.href}>
                            <b>{this.props.kicker}</b>
                            {this.props.title}
                        </a>
                    </h2>
                    {this.props.children}
                </div>
            </Article>
        );
    }
}

export default ArticleMain;
