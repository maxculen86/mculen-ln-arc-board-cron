/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import Timeline from './timeline';
import CajaTemaWrapper from './cajaTemaWrapper';
import ModHeaderSection from '../../common/mod-headerSection';
import { getLayoutType, getMarkupForDatalayer } from './utils/cajaTemasHelper';
import getComponentForLayout from './utils/getComponentForLayout';
import clearArticleKey from './utils/clearArticleKey';
import getFeatureByLayout from './utils/getFeatureByLayout';
import { setTLDistribution, setTLOrderClass } from './utils/timeline';

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
        positionInsideSection = '',
        sectionName = '',
        _children = [],
        isHome = false,
        features,
        pageLayout,
        isMultimedia
    } = props;

    const artWithoutDate = clearArticleKey(articles, 'display_date');
    const layoutName = getLayoutType(layout, artWithoutDate, _children);

    const { extraOptsDiv, extraOpts } = getMarkupForDatalayer(
        layoutName,
        layout,
        position,
        sectionName,
        positionInsideSection
    );

    const childrenComponent =
        getComponentForLayout(layoutName, {
            ...props,
            articles: artWithoutDate
        }) || {};

    const sectionProps = {
        ...extraOpts,
        className: `box-articles ${backgroundColor} ${classCondition}`
    };

    const options = {
        Timeline: () => {
            const feature = getFeatureByLayout(features, _children, layoutName);

            if (!feature) return null;

            const timeline = setTLDistribution(feature.props.id, _children);
            const orderClass = setTLOrderClass(timeline);

            return (
                <Timeline
                    content={timeline.content}
                    articles={timeline.articles}
                    orderClass={orderClass}
                />
            );
        }
    };

    const isRanking = sectionName === 'Ranking';
    const withHeaderSection = !hideTitle && layoutName !== 'Editoriales';
    const withGridFour = isHome ? 'row-gap-tablet-4' : '';

    const mainComponent =
        (options[layoutName] && options[layoutName]()) || null;

    return (
        <div {...extraOptsDiv}>
            <section {...sectionProps}>
                <ModHeaderSection
                    isVisible={withHeaderSection}
                    imageId={imageId}
                    title={title}
                    link={url}
                    customTitle={!hideTitle && title}
                    layout={pageLayout}
                    isMultimedia={isMultimedia}
                />

                {mainComponent}

                <CajaTemaWrapper
                    isVisible={!mainComponent}
                    isRanking={isRanking}
                    notesQuantity={notesQuantity}
                    layoutName={layoutName}
                    withGridFour={withGridFour}
                >
                    {childrenComponent}
                </CajaTemaWrapper>
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
