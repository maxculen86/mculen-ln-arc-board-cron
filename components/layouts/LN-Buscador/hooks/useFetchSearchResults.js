import { API_QUERYLY, API_KEY_QUERYLY_LN } from 'fusion:environment';
import { useState, useEffect } from 'react';
import { transformListGroups } from '../_helpers';

const URL_BASE = `${API_QUERYLY}/json.aspx?queryly_key=${API_KEY_QUERYLY_LN}&extendeddatafields=category,creator,subtype,counter_time,guid,imageresizer,promo_image,section`;
const TRACKING_URL_BASE = `https://data.queryly.com/track.aspx?queryly_key=${API_KEY_QUERYLY_LN}`;

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

export const trackResultClick = ({ query, target }) => {
    if (!query || !target) return;

    try {
        const trackingUrl = `${TRACKING_URL_BASE}&query=${encodeURIComponent(query)}&suggest=${encodeURIComponent(query)}&target=${encodeURIComponent(target)}`;

        fetch(trackingUrl, { keepalive: true, mode: 'no-cors' }).catch(
            error => {
                console.error('Error queryly: tracking result click:', error);
            }
        );
    } catch (error) {
        console.error(
            'Error queryly: constructing result tracking URL:',
            error
        );
    }
};

function useFetchSearchResults({
    queryUrl,
    filters,
    page,
    sort = 'relevance',
    dateRange = { startDate: '', endDate: '' }
}) {
    const [data, setData] = useState({ loading: true, articlesGrid: [] });

    useEffect(() => {
        const controller = new AbortController();
        const abortTimeout = setTimeout(() => controller.abort(), 8000);

        const fetchSearchResults = async (
            query,
            appliedFilters,
            numberPage,
            sortParam,
            dateParams
        ) => {
            try {
                if (numberPage === 0) {
                    trackKeywordSearch(query);
                }

                // Build date range parameters if provided
                // Queryly API expects: MM/DD/YYYY,MM/DD/YYYY format
                const formatDateForQueryly = dateStr => {
                    if (!dateStr) return '';
                    const [year, month, day] = dateStr.split('-');
                    return `${month}/${day}/${year}`;
                };

                let dateRangeParam = '';
                if (dateParams.startDate || dateParams.endDate) {
                    const formattedStart = formatDateForQueryly(
                        dateParams.startDate
                    );
                    const formattedEnd = formatDateForQueryly(
                        dateParams.endDate
                    );

                    if (formattedStart && formattedEnd) {
                        dateRangeParam = `&daterange=${formattedStart},${formattedEnd}`;
                    } else if (formattedStart) {
                        dateRangeParam = `&daterange=${formattedStart},`;
                    } else if (formattedEnd) {
                        dateRangeParam = `&daterange=,${formattedEnd}`;
                    }
                }

                const apiUrl = `${URL_BASE}&query=${query}&sort=${sortParam}&batchsize=24&showfaceted=true${appliedFilters}${dateRangeParam}&endindex=${numberPage}`;

                const response = await fetch(apiUrl, {
                    signal: controller.signal
                });

                const {
                    faceted,
                    items,
                    topics = [],
                    related = [],
                    metadata = {}
                } = (await response.json()) || {};

                const { total } = metadata;
                const result = {
                    listFilters: transformListGroups(faceted),
                    topics,
                    related,
                    total,
                    isFinishPagination: items.length < 24
                };

                setData(prev => ({
                    ...result,
                    articlesGrid:
                        numberPage > 0
                            ? [...prev.articlesGrid, ...items]
                            : items,
                    loading: false
                }));
            } catch (error) {
                if (error.name === 'AbortError') return;
                console.error('Error fetching LN search results:', error);
                setData({ loading: false, articlesGrid: [] });
            }
        };

        fetchSearchResults(queryUrl, filters, page, sort, dateRange);

        return () => {
            clearTimeout(abortTimeout);
            controller.abort();
        };
    }, [queryUrl, filters, page, sort, dateRange.startDate, dateRange.endDate]);

    return { data, loading: data.loading };
}

export default useFetchSearchResults;
