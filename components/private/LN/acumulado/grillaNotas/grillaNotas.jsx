import React, { Component } from 'react';
import Consumer from 'fusion:consumer';
import Article from '../../common/ArticleTypes/articleMain';
import WithArticlesData from '../../common/hocs/withArticlesData';
import filter from '../../../../../content/filters/LN/acumulado/articleAcu';
import BtnMasNotas from '../botonVerMasNotas';

const CLASS_W_100 = 'w-100-mobile';
class GrillaNotas extends Component {
    render() {
        let articles = [];
        if (this.props.articles.length) {
            articles = this.props.articles.map((a, i) => {
                let image = {};
                if (a.promo_items) {
                    image = {
                        altText: a.promo_items.basic.subtitle,
                        src: a.promo_items.basic.url
                    };
                } else {
                    image = {
                        altText: '',
                        src: ''
                    };
                }

                let kicker = '';
                if (a.label && a.label.volanta) kicker = a.label.volanta.text;

                return (
                    <Article
                        key={i}
                        extraClasses={CLASS_W_100}
                        kicker={kicker}
                        title={a.headlines.basic}
                        image={image}
                        href={a.website_url}
                    />
                );
            });
        }

        return (
            <>
                <section className="row-gap-tablet-2 row-gap-desksm-3">
                    {articles}
                </section>
                <section className="row">
                    <BtnMasNotas
                        onClickHandler={this.props.obtenerMasNotas}
                        name={this.props.globalContent.name}
                    />
                </section>
            </>
        );
    }
}

export default WithArticlesData(GrillaNotas, filter);
