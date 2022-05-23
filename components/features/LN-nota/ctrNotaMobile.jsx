import React, { useEffect, useState } from 'react';
import { useContent as getContent } from 'fusion:content';
import { useAppContext } from 'fusion:context';
import useViewportSize from '../../private/common/hooks/useViewportSize';
import { isSubscribed } from '../../private/LN/common/utils/contextHelper';
import getScrollPercent from '../../private/LN/common/utils/getScrollPercent';
import get from '../../private/common/utils/get';

const CTRNota = () => {
    const sectionId = get(
        useAppContext(),
        'globalContent.taxonomy.primary_section.name',
        {}
    );
    const globalContent = get(useAppContext(), 'globalContent', {});
    const { _id } = globalContent;

    const [trigger, setTrigger] = useState(false);
    const device = useViewportSize();
    const isSub = isSubscribed();

    const data =
        getContent({
            source: 'rankingArticlesSource',
            query: {
                sectionId: sectionId.toLowerCase(),
                imageConfig: 'boxArticles',
                website: 'la-nacion-ar'
            }
        }) || [];

    const { articles = [] } = data;
    const articleToShow =
        articles.filter(art => {
            return art._id !== _id;
        })[0] || {};

    useEffect(() => {
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

    const showComponent = !isSub && device === 'mobile' && articleToShow !== {};
    return showComponent && trigger && <>{articleToShow.headlines.basic}</>;
};

CTRNota.label = 'LN-CTR-nota';

export default CTRNota;
