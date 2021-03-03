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
        titleSize,
        notesQuantity = 3,
        hideTitle = false,
        withSubhead = false,
        position
    } = props;

    const isFocal = layout.includes('focal');
    const isRenderAuthor = layout.includes('author');

    return (
        <div data-module={`tema_${position}`}>
            <section
                id={`tema_${position}`}
                data-block-name={`h_tema-${position}`}
                data-diagramacion-id={layout}
                className={`box-articles ${backgroundColor} ${classCondition}`}
            >
                {!hideTitle && (
                    <ModHeaderSection
                        imageId={imageId}
                        title={title}
                        link={url}
                    />
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
                            boxPosition={position}
                        />
                    ) : (
                        articles.map((art, i) => {
                            const artPosition = `0${Number(i) + 1}`.slice(-2);
                            const artWithoutDate = { ...art, display_date: '' };
                            return (
                                <ArticleAcum
                                    key={artWithoutDate._id}
                                    article={artWithoutDate}
                                    outputType={outputType}
                                    frontdemo
                                    titleSize={titleSize}
                                    isRenderAuthor={isRenderAuthor}
                                    withSubhead={withSubhead}
                                    boxPosition={position}
                                    artPosition={artPosition}
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
    layout: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    classCondition: PropTypes.string.isRequired,
    notesQuantity: PropTypes.number.isRequired,
    hideTitle: PropTypes.boolean.isRequired,
    withSubhead: PropTypes.boolean.isRequired,
    title: PropTypes.string,
    titleSize: PropTypes.string,
    url: PropTypes.string,
    imageId: PropTypes.string,
    position: PropTypes.string.isRequired,
    dataDiagramacion: PropTypes.string.isRequired
};

CajaTema.defaultProps = {
    title: null,
    url: null,
    imageId: null,
    titleSize: null
};

const areEqual = (prevProps, nextProps) =>
    prevProps.articles.length === nextProps.articles.length;

export default React.memo(CajaTema, areEqual);
