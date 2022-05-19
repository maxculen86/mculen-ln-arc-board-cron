import React, { useEffect, useState } from 'react';
import { useContent as getContent } from 'fusion:content';
import { useAppContext } from 'fusion:context';
import useViewportSize from '../../private/common/hooks/useViewportSize';
import { isSubscribed } from '../../private/LN/common/utils/contextHelper';
import getScrollPercent from '../../private/LN/common/utils/getScrollPercent';
import get from '../../private/common/utils/get';

const CTRNota = () => {
    // const sectionId = get(
    //     useAppContext(),
    //     'globalContent.taxonomy.primary_section._id',
    //     {}
    // );
    const globalContent = get(useAppContext(), 'globalContent', {});
    const { _id } = globalContent;

    const [trigger, setTrigger] = useState(false);
    const device = useViewportSize();
    const isSub = isSubscribed();

    const data = getContent({
        source: 'rankingArticlesSource',
        query: {
            sectionId: 'deportes',
            imageConfig: 'boxArticles',
            website: 'la-nacion-ar'
        }
    });
    console.log(
        '🚀 ~ file: ctrNotaMobile.jsx ~ line 31 ~ CTRNota ~ data',
        data
    );
    const { articles } = data;
    const articleToShow = articles.filter(art => {
        return art._id !== _id;
    })[0];

    useEffect(() => {
        const handleScroll = () => {
            const scrollPercent = getScrollPercent();
            if (!trigger && scrollPercent >= 20) {
                setTrigger(true);
                window.removeEventListener('scroll', handleScroll);
            }
        };
        !trigger && window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [trigger]);

    const showComponent = !isSub && device === 'mobile';
    return showComponent && trigger && <>{articleToShow.headlines.basic}</>;
};

CTRNota.label = 'LN-CTR-nota';

export default CTRNota;
