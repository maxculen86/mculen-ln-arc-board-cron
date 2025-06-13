import React, { Fragment, useEffect } from 'react';
import { useAppContext } from 'fusion:context';
import {
    getContentBeforeLiveblogPosts,
    getLiveblogHeaderData,
    groupByLiveblogMarkers,
    reorderGroupsByPinnedBlock,
    extractVisibleItemsWithShowMore,
    shouldShowTopDivider
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
                    const liveblogHeader = getLiveblogHeaderData(grupo);
                    const { visibleItems, hiddenItems, isExpandable } =
                        extractVisibleItemsWithShowMore(grupo.items);
                    const dataPost = {
                        ...grupo,
                        ...liveblogHeader,
                        isExpandable,
                        hiddenTextItems: hiddenItems
                    };

                    const showTopDivider = shouldShowTopDivider(index, posts);
                    return (
                        <Fragment key={grupo?.id}>
                            {showTopDivider && <LiveBlogBody.Divider />}

                            <LiveBlogBody.Post {...dataPost}>
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
