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
        position,
        sectionName = '',
        _children
    } = props;

    const isFocal = layout.includes('focal');
    const isRenderAuthor = layout.includes('author');
    const extraOptsDiv = {};
    const extraOpts = {};
    if (position) {
        extraOptsDiv['data-module'] = `tema_${position}`;
    }
    if (position) {
        extraOpts['data-block-name'] = `h_${sectionName}tema-${position}`;
        extraOpts['data-diagramacion-id'] = layout;
        extraOpts['data-is-block'] = true;
        extraOpts.id = `tema_${position}`;
    }
    const artWithoutDate =
        (articles && articles.map(art => ({ ...art, display_date: '' }))) || [];

    return (
        <div {...extraOptsDiv}>
            <section
                {...extraOpts}
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
                            articles={artWithoutDate}
                            outputType={outputType}
                            boxPosition={position}
                            _children={_children}
                        />
                    ) : (
                        artWithoutDate.map((art, i) => {
                            const artPosition = `0${Number(i) + 1}`.slice(-2);
                            return (
                                <ArticleAcum
                                    key={art._id}
                                    article={art}
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
    sectionName: PropTypes.string.isRequired,
    _children: PropTypes.arrayOf(PropTypes.obj)
};

CajaTema.defaultProps = {
    title: null,
    url: null,
    imageId: null,
    titleSize: null,
    _children: null
};

const areEqual = (prevProps, nextProps) =>
    prevProps &&
    nextProps &&
    prevProps.articles &&
    nextProps.articles &&
    prevProps.articles.length &&
    nextProps.articles.length &&
    prevProps.articles.length === nextProps.articles.length;

export default React.memo(CajaTema, areEqual);
