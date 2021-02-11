import React from 'react';
import PropTypes from 'fusion:prop-types';
import ArticleAcum from '../../acumulado/articleAcum';

const FocalFactory = ({ directionFocal, articles = [], outputType }) => {
    if (articles.length < 2) return null;
    if (directionFocal === 'focalLeft3' && articles.length < 3) return null;
    return (
        <>
            <div className="col-tablet-8">
                <ArticleAcum
                    article={articles[0]}
                    outputType={outputType}
                    label="Chapita"
                    titleSize={directionFocal === 'focalLeft3' ? '--xl' : '--l'}
                />
            </div>
            <div className="col-tablet-4">
                <ArticleAcum
                    article={articles[1]}
                    outputType={outputType}
                    label="Chapita"
                    titleSize={
                        directionFocal === 'focalRight3' ? '--xl' : '--xs'
                    }
                />
                {directionFocal === 'focalLeft3' && (
                    <ArticleAcum
                        article={articles[2]}
                        outputType={outputType}
                        label="Chapita"
                    />
                )}
            </div>
        </>
    );
};

FocalFactory.propTypes = {
    directionFocal: PropTypes.string.isRequired,
    outputType: PropTypes.string.isRequired,
    articles: PropTypes.arrayOf(PropTypes.node).isRequired
};

export default FocalFactory;
