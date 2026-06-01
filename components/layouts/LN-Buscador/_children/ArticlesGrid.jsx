import React, { useContext, useState } from 'react';
import { SITE_LANACION } from 'fusion:environment';
import { cx } from '@ln/ds-cva';
import { SearchContext } from './SearchContext';
import SearchInput from './SearchInput';
import SearchHeader from './SearchHeader';
import Card from './card/default';
import Button from '../../../features/ui/ln/button/default';
import { formatSpanishDate, toISODate } from '../helpers/dateFormatter';
import { getArticleImageUrl } from '../helpers/imageUtils';
import { SearchSkeleton } from './skeletons';
import { EmptyState } from './EmptyState';

export default function ArticlesGrid() {
    const contextValue = useContext(SearchContext);

    if (!contextValue) {
        return (
            <div role="alert">
                <p>Error: No context</p>
            </div>
        );
    }

    const {
        data = {},
        loading = true,
        getNextPage = () => {},
        query = '',
        setSort = () => {},
        resetPage = () => {},
        appliedFilters = [],
        dateRange = { startDate: '', endDate: '' }
    } = contextValue;

    const activeFilterCount =
        appliedFilters.length +
        (dateRange.startDate || dateRange.endDate ? 1 : 0);

    const { articlesGrid = [], total = 0, topics = [] } = data || {};

    const [selectedSort, setSelectedSort] = useState('relevance');

    const handleSortChange = newSortValue => {
        setSelectedSort(newSortValue);
        setSort(newSortValue);
        resetPage();
    };

    const showLoadMore =
        articlesGrid.length >= 24 && articlesGrid.length < total;

    const classNameContainer = cx(
        'col-span-8 md:col-span-12',
        articlesGrid.length === 0 && !loading && 'xl:col-span-16'
    );

    const classNameSearchInput = cx(
        'col-span-8',
        articlesGrid.length === 0 && !loading
            ? 'md:col-start-3 md:col-span-8 xl:col-start-5 xl:col-span-8'
            : 'md:col-span-8'
    );

    return (
        <section className={classNameContainer}>
            {loading ? (
                <SearchSkeleton />
            ) : (
                <section
                    className={cx(
                        'col-span-8 md:col-span-12 grid grid-cols-8 md:grid-cols-12',
                        articlesGrid.length === 0 &&
                            !loading &&
                            'xl:grid-cols-16'
                    )}
                >
                    <div className={classNameSearchInput}>
                        <SearchInput />
                    </div>
                    <div className="col-span-8 md:col-span-12">
                        {!loading && articlesGrid.length > 0 && (
                            <SearchHeader
                                total={total}
                                query={query}
                                selectedSort={selectedSort}
                                onSortChange={handleSortChange}
                                activeFilterCount={activeFilterCount}
                            />
                        )}
                    </div>
                    {!loading && articlesGrid.length === 0 && (
                        <div
                            role="status"
                            aria-live="polite"
                            aria-atomic="true"
                            className="col-span-8 md:col-start-3 md:col-span-8 xl:col-start-5 xl:col-span-8"
                        >
                            <EmptyState />
                        </div>
                    )}
                    {!loading && articlesGrid.length > 0 && (
                        <section className="col-span-8 md:col-span-12 grid grid-cols-8 md:grid-cols-12 gap-32 pt-24">
                            {topics.length > 0 && (
                                <Card
                                    variant="highlights"
                                    title={topics[0].title}
                                    href={topics[0].link}
                                    imgSrc={getArticleImageUrl(topics[0])}
                                    description={topics[0].description}
                                />
                            )}
                            {articlesGrid.map((item, index) => {
                                const {
                                    guid,
                                    title,
                                    link,
                                    creator,
                                    pubdate,
                                    description
                                } = item || {};
                                const href = link?.startsWith('http')
                                    ? link
                                    : `${SITE_LANACION}${link}`;
                                const imgSrc = getArticleImageUrl(item);
                                const formattedDate =
                                    formatSpanishDate(pubdate);
                                const dateTime = toISODate(pubdate);

                                return (
                                    <Card
                                        key={guid || index}
                                        variant="regular"
                                        title={title}
                                        href={href}
                                        imgSrc={imgSrc}
                                        author={creator}
                                        formattedDate={formattedDate}
                                        dateTime={dateTime}
                                        description={description}
                                    />
                                );
                            })}
                            {showLoadMore && (
                                <div className="col-span-8 md:col-span-12 flex justify-center mb-24">
                                    <Button size={32} onClick={getNextPage}>
                                        VER MÁS RESULTADOS
                                    </Button>
                                </div>
                            )}
                        </section>
                    )}
                </section>
            )}
        </section>
    );
}
