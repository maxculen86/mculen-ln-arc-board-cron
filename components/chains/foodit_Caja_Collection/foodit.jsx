/* eslint-disable react/prop-types */
import React, {
    useState,
    useEffect,
    useMemo,
    useCallback,
    useRef
} from 'react';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';
import PropTypes from 'fusion:prop-types';
import classNames from 'classnames';
import { getTypeOfDevicev2 } from '@ln/utils';
import {
    getIdCollection,
    validateChainFoodit,
    isElementInPosition
} from './common/_helper';
import WarningMessage from '../../private/common/warningMessage/warningMessage';
import { RenderCollection } from '../foodit-global/common/RenderCollection/foodit';
import { transformArticleFoodit } from '../../features/foodit-global/common/utils/notaFooditHelper';
import fooditRules from '../../features/foodit-global/common/utils/fooditRules';
import { useGetArticleInCollectionFoodit } from '../foodit-global/common/hooks/useGetArticleInCollectionFoodit';
import setChainFooditCustomFields from '../foodit-global/common/utils/setChainCustomFieldsFoodit';
import get from '../../private/common/utils/get';
import { LazyLoad } from '../../features/foodit-global/common/LazyLoad/foodit';
import { getCarouselId } from './_helper';
import { LAYOUTS } from '../foodit-global/common/utils/helper-WebApi';
import { getShortestImage } from '../../private/LN/common/utils/mediaHelper';
import isSSR from '../../private/LN/common/utils/isSSR';

function CajaCollection(props) {
    const { CAROUSEL, CAROUSEL_4 } = LAYOUTS;
    const [inViewport, setInViewport] = useState(false);
    const { isAdmin, customFields, id: chainId, tree } = props;
    const carouselId = getCarouselId(chainId);
    const preloadedRef = useRef(false);
    const currentPreloadUrl = useRef(null);
    const {
        idCollection,
        initialPosition,
        hideCaja,
        hideTitle,
        link,
        title = '',
        layout = '',
        carouselMobile
    } = customFields;
    const rules = fooditRules(layout) || {};
    const { minArticles, maxArticles, size, isStatic } = rules;

    const isFirstCarousel = useMemo(
        () =>
            [CAROUSEL, CAROUSEL_4].includes(layout) &&
            isElementInPosition({
                positionElement: 0,
                positionBlock: 1,
                id: chainId,
                tree
            }),
        [CAROUSEL, CAROUSEL_4, layout, chainId, tree]
    );

    const articles = useGetArticleInCollectionFoodit({
        idCollection: getIdCollection({
            isStatic,
            inViewport,
            idCollection,
            isAdmin,
            isWithOutLazyLoad: isFirstCarousel
        }),
        size: maxArticles,
        initialPosition: Number(initialPosition) - 1,
        staticMode: isStatic
    });

    const addPreloadToHead = useCallback(
        imageUrl => {
            if (isSSR() || !imageUrl) return false;
            const existingPreload = document.querySelector(
                `link[href="${imageUrl}"][rel="preload"]`
            );
            if (existingPreload) return false;
            try {
                const linkTag = document.createElement('link');
                linkTag.rel = 'preload';
                linkTag.as = 'image';
                linkTag.fetchPriority = 'high';
                linkTag.href = imageUrl;
                linkTag.dataset.carouselPreload = chainId;
                document.head.appendChild(linkTag);
                return true;
            } catch (addPreloadToHeadError) {
                console.warn('Failed to add preload:', addPreloadToHeadError);
                return false;
            }
        },
        [chainId]
    );

    const device = !isSSR()
        ? getTypeOfDevicev2({
              breakpoints: {
                  mobile: 768
              }
          })
        : 'desktop';
    const isMobile = device === 'mobile';

    const preloadConditions = useMemo(
        () => ({
            isFirstCarousel,
            shouldPreload:
                isFirstCarousel &&
                carouselMobile &&
                !isAdmin &&
                isMobile &&
                articles.length > 0
        }),
        [isFirstCarousel, carouselMobile, isAdmin, isMobile, articles.length]
    );

    const preloadImageData = useMemo(() => {
        if (!preloadConditions.shouldPreload) return null;
        const firstArticle = articles[0];
        if (!firstArticle) return null;
        try {
            const { promo_items: { basic = {} } = {} } = firstArticle;
            const { resized_urls: resizedUrls, url } = basic;
            const { resizedUrl = '' } = getShortestImage(resizedUrls) || {};
            const imageUrl = resizedUrl || url;
            return imageUrl
                ? { url: imageUrl, articleId: firstArticle._id }
                : null;
        } catch (preloadImageDataError) {
            console.error(
                'Error extracting preload image data:',
                preloadImageDataError
            );
            return null;
        }
    }, [preloadConditions.shouldPreload, articles]);

    useEffect(() => {
        if (
            preloadImageData &&
            !preloadedRef.current &&
            currentPreloadUrl.current !== preloadImageData.url
        ) {
            const success = addPreloadToHead(preloadImageData.url);
            if (success) {
                preloadedRef.current = true;
                currentPreloadUrl.current = preloadImageData.url;
            }
        }
        return () => {
            if (!isSSR()) {
                const specificPreload = document.querySelector(
                    `link[data-carousel-preload="${chainId}"]`
                );
                if (specificPreload) {
                    specificPreload.remove();
                }
            }
            preloadedRef.current = false;
            currentPreloadUrl.current = null;
        };
    }, [preloadImageData, addPreloadToHead, chainId]);

    const error = validateChainFoodit({
        minArticles,
        idCollection,
        layout,
        articles
    });

    if (isAdmin && error) {
        return <WarningMessage type={error.type} message={error.message} />;
    }

    const articlesWithSize = articles.map(article => ({
        ...transformArticleFoodit(article),
        size
    }));

    const articlesTransformed = articlesWithSize.filter(
        article => article.href
    );

    const staticContentClassName = classNames(
        'hidden',
        get(rules, 'classStatic', '')
    );

    const carouselIndex = isFirstCarousel ? 0 : 1;

    const Component = (
        <RenderCollection
            rules={rules}
            title={title}
            link={link}
            hideCaja={hideCaja}
            hideTitle={hideTitle}
            articles={articlesTransformed}
            collectionId={idCollection}
            layout={layout}
            error={error}
            carouselMobile={carouselMobile}
            carouselIndex={carouselIndex}
        />
    );

    if (!isStatic && isFirstCarousel) {
        return Component;
    }

    return !isStatic && !isAdmin ? (
        <LazyLoad
            id={carouselId}
            hide={hideCaja}
            onViewport={() => setInViewport(true)}
            showComponent={articlesTransformed.length > 0}
            style={{
                scrollMarginTop: '80px',
                scrollBehavior: 'smooth'
            }}
        >
            {Component}
        </LazyLoad>
    ) : (
        <Static id={chainId}>
            <div className={staticContentClassName}>{Component}</div>
        </Static>
    );
}

CajaCollection.label = 'foodit Caja Collection';
CajaCollection.propTypes = {
    id: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    customFields: PropTypes.shape({
        ...setChainFooditCustomFields('cajaCollection')
    }).isRequired,
    globalContent: PropTypes.shape({
        name: PropTypes.string
    }).isRequired,
    tree: PropTypes.shape({}).isRequired
};

export default Consumer(CajaCollection);
