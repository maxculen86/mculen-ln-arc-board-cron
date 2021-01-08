import React from 'react';
import PropTypes from 'fusion:prop-types';
import ModRowGap from '../../common/mod-rowgap';
import ModHeaderSection from '../../common/mod-headerSection';
import ArticleAcum from '../acumulado/articleAcum';
import FocalFactory from '../home/templatesContainers/focalFactory';

const CajaTema = props => {
    const {
        outputType,
        title,
        url,
        articles = [],
        layout = 'grilla',
        backgroundColor = '',
        classCondition = '',
        notesQuantity = 3,
    } = props;

    const isFocal = layout.includes('focal');
    const isRenderAuthor = layout.includes('author');

    return (
        <div className="home">
            <section
                className={`box-articles ${classCondition} ${backgroundColor}`}
            >
                <ModHeaderSection title={title} link={url} />
                <ModRowGap
                    typeArticle={isFocal ? 'Focal' : 'Grilla'}
                    column={notesQuantity}
                    classCondition={classCondition}
                >
                    {isFocal ? (
                        <FocalFactory
                            directionFocal={layout}
                            articles={articles}
                            outputType={outputType}
                        />
                    ) : (
                        articles.map(art => {
                            const artWithoutDate = { ...art, display_date: '' };
                            return (
                                <ArticleAcum
                                    key={artWithoutDate._id}
                                    article={artWithoutDate}
                                    outputType={outputType}
                                    frontdemo
                                    isRenderAuthor={isRenderAuthor}
                                />
                            );
                        })
                    )}
                </ModRowGap>
            </section>
        </div>
    );
};

CajaTema.propTypes = {
    articles: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string
        })
    ).isRequired,
    outputType: PropTypes.string.isRequired,
    title: PropTypes.string,
    url: PropTypes.string
};

export default CajaTema;
