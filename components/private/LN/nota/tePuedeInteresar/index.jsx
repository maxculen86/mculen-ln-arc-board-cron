import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';
import ArticleMain from '../../common/articleTypes/articleMain';
import ComTitle from '../../../common/com-title';

const Index = props => {
    const {
        userId,
        sessionId,
        cantidadNotas,
        excludeItems,
        outputType,
        url,
        idArticle,
        arcSite
    } = props;

    const articles = useContent({
        source: 'liftigniterSource',
        query: {
            cantidadNotas,
            referrer: url,
            imageConfig: 'm',
            idArticle,
            userId,
            sessionId,
            excludeItems,
            arcSite,
            action: 'model'
        }
    });
    console.log('🚀 ~ file: index.jsx ~ line 33 ~ articles', articles);

    const handleClick = (event, nextUrl) => {
        console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx5');
        console.log(
            '🚀 ~ file: index.jsx ~ line 34 ~ handleClick ~ props',
            url,
            nextUrl
        );
        const status = useContent({
            source: 'liftigniterSource',
            query: {
                cantidadNotas,
                referrer: url,
                imageConfig: 'm',
                idArticle,
                userId,
                sessionId,
                excludeItems,
                arcSite,
                action: 'activity'
            }
        });
        console.log(
            '🚀 ~ file: index.jsx ~ line 51 ~ handleClick ~ status',
            status
        );
        debugger;
    };

    return articles && articles.length > 0 ? (
        <div className="row interest">
            <ComTitle tag="h4" size="--xl" content="Te puede interesar" />
            <section className="row-gap-tablet-3 row-gap-desksm-3">
                {articles.map((article, index) => {
                    return (
                        <ArticleMain
                            articleData={article}
                            key={article._id}
                            outputType={outputType}
                            position={index + 1}
                            handleClick={handleClick}
                        />
                    );
                })}
            </section>
        </div>
    ) : (
        <></>
    );
};

Index.propTypes = {
    cantidadNotas: PropTypes.number.isRequired,
    userId: PropTypes.string,
    sessionId: PropTypes.string.isRequired,
    outputType: PropTypes.string.isRequired,
    idArticle: PropTypes.string,
    url: PropTypes.string.isRequired,
    excludeItems: PropTypes.arrayOf(PropTypes.string),
    arcSite: PropTypes.string
};

Index.defaultProps = {
    userId: null,
    excludeItems: null,
    idArticle: null,
    arcSite: 'la-nacion-ar'
};

export default Index;
