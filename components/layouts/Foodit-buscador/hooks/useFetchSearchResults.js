import { API_QUERYLY, API_KEY_QUERYLY } from 'fusion:environment';
import { useState, useEffect } from 'react';
import { transformListGroups } from '../_helpers';

const URL_BASE = `${API_QUERYLY}/json.aspx?queryly_key=${API_KEY_QUERYLY}&extendeddatafields=category,creator,subtype,counter_time,guid,creator,imageresizer,promo_image,counter_time,section,subtype,video_jw`;

function useFetchSearchResults({
    queryUrl,
    filters,
    page,
    withFilterBox = true
}) {
    const [data, setData] = useState({ loading: true, articlesGrid: [] });

    useEffect(() => {
        const fetchSearchResults = async (
            query,
            appliedFilters,
            numberPage
        ) => {
            try {
                const response = await fetch(
                    `${URL_BASE}&query=${query}&batchsize=24&showfaceted=${withFilterBox}${appliedFilters}&endindex=${numberPage}`
                );

                const {
                    faceted,
                    items,
                    metadata = {}
                } = (await response.json()) || {};

                const { total } = metadata;
                const result = {
                    listFilters: withFilterBox
                        ? transformListGroups(faceted)
                        : {},
                    articlesGrid:
                        numberPage > 0
                            ? [...data.articlesGrid, ...items]
                            : items,
                    total,
                    isFinishPagination: items.length < 24
                };

                setData({ ...result, loading: false });
            } catch (error) {
                console.error('Error fetching search results:', error);
                setData({ loading: false, data: {} });
            }
        };

        fetchSearchResults(queryUrl, filters, page);
    }, [queryUrl, filters, page]);

    return { data, loading: data.loading };
}

export default useFetchSearchResults;
