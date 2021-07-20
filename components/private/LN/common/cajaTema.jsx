/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import ModRowGap from '../../common/mod-rowgap';
import ModHeaderSection from '../../common/mod-headerSection';
import Opinion from '../../common/opinion';
import Editoriales from '../../common/editoriales';
import ArticleAcum from '../acumulado/articleAcum';
import FocalFactory from '../home/templatesContainers/focalFactory';
import {
    customHeading,
    getLayoutType,
    getMarkupForDatalayer
} from './utils/cajaTemasHelper';
import OrderedList from './lists/ordered';

const getComponentForLayout = (layoutName, props) => {
    const types = {
        Opinion: ({ articles, layout }) => {
            return <Opinion articles={articles} layout={layout} />;
        },
        Editoriales: ({ articles, layout, title, url }) => {
            return (
                <Editoriales
                    articles={articles}
                    layout={layout}
                    title={title}
                    link={url}
                />
            );
        },
        Focal: ({ articles, layout, outputType, position, _children }) => {
            return (
                <FocalFactory
                    directionFocal={layout}
                    articles={articles}
                    outputType={outputType}
                    boxPosition={position}
                    _children={_children}
                />
            );
        },
        Grilla: ({
            articles,
            layout = 'grilla3',
            outputType = 'default',
            position,
            titleSize,
            withSubhead = false,
            dataSection,
            handleClick,
            sectionName,
            withVolanta = true
        }) => {
            const customTitleTag = customHeading[sectionName] || 'h2';
            return articles.map((art, i) => {
                const artPosition = `0${Number(i) + 1}`.slice(-2);
                const isRenderAuthor = layout.includes('author');

                return (
                    <ArticleAcum
                        key={art._id}
                        article={art}
                        outputType={outputType}
                        frontdemo
                        titleSize={titleSize}
                        isRenderAuthor={isRenderAuthor}
                        withSubhead={withSubhead}
                        withVolanta={withVolanta}
                        boxPosition={
                            position === 'toi'
                                ? `toi${Number(i) + 1}`
                                : position
                        }
                        artPosition={position !== 'toi' ? artPosition : ''}
                        handleClick={handleClick}
                        dataSection={dataSection}
                        titleTag={customTitleTag}
                    />
                );
            });
        },
        ArticleFeature: ({ _children = [], notesQuantity }) => {
            return _children.slice(0, notesQuantity);
        }
    };

    return (types[layoutName] && types[layoutName](props)) || <></>;
};

const CajaTema = props => {
    const {
        title,
        imageId,
        url,
        articles = [],
        layout = 'grilla3',
        backgroundColor = '',
        classCondition = '',
        notesQuantity = 3,
        hideTitle = false,
        position,
        sectionName = '',
        _children = []
    } = props;

    const artWithoutDate =
        (articles && articles.map(art => ({ ...art, display_date: '' }))) || [];

    const layoutName = getLayoutType(layout, artWithoutDate, _children);

    const { extraOptsDiv, extraOpts } = getMarkupForDatalayer(
        layoutName,
        layout,
        position,
        sectionName
    );

    const childrenComponent = getComponentForLayout(layoutName, {
        ...props,
        articles: artWithoutDate
    });

    return (
        <div {...extraOptsDiv}>
            <section
                {...extraOpts}
                className={`box-articles ${backgroundColor} ${classCondition}`}
            >
                {!hideTitle && layoutName !== 'Editoriales' && (
                    <ModHeaderSection
                        imageId={imageId}
                        title={title}
                        link={url}
                    />
                )}
                <ModRowGap typeArticle={layoutName} column={notesQuantity}>
                    {sectionName === 'Ranking' ? (
                        <OrderedList>{childrenComponent}</OrderedList>
                    ) : (
                        childrenComponent
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
    backgroundColor: PropTypes.string,
    classCondition: PropTypes.string.isRequired,
    notesQuantity: PropTypes.number,
    hideTitle: PropTypes.boolean.isRequired,
    withSubhead: PropTypes.boolean,
    title: PropTypes.string,
    titleSize: PropTypes.oneOfType([PropTypes.boolean, PropTypes.string]),
    url: PropTypes.string,
    imageId: PropTypes.string,
    position: PropTypes.oneOfType([PropTypes.boolean, PropTypes.string])
        .isRequired,
    sectionName: PropTypes.string.isRequired,
    _children: PropTypes.arrayOf(PropTypes.node)
};

CajaTema.defaultProps = {
    title: null,
    url: null,
    imageId: null,
    titleSize: null,
    withSubhead: false,
    notesQuantity: 3,
    _children: [],
    backgroundColor: ''
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
