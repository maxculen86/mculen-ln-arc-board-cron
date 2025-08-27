import React, { useEffect, useState } from 'react';
import { useAppContext } from 'fusion:context';
import useViewportSize from '../../../private/common/hooks/useViewportSize';
import { StickyMobile } from '../../LN-10-global/common/stickyMobile/default';
import { crtViewTracker } from '../../../private/common/utils/noteTracker/ctrTracker';
import {
    isSubscribed,
    SUBSCRIBED_HELPER
} from '../../../private/common/auth/helper/loginHelper';
import { getSectionId } from '../../LN-10/ranking/common/_helper-WebApi';
import { useRankingArticles } from '../../LN-10/ranking/_helper';
import { pickVisible3 } from './_utils/pickVisible3';

export function CtrNotaV2() {
    const STICKY_MOBILE_SCROLL_TRIGGER = 1800;
    const { website = '', arcSite = '', globalContent = {} } = useAppContext();
    const { _id } = globalContent;
    const sectionId = getSectionId(globalContent) || '';

    const [trigger, setTrigger] = useState(false);
    const [tracked, setTracker] = useState(true);
    const [excludedItems, setExcludedItems] = useState([]);
    const [source, setSource] = useState(null);

    useEffect(() => {
        if (localStorage) {
            const seenNotes =
                JSON.parse(localStorage.getItem('excludeItems')) || [];

            setExcludedItems(seenNotes.map(note => new URL(note).pathname));
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

    const isMobile = useViewportSize() === 'mobile';
    const showCtr = !isSubscribed(SUBSCRIBED_HELPER.LN) && isMobile;

    const { articles = [] } =
        useRankingArticles(
            sectionId,
            website || arcSite,
            '',
            'ctrMobile',
            source
        ) || {};

    const hasNoArticles = articles?.length === 0;

    if (!showCtr || hasNoArticles) return null;

    const refinedTopThreeArticles = pickVisible3(_id, articles, excludedItems);
    const hasContent = refinedTopThreeArticles?.length > 0;
    const showComponent = showCtr && trigger && hasContent;

    if (!showComponent) return null;

    return (
        <>
            <StickyMobile articlesToShow={refinedTopThreeArticles} />
            {crtViewTracker(tracked, setTracker)}
        </>
    );
}

CtrNotaV2.label = 'LN-CTR-nota-V2';

export default CtrNotaV2;
