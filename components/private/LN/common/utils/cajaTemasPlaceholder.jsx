import React from 'react';

const SkeletonSpan = ({ extraClass, style }) => (
    <span className={`skeleton-box ${extraClass || ''}`} style={style}>
        &nbsp;
    </span>
);

export const getLayoutType = layout => {
    return (
        (layout.includes('bomba') && 'Bomba') ||
        (layout.includes('focal') && 'Focal') ||
        (layout.includes('notaColor') && 'Color') ||
        (layout.includes('grilla') && 'Grilla') ||
        (layout.includes('author') && 'Author') ||
        (layout.includes('opinion') && 'Opinion') ||
        (layout.includes('editoriales') && 'Editoriales') ||
        ''
    );
};

export const placeholderArticles = {
    Bomba: layout => {
        return [
            <article className="mod-article">
                <div className="content-media">
                    <section className="mod-media   ">
                        <figure className="mod-figure --horizontal">
                            <picture className="mod-picture " />
                        </figure>
                    </section>
                </div>
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
                    <div className="content-media">
                        <section className="mod-media">
                            <figure className="mod-figure --horizontal">
                                <picture className="mod-picture " />
                            </figure>
                        </section>
                    </div>
                    <section className="mod-description">
                        <h1 className="com-title --xl">
                            <SkeletonSpan extraClass="--line1" />
                            <SkeletonSpan extraClass="--line2" />
                            <SkeletonSpan extraClass="--line3" />
                        </h1>
                        <h2 className=" com-subhead --twoxs">
                            <SkeletonSpan extraClass="--line1" />
                            <SkeletonSpan extraClass="--line2" />
                        </h2>
                        <div>
                            <strong className="mod-marquee --fourxs">
                                <SkeletonSpan extraClass="--line1" />
                            </strong>
                        </div>
                    </section>
                </article>,
                <article className="mod-article">
                    <div className="content-media">
                        <section className="mod-media">
                            <figure className="mod-figure --horizontal">
                                <picture className="mod-picture " />
                            </figure>
                        </section>
                    </div>
                    <section className="mod-description">
                        <h2 className="com-title --xs">
                            <SkeletonSpan extraClass="--line1" />
                            <SkeletonSpan extraClass="--line2" />
                            <SkeletonSpan extraClass="--line3" />
                        </h2>
                        <div>
                            <strong className="mod-marquee --fourxs">
                                <SkeletonSpan extraClass="--line1" />
                            </strong>
                        </div>
                    </section>
                </article>,
                <article className="mod-article">
                    <div className="content-media">
                        <section className="mod-media">
                            <figure className="mod-figure --horizontal">
                                <picture className="mod-picture " />
                            </figure>
                        </section>
                    </div>
                    <section className="mod-description">
                        <h2 className="com-title --xs">
                            <SkeletonSpan extraClass="--line1" />
                            <SkeletonSpan extraClass="--line2" />
                            <SkeletonSpan extraClass="--line3" />
                        </h2>
                        <div>
                            <strong className="mod-marquee --fourxs">
                                <SkeletonSpan extraClass="--line1" />
                            </strong>
                        </div>
                    </section>
                </article>
            ],
            focalRight2: [
                <article className="mod-article">
                    <div className="content-media">
                        <section className="mod-media">
                            <figure className="mod-figure --horizontal">
                                <picture className="mod-picture " />
                            </figure>
                        </section>
                    </div>
                    <section className="mod-description">
                        <h1 className="com-title --xl">
                            <SkeletonSpan extraClass="--line1" />
                            <SkeletonSpan extraClass="--line2" />
                        </h1>
                        <h2 className="com-subhead --twoxs">
                            <SkeletonSpan extraClass="--line1" />
                            <SkeletonSpan extraClass="--line2" />
                        </h2>
                        <div>
                            <strong className="mod-marquee --fourxs">
                                <SkeletonSpan extraClass="--line1" />
                            </strong>
                        </div>
                    </section>
                </article>,
                <article className="mod-article">
                    <div className="content-media">
                        <section className="mod-media">
                            <figure className="mod-figure --horizontal">
                                <picture className="mod-picture " />
                            </figure>
                        </section>
                    </div>
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
                        <div>
                            <strong className="mod-marquee --fourxs">
                                <SkeletonSpan extraClass="--line1" />
                            </strong>
                        </div>
                    </section>
                </article>
            ]
        };
        return articles[layout] || [];
    },
    Color: layout => {
        return new Array(3).fill().map(e => (
            <article className="mod-article">
                <div className="content-media">
                    <section className="mod-media">
                        <figure className="mod-figure --horizontal">
                            <picture className="mod-picture " />
                        </figure>
                    </section>
                </div>
                <section className="mod-description">
                    <h1 className="com-title --xs">
                        <SkeletonSpan extraClass="--line1" />
                        <SkeletonSpan extraClass="--line2" />
                        <SkeletonSpan extraClass="--line3" />
                    </h1>
                    <div>
                        <strong className="mod-marquee --fourxs">
                            <SkeletonSpan extraClass="--line1" />
                        </strong>
                    </div>
                </section>
            </article>
        ));
    },
    Grilla: layout => {
        const quantityNotes = Math.abs(layout.slice(-1));
        if (!quantityNotes) return [];
        const articles = {
            1: [
                <article className="mod-article">
                    <div className="content-media">
                        <section className="mod-media">
                            <figure className="mod-figure --horizontal">
                                <picture className="mod-picture " />
                            </figure>
                        </section>
                    </div>
                    <section className="mod-description">
                        <h2 className="com-title --l">
                            <SkeletonSpan extraClass="--line1" />
                            <SkeletonSpan extraClass="--line2" />
                            <SkeletonSpan extraClass="--line3" />
                        </h2>
                        <div>
                            <strong className="mod-marquee --fourxs">
                                <SkeletonSpan extraClass="--line1" />
                            </strong>
                        </div>
                    </section>
                </article>
            ],
            2: new Array(quantityNotes).fill().map(e => (
                <article className="mod-article">
                    <div className="content-media">
                        <section className="mod-media">
                            <figure className="mod-figure --horizontal">
                                <picture className="mod-picture " />
                            </figure>
                        </section>
                    </div>
                    <section className="mod-description">
                        <h2 className="com-title --l">
                            <SkeletonSpan extraClass="--line1" />
                            <SkeletonSpan extraClass="--line2" />
                            <SkeletonSpan extraClass="--line3" />
                        </h2>
                        <div>
                            <strong className="mod-marquee --fourxs">
                                <SkeletonSpan extraClass="--line1" />
                            </strong>
                        </div>
                    </section>
                </article>
            )),
            Default: new Array(quantityNotes).fill().map(e => (
                <article className="mod-article">
                    <div className="content-media">
                        <section className="mod-media">
                            <figure className="mod-figure --horizontal">
                                <picture className="mod-picture " />
                            </figure>
                        </section>
                    </div>
                    <section className="mod-description">
                        <h2 className="com-title --xs">
                            <SkeletonSpan extraClass="--line1" />
                            <SkeletonSpan extraClass="--line2" />
                            <SkeletonSpan extraClass="--line3" />
                        </h2>
                        <div>
                            <strong className="mod-marquee --fourxs">
                                <SkeletonSpan extraClass="--line1" />
                            </strong>
                        </div>
                    </section>
                </article>
            ))
        };
        return articles[quantityNotes] || articles.Default;
    },
    Author: layout => {
        return new Array(3).fill().map(e => (
            <article className="mod-article --author">
                <div className="content-media">
                    <section className="mod-media">
                        <a href="javascript:void(0);">
                            <picture className="mod-picture " />
                        </a>
                    </section>
                </div>
                <section className="mod-description">
                    <h2 className="com-title --m">
                        <SkeletonSpan extraClass="--line1" />
                        <SkeletonSpan extraClass="--line2" />
                        <SkeletonSpan extraClass="--line3" />
                    </h2>
                    <div>
                        <strong className="mod-marquee --fourxs">
                            <SkeletonSpan extraClass="--line1" />
                        </strong>
                    </div>
                </section>
            </article>
        ));
    },
    Opinion: layout => [
        <article className="mod-article">
            <div className="content-media">
                <section className="mod-media">
                    <picture className="mod-picture" />
                </section>
            </div>
            <section className="mod-description">
                <h2 className="com-title --l">
                    <SkeletonSpan extraClass="--line1" />
                    <SkeletonSpan extraClass="--line2" />
                    <SkeletonSpan extraClass="--line3" />
                </h2>
                <div>
                    <strong className="mod-marquee --fourxs">
                        <SkeletonSpan extraClass="--line1" />
                    </strong>
                </div>
            </section>
        </article>,
        <article className="mod-article --author">
            <div className="content-media">
                <section className="mod-media">
                    <figure className="mod-figure --horizontal">
                        <a href="javascript:void(0);">
                            <picture className="mod-picture" />
                        </a>
                    </figure>
                </section>
            </div>
            <section className="mod-description">
                <h2 className="com-title --xs">
                    <SkeletonSpan extraClass="--line1" />
                    <SkeletonSpan extraClass="--line2" />
                    <SkeletonSpan extraClass="--line3" />
                </h2>
                <div>
                    <strong className="mod-marquee --fourxs">
                        <SkeletonSpan extraClass="--line1" />
                    </strong>
                </div>
            </section>
        </article>,
        <article className="mod-article --author">
            <div className="content-media">
                <section className="mod-media">
                    <figure className="mod-figure --horizontal">
                        <a href="javascript:void(0);">
                            <picture className="mod-picture" />
                        </a>
                    </figure>
                </section>
            </div>
            <section className="mod-description">
                <h2 className="com-title --xs">
                    <SkeletonSpan extraClass="--line1" />
                    <SkeletonSpan extraClass="--line2" />
                    <SkeletonSpan extraClass="--line3" />
                </h2>
                <div>
                    <strong className="mod-marquee --fourxs">
                        <SkeletonSpan extraClass="--line1" />
                    </strong>
                </div>
            </section>
        </article>,
        <article className="mod-article --author">
            <div className="content-media">
                <section className="mod-media">
                    <figure className="mod-figure --horizontal">
                        <a href="javascript:void(0);">
                            <picture className="mod-picture" />
                        </a>
                    </figure>
                </section>
            </div>
            <section className="mod-description">
                <h2 className="com-title --l">
                    <SkeletonSpan extraClass="--line1" />
                    <SkeletonSpan extraClass="--line2" />
                    <SkeletonSpan extraClass="--line3" />
                    <SkeletonSpan extraClass="--line3" />
                </h2>
                <div>
                    <strong className="mod-marquee --fourxs">
                        <SkeletonSpan extraClass="--line1" />
                    </strong>
                </div>
            </section>
        </article>
    ],
    Editoriales: layout =>
        new Array(2).fill().map(e => (
            <article className="mod-article">
                <div className="mod-description">
                    <h2 className="com-title --twoxs">
                        <SkeletonSpan />
                    </h2>
                </div>
            </article>
        ))
};

export const placeholderLayouts = {
    Focal: (articles, layout) => {
        if (!articles.length) return <></>;
        const template = {
            focalLeft3: (
                <div>
                    <section className="box-articles --focal --left">
                        <section className="mod-headersection --line">
                            <h4 className="com-title --l">
                                <SkeletonSpan />
                            </h4>
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
                            <h4 className="com-title --l">
                                <SkeletonSpan />
                            </h4>
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
                        <h4 className="com-title --l">
                            <SkeletonSpan />
                        </h4>
                    </section>
                    <div className="row-gap-tablet-3 ">{articles}</div>
                </section>
            </div>
        );
    },
    Grilla: (articles, layout) => {
        const quantityNotes = Math.abs(layout.slice(-1));
        if (!quantityNotes) return [];
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
                        <h4 className="com-title --l">
                            <SkeletonSpan />
                        </h4>
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
                    <h4 className="com-title --l">
                        <SkeletonSpan />
                    </h4>
                </section>
                <div className="row-gap-tablet-3 ">{articles}</div>
            </section>
        </div>
    ),
    Opinion: articles => (
        <div>
            <section className="box-articles  --opinion">
                <section className="mod-headersection --line">
                    <h4 className="com-title --l">
                        <SkeletonSpan />
                    </h4>
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
    )
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
