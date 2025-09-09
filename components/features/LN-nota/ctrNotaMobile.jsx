import React, { useEffect, useState } from 'react';
import { useAppContext } from 'fusion:context';
import useViewportSize from '../../private/common/hooks/useViewportSize';
import StickyMobile from '../../private/LN/nota/StickyMobile';
import { crtViewTracker } from '../../private/common/utils/noteTracker/ctrTracker';
import {
    isSubscribed,
    SUBSCRIBED_HELPER
} from '../../private/common/auth/helper/loginHelper';
import { getSectionId } from '../LN-10/ranking/common/_helper-WebApi';
import { useRankingArticles } from '../LN-10/ranking/_helper';

export const ctrRecommendNote = (
    articleList,
    articlesSeen,
    actualArticleId
) => {
    const notCurrent = articleList?.filter(art => art._id !== actualArticleId);

    const notSeenBefore = notCurrent?.filter(
        art => !articlesSeen.includes(art.canonical_url)
    );

    return notSeenBefore?.length > 0
        ? notSeenBefore[0]
        : notCurrent[Math.round(Math.random() * notCurrent.length)] || {}; // NOSONAR
};

function CTRNota() {
    const { website = '', arcSite = '', globalContent = {} } = useAppContext();
    const { _id } = globalContent;
    const sectionId = getSectionId(globalContent) || '';

    const [trigger, setTrigger] = useState(false);
    const [tracked, setTracker] = useState(true);
    const [excludeItems, setExcludeItems] = useState([]);
    const [source, setSource] = useState(null);
    const STICKY_MOBILE_SCROLL_TRIGGER = 1800;

    useEffect(() => {
        if (localStorage) {
            const seenNotes =
                JSON.parse(localStorage.getItem('excludeItems')) || [];

            setExcludeItems(seenNotes.map(note => new URL(note).pathname));
        }
        const handleScroll = () => {
            const scrolledInAxisY = window.scrollY;
            if (!source && scrolledInAxisY >= 1000)
                setSource('rankingArticlesSource');

            if (!trigger && scrolledInAxisY >= STICKY_MOBILE_SCROLL_TRIGGER) {
                setTrigger(true);
                window.removeEventListener('scroll', handleScroll);
            }
        };
        if (!trigger) window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [trigger, source]);

    const device = useViewportSize();
    const showCtr = !isSubscribed(SUBSCRIBED_HELPER.LN) && device === 'mobile';

    const { articles = [] } =
        useRankingArticles(
            sectionId,
            website || arcSite,
            '',
            'ctrMobile',
            source
        ) || {};

    if (!showCtr || articles?.length === 0) return null;

    const articleToShow = ctrRecommendNote(articles, excludeItems, _id);
    const showComponent =
        showCtr && trigger && Object.keys(articleToShow)?.length > 0;

    if (!showComponent) return null;

    return (
        <>
            <StickyMobile articleToShow={articleToShow} />
            {crtViewTracker(tracked, setTracker)}
        </>
    );
}

CTRNota.label = 'LN-CTR-nota';

export default CTRNota;
