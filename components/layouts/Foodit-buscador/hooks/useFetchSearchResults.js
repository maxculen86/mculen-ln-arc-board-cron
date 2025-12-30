import { API_QUERYLY, API_KEY_QUERYLY } from 'fusion:environment';
import { useState, useEffect } from 'react';
import { transformListGroups } from '../_helpers';

const URL_BASE = `${API_QUERYLY}/json.aspx?queryly_key=${API_KEY_QUERYLY}&extendeddatafields=category,creator,subtype,counter_time,guid,creator,imageresizer,promo_image,counter_time,section,subtype,video_jw`;
const TRACKING_URL_BASE = `https://data.queryly.com/track.aspx?queryly_key=${API_KEY_QUERYLY}`;

const trackKeywordSearch = keyword => {
    if (!keyword || keyword.trim() === '') return;

    try {
        const trackingUrl = `${TRACKING_URL_BASE}&query=${encodeURIComponent(keyword)}&suggest=${encodeURIComponent(keyword)}&target=`;

        fetch(trackingUrl, { keepalive: true, mode: 'no-cors' }).catch(
            error => {
                console.error('Error queryly: tracking keyword search:', error);
            }
        );
    } catch (error) {
        console.error('Error queryly: constructing tracking URL:', error);
    }
};

function useFetchSearchResults({
    queryUrl,
    filters,
    page,
    sort = 'relevance',
    withFilterBox = true
}) {
    const [data, setData] = useState({ loading: true, articlesGrid: [] });

    useEffect(() => {
        const fetchSearchResults = async (
            query,
            appliedFilters,
            numberPage,
            sortParam
        ) => {
            try {
                if (numberPage === 0) {
                    trackKeywordSearch(query);
                }

                const response = await fetch(
                    `${URL_BASE}&query=${query}&sort=${sortParam}&batchsize=24&showfaceted=${withFilterBox}${appliedFilters}&endindex=${numberPage}`
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

        fetchSearchResults(queryUrl, filters, page, sort);
    }, [queryUrl, filters, page, sort]);

    return { data, loading: data.loading };
}

export default useFetchSearchResults;
