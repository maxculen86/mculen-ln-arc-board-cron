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
                            <LiveBlogBody.Divider />
                        </Fragment>
                    );
                })}
            </LiveBlogBody.Posts>
        </>
    );
}

BodyLiveblogEditorial.label = 'LN-Nota-Body-LiveblogEditorial';

export default BodyLiveblogEditorial;
