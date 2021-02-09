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
        imageId,
        url,
        articles = [],
        layout = 'grilla3',
        backgroundColor = '',
        classCondition = '',
        notesQuantity = 3,
        hideTitle = false,
        withSubhead = false
    } = props;
    
    console.log("🚀 ~ file: cajaTema.jsx ~ line 15 ~ articles", articles.length)
    const isFocal = layout.includes('focal');
    const isRenderAuthor = layout.includes('author');

    return (
        <section
            className={`box-articles ${backgroundColor} ${classCondition}`}
        >
            {!hideTitle && (
                <ModHeaderSection imageId={imageId} title={title} link={url} />
            )}
            <ModRowGap
                typeArticle={isFocal ? 'Focal' : 'Grilla'}
                column={notesQuantity}
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
                                withSubhead={withSubhead}
                            />
                        );
                    })
                )}
            </ModRowGap>
        </section>
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

CajaTema.defaultProps = {
    title: PropTypes.string,
    url: PropTypes.string
};

const areEqual = (prevProps, nextProps) => {
    // Retorna true para no renderizar otra vez
    if (prevProps.articles.length === nextProps.articles.length) return true;

    return false;
};

export default React.memo(CajaTema, areEqual);
