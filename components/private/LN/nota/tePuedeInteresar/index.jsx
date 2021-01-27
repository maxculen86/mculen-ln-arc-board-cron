import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';
import { useAppContext } from 'fusion:context';
import ArticleMain from '../../common/articleTypes/articleMain';
import ComTitle from '../../../common/com-title';

const Index = ({ cantidadNotas }) => {
    const {
        outputType,
        requestUri,
        siteProperties,
        globalContent
    } = useAppContext();
    const { host = 'https://www.lanacion.com.ar' } = siteProperties;
    const { _id } = globalContent || {};
    const articles = useContent({
        source: 'liftigniterSource',
        query: {
            cantidadNotas,
            referrer: `${host}${requestUri}`,
            imageConfig: 'm',
            idArticle: _id
        }
    });

    return articles && articles.length > 0 ? (
        <div className="row interest">
            <ComTitle tag="h4" size="--l" content="Te puede interesar" />
            <section className="row-gap-tablet-3 row-gap-desksm-3">
                {articles.map((article, index) => {
                    return (
                        <ArticleMain
                            articleData={article}
                            key={article._id}
                            outputType={outputType}
                            position={index + 1}
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
    cantidadNotas: PropTypes.number.isRequired
};

export default Index;
