import React from 'react';
import PropTypes from 'prop-types';

export const getLayoutType = layout => {
    return (
        (layout.includes('bomba') && 'Bomba') ||
        (layout.includes('focal') && 'Focal') ||
        (layout.includes('notaColor') && 'Color') ||
        (layout.includes('grilla') && 'Grilla') ||
        (layout.includes('author') && 'Author') ||
        (layout.includes('opinion') && 'Opinion') ||
        (layout.includes('editoriales') && 'Editoriales') ||
        (layout.includes('ranking') && 'Ranking') ||
        ''
    );
};

export const placeholderArticles = {
    Bomba: () => {
        return [
            <article className="mod-article">
                <SkeletonContentMedia />
                <section className="mod-description">
                    <h1 className="com-title --threexl">
                        <SkeletonSpan extraClass="--line1" />
                        <SkeletonSpan extraClass="--line2" />
                    </h1>
                </section>
            </article>
        ];
    },
    Focal: layout => {
        const articles = {
            focalLeft3: [
                <article className="mod-article">
                    <SkeletonContentMedia />
                    <section className="mod-description">
                        <h1 className="com-title --xl">
                            <SkeletonSpan extraClass="--line1" />
                            <SkeletonSpan extraClass="--line2" />
                            <SkeletonSpan extraClass="--line3" />
                        </h1>
                        <h2 className="com-subhead --twoxs">
                            <SkeletonSpan extraClass="--line1" />
                            <SkeletonSpan extraClass="--line2" />
                        </h2>
                        <SkeletonAuthorName />
                    </section>
                </article>,
                <SkeletonDefaultArticle />,
                <SkeletonDefaultArticle />
            ],
            focalRight2: [
                <article className="mod-article">
                    <SkeletonContentMedia />
                    <section className="mod-description">
                        <h1 className="com-title --xl">
                            <SkeletonSpan extraClass="--line1" />
                            <SkeletonSpan extraClass="--line2" />
                        </h1>
                        <SkeletonAuthorName />
                    </section>
                </article>,
                <article className="mod-article">
                    <SkeletonContentMedia />
                    <section className="mod-description">
                        <h2 className="com-title --xl">
                            <SkeletonSpan extraClass="--line1" />
                            <SkeletonSpan extraClass="--line2" />
                            <SkeletonSpan extraClass="--line3" />
                        </h2>
                        <h3 className="com-subhead --twoxs">
                            <SkeletonSpan extraClass="--line1" />
                            <SkeletonSpan extraClass="--line2" />
                            <SkeletonSpan extraClass="--line3" />
                            <SkeletonSpan extraClass="--line4" />
                        </h3>
                        <SkeletonAuthorName />
                    </section>
                </article>
            ]
        };
        return articles[layout] || [];
    },
    Color: () => {
        return Array.from({ length: 3 })
            .fill()
            .map(e => (
                <article className="mod-article">
                    <SkeletonContentMedia />
                    <section className="mod-description">
                        <h1 className="com-title --xs">
                            <SkeletonSpan extraClass="--line1" />
                            <SkeletonSpan extraClass="--line2" />
                            <SkeletonSpan extraClass="--line3" />
                        </h1>
                        <SkeletonAuthorName />
                    </section>
                </article>
            ));
    },
    Grilla: layout => {
        const quantityNotes = Math.abs(layout.slice(-1));
        if (!quantityNotes) return [];
        const articles = {
            1: [<SkeletonGrillaArticle />],
            2: Array.from({ length: quantityNotes })
                .fill()
                .map(e => <SkeletonGrillaArticle />),
            Default: Array.from({ length: quantityNotes })
                .fill()
                .map(e => <SkeletonDefaultArticle />)
        };
        return articles[quantityNotes] || articles.Default;
    },
    Author: () => {
        return Array.from({ length: 3 })
            .fill()
            .map(e => (
                <article className="mod-article --author">
                    <SkeletonContentMediaWithoutFigure />
                    <section className="mod-description">
                        <h2 className="com-title --m">
                            <SkeletonSpan extraClass="--line1" />
                            <SkeletonSpan extraClass="--line2" />
                            <SkeletonSpan extraClass="--line3" />
                        </h2>
                        <SkeletonAuthorName />
                    </section>
                </article>
            ));
    },
    Opinion: () => [
        <article className="mod-article">
            <SkeletonContentMediaWithoutFigure />
            <section className="mod-description">
                <h2 className="com-title --l">
                    <SkeletonSpan extraClass="--line1" />
                    <SkeletonSpan extraClass="--line2" />
                    <SkeletonSpan extraClass="--line3" />
                </h2>
                <SkeletonAuthorName />
            </section>
        </article>,
        <SkeletonOpinionArticle />,
        <SkeletonOpinionArticle />,
        <article className="mod-article --author">
            <SkeletonContentMedia />
            <section className="mod-description">
                <h2 className="com-title --l">
                    <SkeletonSpan extraClass="--line1" />
                    <SkeletonSpan extraClass="--line2" />
                    <SkeletonSpan extraClass="--line3" />
                    <SkeletonSpan extraClass="--line3" />
                </h2>
                <SkeletonAuthorName />
            </section>
        </article>
    ],
    Editoriales: () =>
        Array.from({ length: 2 })
            .fill()
            .map(e => (
                <article className="mod-article">
                    <div className="mod-description">
                        <h2 className="com-title --twoxs">
                            <SkeletonSpan />
                        </h2>
                    </div>
                </article>
            )),
    Ranking: layout => {
        const quantityNotes = Math.abs(layout.slice(-1));
        if (!quantityNotes) return <></>;
        return (
            <ol className="com-ordered row-gap-tablet-4">
                {new Array(quantityNotes).fill().map(e => (
                    <li className="com-item">
                        <SkeletonGrillaArticle />
                    </li>
                ))}
            </ol>
        );
    }
};

export const placeholderLayouts = {
    Focal: (articles, layout) => {
        if (!articles.length) return <></>;
        const template = {
            focalLeft3: (
                <div>
                    <section className="box-articles --focal --left">
                        <section className="mod-headersection --line">
                            <h3 className="com-title --l">
                                <SkeletonSpan />
                            </h3>
                        </section>
                        <div className="row ">
                            <div className="col-tablet-8">{articles[0]}</div>
                            <div className="col-tablet-4">
                                {articles[1]}
                                {articles[2]}
                            </div>
                        </div>
                    </section>
                </div>
            ),
            focalRight2: (
                <div>
                    <section className="box-articles --focal --right">
                        <section className="mod-headersection --line">
                            <h3 className="com-title --l">
                                <SkeletonSpan />
                            </h3>
                        </section>
                        <div className="row ">
                            <div className="col-tablet-8">{articles[0]}</div>
                            <div className="col-tablet-4">{articles[1]}</div>
                        </div>
                    </section>
                </div>
            )
        };
        return template[layout];
    },
    Color: (articles, layout) => {
        const classes = {
            notaColorVerde3: '--teal',
            notaColorRosa3: '--pink'
        };
        return (
            <div>
                <section
                    className={`box-articles --highlight ${(classes &&
                        classes[layout]) ||
                        ''}`}
                >
                    <section className="mod-headersection --line">
                        <h3 className="com-title --l">
                            <SkeletonSpan />
                        </h3>
                    </section>
                    <div className="row-gap-tablet-3 ">{articles}</div>
                </section>
            </div>
        );
    },
    Grilla: (articles, layout) => {
        const quantityNotes = Math.abs(layout.slice(-1));
        if (!quantityNotes) return <></>;
        const sectionClass = {
            '1': '--cinema'
        };
        const rowClass = {
            '1': 'row',
            '2': 'row-gap-tablet-2'
        };
        return (
            <div>
                <section
                    className={`box-articles ${sectionClass[quantityNotes] ||
                        ''}`}
                >
                    <section className="mod-headersection --line">
                        <h3 className="com-title --l">
                            <SkeletonSpan />
                        </h3>
                    </section>
                    <div
                        className={`${rowClass[quantityNotes] ||
                            'row-gap-tablet-3'}`}
                    >
                        {articles}
                    </div>
                </section>
            </div>
        );
    },
    Author: articles => (
        <div>
            <section className="box-articles">
                <section className="mod-headersection --line">
                    <h3 className="com-title --l">
                        <SkeletonSpan />
                    </h3>
                </section>
                <div className="row-gap-tablet-3 ">{articles}</div>
            </section>
        </div>
    ),
    Opinion: articles => (
        <div>
            <section className="box-articles  --opinion">
                <section className="mod-headersection --line">
                    <h3 className="com-title --l">
                        <SkeletonSpan />
                    </h3>
                </section>
                <div className="row">
                    <div className="col-tablet-5">{articles[0]}</div>
                    <div className="col-tablet-4">
                        {articles[1]}
                        {articles[2]}
                    </div>
                    <div className="col-tablet-3">{articles[3]}</div>
                </div>
            </section>
        </div>
    ),
    Editoriales: articles => (
        <div>
            <section className="box-articles --editoriales">
                <div className="mod-footersection">
                    <h4 className="com-title --twoxs">
                        <SkeletonSpan />
                    </h4>
                    <div className="col-12">{articles}</div>
                </div>
            </section>
        </div>
    ),
    Ranking: articles => {
        return (
            <div>
                <section className="box-articles com-ranking">
                    <section className="mod-headersection --line">
                        <h3 className="com-title --l">
                            <SkeletonSpan />
                        </h3>
                    </section>
                    <div className="row">{articles}</div>
                </section>
            </div>
        );
    }
};

export const getPlaceholder = (layout, index) => {
    const layoutName = getLayoutType(layout);
    if (!layoutName) return 'Cargando...';
    const _articles =
        (placeholderArticles[layoutName] &&
            placeholderArticles[layoutName](layout)) ||
        [];
    const _layout = (placeholderLayouts[layoutName] &&
        placeholderLayouts[layoutName](_articles, layout)) || <></>;
    return (typeof index !== 'undefined' && _articles[index]) || _layout;
};

const SkeletonSpan = ({ extraClass }) => (
    <span className={`skeleton-box ${extraClass || ''}`}>&nbsp;</span>
);

const SkeletonDefaultArticle = () => (
    <article className="mod-article">
        <SkeletonContentMedia />
        <SkeletonDescriptionSection />
    </article>
);

const SkeletonOpinionArticle = () => (
    <article className="mod-article --author">
        <SkeletonContentMedia />
        <SkeletonDescriptionSection />
    </article>
);

const SkeletonGrillaArticle = () => (
    <article className="mod-article">
        <SkeletonContentMedia />
        <section className="mod-description">
            <h2 className="com-title --l">
                <SkeletonSpan extraClass="--line1" />
                <SkeletonSpan extraClass="--line2" />
            </h2>
            <SkeletonAuthorName />
        </section>
    </article>
);

const SkeletonContentMedia = () => (
    <div className="content-media">
        <section className="mod-media">
            <figure className="mod-figure --horizontal">
                <picture className="placeholder" />
            </figure>
        </section>
    </div>
);

const SkeletonContentMediaWithoutFigure = () => (
    <div className="content-media">
        <section className="mod-media">
            <picture className="placeholder" />
        </section>
    </div>
);

const SkeletonDescriptionSection = () => (
    <section className="mod-description">
        <h2 className="com-title --xs">
            <SkeletonSpan extraClass="--line1" />
            <SkeletonSpan extraClass="--line2" />
            <SkeletonSpan extraClass="--line3" />
        </h2>
        <SkeletonAuthorName />
    </section>
);

const SkeletonAuthorName = () => (
    <div>
        <strong className="mod-marquee --fourxs">
            <SkeletonSpan extraClass="--line1" />
        </strong>
    </div>
);

SkeletonSpan.propTypes = {
    extraClass: PropTypes.string
};

SkeletonSpan.defaultProps = {
    extraClass: ''
};
