/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Timeline from './timeline';
import CajaTemaWrapper from './cajaTemaWrapper';
import ModHeaderSection from '../../common/mod-headerSection';
import { getLayoutType, getMarkupForDatalayer } from './utils/cajaTemasHelper';
import getComponentForLayout from './utils/getComponentForLayout';
import clearArticleKey from './utils/clearArticleKey';
import getFeatureByLayout from './utils/getFeatureByLayout';
import { setTLDistribution, setTLOrderClass } from './utils/timeline';
import '../../../../resources/dist/css/ln/modules/box-articles.css';

function CajaTema(props) {
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
        setRefs = []
    } = props;

    if (!setRefs.current) {
        setRefs.current = [];
    }

    const artWithoutDate = clearArticleKey('display_date', articles);
    const layoutName = getLayoutType(layout, artWithoutDate, _children);

    const { extraOptsDiv, extraOpts } = getMarkupForDatalayer(
        layoutName,
        layout,
        position,
        sectionName,
        positionInsideSection
    );

    const childrenComponent =
        getComponentForLayout(
            layoutName,
            {
                ...props,
                articles: artWithoutDate
            },
            setRefs
        ) || {};

    const sectionProps = {
        ...extraOpts,
        className: `box-articles ${backgroundColor} ${classCondition}`
    };

    const options = {
        // eslint-disable-next-line react/no-unstable-nested-components
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
}

const areEqual = (prevProps, nextProps) =>
    prevProps &&
    nextProps &&
    prevProps.articles &&
    nextProps.articles &&
    prevProps.articles.length &&
    nextProps.articles.length &&
    prevProps.articles.length === nextProps.articles.length;

export default React.memo(CajaTema, areEqual);
