import React, { useEffect, useState } from 'react';
import { useContent as getContent } from 'fusion:content';
import { useAppContext } from 'fusion:context';
import useViewportSize from '../../private/common/hooks/useViewportSize';
import { isSubscribed } from '../../private/LN/common/utils/contextHelper';
import get from '../../private/common/utils/get';

const CTRNota = () => {
    const globalContent = get(useAppContext(), 'globalContent', {});
    const { _id: actualArticleId } = globalContent;

    const [trigger, setTrigger] = useState(false);
    const device = useViewportSize();
    const isSub = isSubscribed();

    const data =
        getContent({
            source: 'rankingArticlesSource',
            query: {
                sectionId: 'inverse-home',
                imageConfig: 'boxArticles',
                website: 'la-nacion-ar'
            }
        }) || [];

    const { articles = [] } = data;
    const articleToShow =
        articles.filter(art => {
            return art._id !== actualArticleId;
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
