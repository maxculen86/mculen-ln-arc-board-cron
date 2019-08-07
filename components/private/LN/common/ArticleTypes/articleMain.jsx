import React, { Component } from 'react';
import Article from '../articleBase';

class ArticleMain extends Component {
    render() {
        console.log(this.props);
        return (
            <Article extraClasses={this.props.extraClasses}>
                <section id="" className="cont-figure">
                    <a href={this.props.href} className="figure">
                        <picture id="" className="content-pic picture">
                            <img
                                src={this.props.img}
                                alt=""
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
                    {/* <h4 className="com-date">1 de Julio de 2019 • 08:05</h4> */}
                    {this.props.children}
                </div>
            </Article>
        );
    }
}

export default ArticleMain;
