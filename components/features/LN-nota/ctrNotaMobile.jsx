import React, { useEffect, useState } from 'react';
import { useContent as getContent } from 'fusion:content';
import { useAppContext } from 'fusion:context';
import useViewportSize from '../../private/common/hooks/useViewportSize';
import { isSubscribed } from '../../private/LN/common/utils/contextHelper';
import get from '../../private/common/utils/get';
import StickyMobile from '../../private/LN/nota/StickyMobile';

const ctrRecommendNote = (articleList, articlesSeen, actualArticleId) => {
    const notCurrent = articleList.filter(art => {
        return art._id !== actualArticleId;
    });

    const notSeenBefore = notCurrent.filter(art => {
        return !articlesSeen.includes(art.canonical_url);
    });

    return notSeenBefore.length > 0
        ? notSeenBefore[0]
        : notCurrent[Math.round(Math.random() * notCurrent.length)] || {}; // NOSONAR
};

const CTRNota = () => {
    const globalContent = get(useAppContext(), 'globalContent', {});
    const { _id } = globalContent;

    const [trigger, setTrigger] = useState(false);
    const [excludeItems, setExcludeItems] = useState([]);

    useEffect(() => {
        if (localStorage) {
            const seenNotes =
                JSON.parse(localStorage.getItem('excludeItems')) || [];

            setExcludeItems(seenNotes.map(note => new URL(note).pathname));
        }
        const handleScroll = () => {
            const scrolledInAxisY = window.scrollY;

            if (!trigger && scrolledInAxisY >= 2800) {
                setTrigger(true);
                window.removeEventListener('scroll', handleScroll);
            }
        };
        !trigger && window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [trigger]);

    const device = useViewportSize();
    const showCtr = !isSubscribed() && device === 'mobile';

    const { articles = [] } =
        getContent({
            source: showCtr ? 'rankingArticlesSource' : null,
            query: {
                sectionId: 'inverse-home',
                imageConfig: 'boxArticles',
                website: 'la-nacion-ar'
            }
        }) || {};

    if (!showCtr) return null;

    const articleToShow = ctrRecommendNote(articles, excludeItems, _id);

    const showComponent =
        showCtr && trigger && Object.keys(articleToShow).length > 0;
    return (
        showComponent && (
            <StickyMobile
                headerText="Te puede interesar"
                articleToShow={articleToShow}
            />
        )
    );
};

CTRNota.label = 'LN-CTR-nota';
CTRNota.lazy = true;

export default CTRNota;
