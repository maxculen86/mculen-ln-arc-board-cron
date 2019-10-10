import React, { Component } from 'react';
import ArticleList from './articleList';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = { articles: [] };

        this.getItemsFromLiftIgniter = this.getItemsFromLiftIgniter.bind(this);
    }

    componentDidMount = () => {
        this.getItemsFromLiftIgniter();
    };

    getItemsFromLiftIgniter = () => {
        /**
         * TODO: Hay que modular lliftigniter a un Command Pattern
         * TODO: Falta trackear
         * TODO: Falta revisar los css
         */
        const $this = this;

        (function(w, d, s, p, v, e, r) {
            w.$igniter_var = v;
            w[v] =
                w[v] ||
                function() {
                    (w[v].q = w[v].q || []).push(arguments);
                };
            w[v].l = 1 * new Date();
            (e = d.createElement(s)), (r = d.getElementsByTagName(s)[0]);
            e.async = 1;
            e.src = `${p}?ts=${(+new Date() / 3600000) | 0}`;
            r.parentNode.insertBefore(e, r);
        })(
            window,
            document,
            'script',
            '//cdn.petametrics.com/8561ps8ov66e7mim.js',
            '$p'
        );

        const customConfig = {
            config: {
                inventory: {
                    mandatoryOpenGraphFeatures: ['title', 'type'],
                    features: [
                        {
                            name: 'id',
                            type: 'attribute',
                            selector: 'link[rel=canonical]',
                            attribute: 'href',
                            transform(value) {
                                return value
                                    .replace('https://www.lanacion.com.ar/', '')
                                    .split('-')[0];
                            }
                        }
                    ]
                },
                sdk: {
                    requestFields: [
                        'url',
                        'title',
                        'image',
                        'id',
                        'published_time'
                    ]
                }
            }
        };

        $p('init', '8561ps8ov66e7mim', customConfig);
        // $p('send', 'pageview');
        $p('register', {
            max: 18,
            widget: 'li-nacion-recommended-item-template-1',
            callback: resp => {
                const items = resp ? this.transformArticles(resp.items) : [];
                $this.setState({ articles: items });
            }
        });
        $p('fetch');
    };

    transformArticles = liftigniterArticles => {
        return liftigniterArticles.map(article => {
            const { url, id, title, image } = article;

            const resp = {};
            resp.subtype = 1;
            resp.by = {};
            resp.website_url = url;
            resp._id = id;
            resp.headlines = { basic: title };
            resp.promo_items = {
                basic: {
                    type: 'image',
                    url: image
                }
            };
            return resp;
        });
    };

    render = () => {
        const { articles } = this.state;
        return <ArticleList articles={articles} />;
    };
}

export default index;
