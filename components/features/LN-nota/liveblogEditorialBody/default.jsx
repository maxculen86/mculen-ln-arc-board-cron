import React, { Fragment, useEffect } from 'react';
import { useAppContext } from 'fusion:context';
import {
    getContentBeforeLiveblogPosts,
    groupByLiveblogMarkers,
    reorderGroupsByPinnedBlock,
    shouldShowTopDivider,
    getPostRenderData
} from '../../../layouts/LN-Nota-Liveblog_Editorial/_helpers/liveblogEditorialBody';
import BuildLiveblogBody from '../../../layouts/LN-Nota-Liveblog_Editorial/components/body/BuildLiveblogBody';
import LiveBlogBody from '../../../layouts/LN-Nota-Liveblog_Editorial/components/body/LiveBlogBody';
import useLazyEmbeds from '../../LN-common/hooks/useLazyEmbeds';
import useScrollDispatcher, {
    registerScrollTrigger
} from '../../LN-common/hooks/useScrollDispatcher';

function BodyLiveblogEditorial() {
    const { globalContent, outputType, _id } = useAppContext();
    const { content_elements: contentElements = [] } = globalContent;

    const preLiveblog = getContentBeforeLiveblogPosts(contentElements);
    const posts = reorderGroupsByPinnedBlock(
        groupByLiveblogMarkers(contentElements)
    );

    useLazyEmbeds({
        contentElements,
        outputType,
        bodyOrigin: 'Body Liveblog Editorial',
        noteId: _id,
        selector: '#body-liveblog-editorial'
    });

    useScrollDispatcher({
        startSelector: 'h1', // titulo
        endSelector: '#fin-de-nota'
    });

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

        registerScrollTrigger({
            id: 'scroll-body-GA',
            type: 'percentage',
            threshold: 10,
            thresholdStep: 10,
            callback: percent => {
                if (window.dataLayer) {
                    window.dataLayer.push({
                        event: 'scroll_tracking_nota',
                        scroll_percent: percent,
                        content_type: 'nota'
                    });
                }
            }
        });
    }, []);

    return (
        <>
            <LiveBlogBody.Pre>
                <BuildLiveblogBody
                    groupedElements={preLiveblog}
                    outputType={outputType}
                    globalContent={globalContent}
                />
            </LiveBlogBody.Pre>
            <LiveBlogBody.Posts>
                {posts.map((grupo, index) => {
                    const showTopDivider = shouldShowTopDivider(index, posts);
                    const showBottomDivider = !grupo.isPinned;
                    const postData = getPostRenderData(grupo);
                    const { visibleItems } = postData;
                    return (
                        <Fragment key={grupo?.id}>
                            {showTopDivider && <LiveBlogBody.Divider />}

                            <LiveBlogBody.Post {...postData}>
                                <BuildLiveblogBody
                                    groupedElements={visibleItems}
                                    outputType={outputType}
                                    globalContent={globalContent}
                                />
                            </LiveBlogBody.Post>
                            {showBottomDivider && <LiveBlogBody.Divider />}
                        </Fragment>
                    );
                })}
            </LiveBlogBody.Posts>
        </>
    );
}

BodyLiveblogEditorial.label = 'LN-Nota-Body-LiveblogEditorial';

export default BodyLiveblogEditorial;
