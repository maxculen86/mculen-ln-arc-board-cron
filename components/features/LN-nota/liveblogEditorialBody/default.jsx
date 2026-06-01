import React, { Fragment, useEffect } from 'react';
import { useAppContext } from 'fusion:context';
import {
    reorderGroupsByPinnedBlock,
    shouldShowTopDivider,
    getPostRenderData,
    supportedTypesLiveblog
} from '../../../layouts/LN-Nota-Liveblog_Editorial/_helpers/liveblogEditorialBody';
import {
    getContentBeforeMarkers,
    groupByMarkers
} from '../../../layouts/helpers/groupingUtils';
import LiveBlogBody from '../../../layouts/LN-Nota-Liveblog_Editorial/components/body/LiveBlogBody';
import BuildBody from '../body/_children/_buildBody';
import BaseBodyWrapper from '../body/_children/BaseBodyWrapper';
import { registerScrollTrigger } from '../../LN-common/hooks/useScrollDispatcher';
import LiveblogDynamicBanner from '../../../private/common/banners/liveblogEditorial/LiveblogDynamicBanner';
import { getLiveblogDynamicBannersByCardPosition } from '../../../private/common/banners/liveblogEditorial/config';

function BodyLiveblogEditorial() {
    const {
        globalContent = {},
        outputType,
        globalContentConfig
    } = useAppContext();
    const { _id: noteId, content_elements: contentElements = [] } =
        globalContent;

    const preLiveblog = getContentBeforeMarkers(
        contentElements,
        'custom-liveblog'
    );
    const posts = reorderGroupsByPinnedBlock(
        groupByMarkers(contentElements, 'custom-liveblog', 'liveblog')
    );

    useEffect(() => {
        const hashWidthId = window.location.hash;
        const id = hashWidthId.slice(1);
        const element = document.getElementById(id);

        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }, []);

    const registerScrollTracking = articleId => {
        registerScrollTrigger({
            id: 'scroll-body-GA',
            type: 'percentage',
            threshold: 25,
            thresholdStep: 25,
            callback: percent => {
                if (window.dataLayer) {
                    window.dataLayer.push({
                        event: 'scroll_tracking_nota',
                        scroll_percent: percent,
                        content_type: 'nota',
                        ...(articleId && { nota_ID_Arc: articleId })
                    });
                }
            }
        });
    };

    return (
        <BaseBodyWrapper
            contentElements={contentElements}
            outputType={outputType}
            noteId={noteId}
            selector="body-liveblog-editorial"
            bodyOrigin="Body Liveblog Editorial"
            onRegisterScrollTrigger={registerScrollTracking}
        >
            <>
                <LiveBlogBody.Pre>
                    <BuildBody
                        groupedElements={preLiveblog}
                        outputType={outputType}
                        globalContent={globalContent}
                        supportedTypesOverride={supportedTypesLiveblog}
                        useCapitalIndex={false}
                        useBanners={false}
                        useCounter={false}
                    />
                </LiveBlogBody.Pre>
                <LiveBlogBody.Posts>
                    {posts.map((grupo, index) => {
                        const cardPosition = index + 1;
                        const showTopDivider = shouldShowTopDivider(
                            index,
                            posts
                        );
                        const showBottomDivider = !grupo.isPinned;
                        const dynamicBanners =
                            getLiveblogDynamicBannersByCardPosition(
                                cardPosition
                            );
                        const postData = getPostRenderData(grupo);
                        const { visibleItems } = postData;
                        return (
                            <Fragment key={grupo?.id}>
                                {showTopDivider && <LiveBlogBody.Divider />}

                                <LiveBlogBody.Post {...postData}>
                                    <BuildBody
                                        groupedElements={visibleItems}
                                        outputType={outputType}
                                        globalContent={globalContent}
                                        supportedTypesOverride={
                                            supportedTypesLiveblog
                                        }
                                        useCapitalIndex={false}
                                        useBanners={false}
                                        useCounter={false}
                                    />
                                </LiveBlogBody.Post>
                                {showBottomDivider && <LiveBlogBody.Divider />}
                                {dynamicBanners.map(
                                    ({ device, slotId, showForSubscriber }) => (
                                        <LiveblogDynamicBanner
                                            key={`liveblog-dynamic-banner-${device}-${slotId}-${cardPosition}`}
                                            device={device}
                                            slotId={slotId}
                                            showForSubscriber={
                                                showForSubscriber
                                            }
                                            globalContent={globalContent}
                                            globalContentConfig={
                                                globalContentConfig
                                            }
                                        />
                                    )
                                )}
                            </Fragment>
                        );
                    })}
                </LiveBlogBody.Posts>
            </>
        </BaseBodyWrapper>
    );
}

BodyLiveblogEditorial.label = 'LN-Nota-Body-LiveblogEditorial';

export default BodyLiveblogEditorial;
