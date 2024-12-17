import React, { useContext } from 'react';
import CommonCardFoodit from '../../../features/foodit-global/common/CommonCardFoodit/foodit';
import { LoadMoreButton } from '../../../features/foodit/GrillaNotasAcu/helpers/loadMoreButton';
import { getVariantBySubtype } from '../../../features/foodit-global/common/utils/notaFooditHelper';
import { getTag } from '../_helpers';
import { SearchContext } from './searchContext';
import { SkeletonResultdata } from '../../../features/foodit-global/common/skeletons/Buscador/resultdata';

export default function ArticlesGrid() {
    const {
        data: { articlesGrid = [], total } = {},
        loading,
        getNextPage = () => {},
        query
    } = useContext(SearchContext);

    return (
        <section
            id="resultdata"
            className="col-span-8 col-span-12_md col-span-12_lg"
        >
            {articlesGrid.length > 0 && (
                <div className="flex jc-between pb-24">
                    <div
                        className="text-24 text-28_md prumo prumo-light text-light-800"
                        id="results_count"
                    >
                        <span className="prumo prumo-medium">{total}</span>{' '}
                        resultados de: {query}
                    </div>
                </div>
            )}
            {loading && <SkeletonResultdata />}
            <section className="grid grid-cols-8 grid-cols-12_md grid-cols-16_lg gap-32 mb-32">
                {articlesGrid.map(
                    ({
                        guid,
                        counter_time: counterTime,
                        creator,
                        link,
                        title,
                        subtype,
                        promo_image: promoImage,
                        video_jw: videoJw,
                        section
                    } = {}) => (
                        <CommonCardFoodit
                            key={guid}
                            className="col-span-4"
                            articleId={guid}
                            time={counterTime}
                            size="small"
                            author={creator}
                            tag={getTag(section)}
                            showTime={Boolean(counterTime)}
                            hasVideo={Boolean(videoJw)}
                            src={promoImage}
                            alt={title}
                            title={title}
                            sources={[]}
                            linksProps={{ href: link, title }}
                            variant={getVariantBySubtype(subtype)}
                        />
                    )
                )}
            </section>
            {articlesGrid && articlesGrid.length >= 24 && (
                <LoadMoreButton clickMoreArticle={getNextPage} />
            )}
        </section>
    );
}
