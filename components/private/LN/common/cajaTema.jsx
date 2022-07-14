/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
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
import { setTLDistribution, setTLOrderClass } from './utils/timeline';
import getFeatureByLayout from './utils/getFeatureByLayout';
import OrderedList from './lists/ordered';
import '../../../../resources/dist/css/ln/components/timeline.css';

const getComponentForLayout = (layoutName, props) => {
    const types = {
        Opinion: ({ articles, layout, handleClick }) => {
            return (
                <Opinion
                    articles={articles}
                    layout={layout}
                    handleClick={handleClick}
                />
            );
        },
        Editoriales: ({ articles, layout, title, url, handleClick }) => {
            return (
                <Editoriales
                    articles={articles}
                    layout={layout}
                    title={title}
                    link={url}
                    handleClick={handleClick}
                />
            );
        },
        Focal: ({
            articles,
            layout,
            outputType,
            position,
            _children,
            handleClick
        }) => {
            return (
                <FocalFactory
                    directionFocal={layout}
                    articles={articles}
                    outputType={outputType}
                    boxPosition={position}
                    _children={_children}
                    handleClick={handleClick}
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
            const customTitleTag =
                sectionName === 'Ranking' && props.isHome
                    ? 'h2'
                    : customHeading[sectionName] || 'h2';
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
                        sectionName={sectionName}
                        titleTag={customTitleTag}
                    />
                );
            });
        },

        ArticleFeature: ({ _children, notesQuantity }) => {
            return _children.slice(0, notesQuantity);
        },

        Timeline: ({ _children, features = [] }) => {
            const feature = getFeatureByLayout(features, _children, layoutName);

            if (!feature) return {};

            const timeline = setTLDistribution(_children, feature.props.id);
            const orderClass = setTLOrderClass(timeline);

            return {
                timeline,
                orderClass
            };
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
        _children = [],
        isHome = false
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

    const childrenComponent =
        getComponentForLayout(layoutName, {
            ...props,
            articles: artWithoutDate
        }) || {};

    const isTimeline = layoutName === 'Timeline';
    const isRanking = sectionName === 'Ranking';
    const withHeaderSection = !hideTitle && layoutName !== 'Editoriales';
    const withGridFour = isHome ? 'row-gap-tablet-4' : '';
    const { timeline = {}, orderClass = '' } = childrenComponent;

    return (
        <div {...extraOptsDiv}>
            <section
                {...extraOpts}
                className={`box-articles ${backgroundColor} ${classCondition}`}
            >
                {withHeaderSection && (
                    <ModHeaderSection
                        imageId={imageId}
                        title={title}
                        link={url}
                        customTitle={!hideTitle && title}
                    />
                )}

                {(isTimeline && (
                    <ModRowGap classCondition={`timeline-home ${orderClass}`}>
                        <div className="timeline-content">
                            {timeline.content}
                        </div>
                        <div className="row-gap-tablet-2">
                            {timeline.articles}
                        </div>
                    </ModRowGap>
                )) || (
                    <ModRowGap column={notesQuantity} typeArticle={layoutName}>
                        {isRanking ? (
                            <OrderedList extraClass={withGridFour}>
                                {childrenComponent}
                            </OrderedList>
                        ) : (
                            childrenComponent
                        )}
                    </ModRowGap>
                )}
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
    outputType: PropTypes.string,
    layout: PropTypes.string,
    backgroundColor: PropTypes.string,
    classCondition: PropTypes.string,
    notesQuantity: PropTypes.number,
    hideTitle: PropTypes.bool,
    withSubhead: PropTypes.bool,
    title: PropTypes.string,
    titleSize: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    url: PropTypes.string,
    imageId: PropTypes.string,
    position: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
        .isRequired,
    sectionName: PropTypes.string.isRequired,
    _children: PropTypes.arrayOf(PropTypes.node)
};

CajaTema.defaultProps = {
    classCondition: '',
    backgroundColor: '',
    layout: 'grilla3',
    title: null,
    url: null,
    imageId: null,
    titleSize: undefined,
    withSubhead: false,
    hideTitle: false,
    notesQuantity: 3,
    _children: [],
    outputType: 'default'
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
