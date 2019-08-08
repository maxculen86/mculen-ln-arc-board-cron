import React, { Component } from 'react';
import Article from '../common/ArticleTypes/articleMain';
import WithArticlesData from '../common/hocs/withArticlesData';
import filter from '../../../../content/filters/LN/acumulado/articleAcu';

const CLASS_W_100 = 'w-100-mobile';
class GrillaNotas extends Component {
    render() {
        console.log('PROPS', this.props);
        let articles = [];
        if (this.props.articles) {
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

                return (
                    <Article
                        key={i}
                        extraClasses={CLASS_W_100}
                        kicker={a.label.volanta}
                        title={a.headlines.basic}
                        image={image}
                        href={a.website_url}
                    />
                );
            });
        }

        return (
            <section class="row-gap-tablet-2 row-gap-desksm-3">
                {articles}
            </section>
        );
    }
}

export default WithArticlesData(GrillaNotas, filter);
