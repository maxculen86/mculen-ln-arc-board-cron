import React from 'react';
import PropTypes from 'fusion:prop-types';
import getProperties from 'fusion:properties';
import Article from './mod-article';
import get from './utils/get';
import getFirstAuthorAsString from './utils/getAuthorsAsString';

const Opinion = props => {
    const { articles = [], layout, arcSite } = props;
    const transform = _articles =>
        _articles &&
        _articles.length &&
        _articles.map((article, index) => {
            const { credits = { by: [] } } = article;
            const { by } = credits;
            const newCredits = {
                ...credits,
                by: ((!by || !by.length) && []) || [{ ...by[0] }]
            };
            return {
                ...article,
                credits: newCredits
            };
        });

    const { cajaTemaConfig } = getProperties(arcSite);
    const { 0: configArt1, 1: configArt2, 2: configArt3, 3: configArt4 } = get(
        cajaTemaConfig,
        `[${layout}].articles`,
        {}
    );
    const [art1, art2, art3, art4] = transform(articles) || [];
    const labelVolantaText = 'label.volanta.text';
    const headlinesMobile = 'headlines.mobile';
    const headlinesBasic = 'headlines.basic';

    return (
        (art1 && art2 && art3 && art4 && (
            <>
                <div className="col-tablet-5">
                    <Article
                        articleData={art1}
                        link={get(art1, 'website_url')}
                        leadText={get(art1, `${labelVolantaText}`, '')}
                        titleSize={get(configArt1, 'titleSize', '')}
                        titleText={
                            get(art1, `${headlinesMobile}`) ||
                            get(art1, `${headlinesBasic}`)
                        }
                        withMedia="true"
                        authors={getFirstAuthorAsString(art1)}
                        label={
                            (get(configArt1, 'withChapita', false) &&
                                get(art1, 'label.chapita.text', '')) ||
                            ''
                        }
                        boxPosition="98"
                        artPosition="01"
                    />
                </div>
                <div className="col-tablet-4">
                    <Article
                        articleData={art2}
                        link={get(art2, 'website_url')}
                        leadText={get(art2, `${labelVolantaText}`, '')}
                        titleSize={get(configArt2, 'titleSize', '')}
                        titleText={
                            get(art2, `${headlinesMobile}`) ||
                            get(art2, `${headlinesBasic}`)
                        }
                        withMedia="true"
                        authors={getFirstAuthorAsString(art2)}
                        authorSize={get(configArt2, 'authorSize', '')}
                        isRenderAuthorOpinion={get(
                            configArt2,
                            'isRenderAuthorOpinion',
                            false
                        )}
                        boxPosition="98"
                        artPosition="02"
                    />
                    <Article
                        articleData={art3}
                        link={get(art3, 'website_url')}
                        leadText={get(art3, `${labelVolantaText}`, '')}
                        titleSize={get(configArt3, 'titleSize', '')}
                        titleText={
                            get(art3, `${headlinesMobile}`) ||
                            get(art3, `${headlinesBasic}`)
                        }
                        withMedia="true"
                        authors={getFirstAuthorAsString(art3)}
                        authorSize={get(configArt3, 'authorSize', '')}
                        isRenderAuthorOpinion={get(
                            configArt3,
                            'isRenderAuthorOpinion',
                            false
                        )}
                        boxPosition="98"
                        artPosition="03"
                    />
                </div>
                <div className="col-tablet-3">
                    <Article
                        articleData={art4}
                        link={get(art4, 'website_url')}
                        leadText={get(art4, `${labelVolantaText}`, '')}
                        titleSize={get(configArt4, 'titleSize', '')}
                        titleText={
                            get(art4, `${headlinesMobile}`) ||
                            get(art4, `${headlinesBasic}`)
                        }
                        withMedia="true"
                        authors={getFirstAuthorAsString(art4)}
                        authorSize={get(configArt4, 'authorSize', '')}
                        isRenderAuthorOpinion={get(
                            configArt4,
                            'isRenderAuthorOpinion',
                            false
                        )}
                        boxPosition="98"
                        artPosition="04"
                    />
                </div>
            </>
        )) || <></>
    );
};

Opinion.propTypes = {
    articles: PropTypes.shape({}),
    layout: PropTypes.string,
    arcSite: PropTypes.string
};

Opinion.defaultProps = {
    articles: [],
    layout: 'opinion4',
    arcSite: 'la-nacion-ar'
};

export default Opinion;
