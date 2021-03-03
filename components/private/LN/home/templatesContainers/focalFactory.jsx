import React from 'react';
import PropTypes from 'fusion:prop-types';
import ArticleAcum from '../../acumulado/articleAcum';

const FocalFactory = ({
    directionFocal,
    articles = [],
    outputType,
    boxPosition
}) => {
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
                    withSubhead={directionFocal === 'focalLeft3'}
                    artPosition="01"
                    boxPosition={boxPosition}
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
                    withSubhead={directionFocal === 'focalRight3'}
                    artPosition="02"
                    boxPosition={boxPosition}
                />
                {directionFocal === 'focalLeft3' && (
                    <ArticleAcum
                        article={articles[2]}
                        outputType={outputType}
                        label="Chapita"
                        artPosition="03"
                        boxPosition={boxPosition}
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
