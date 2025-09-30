import React from 'react';
import { useAppContext } from 'fusion:context';
import { getTypeOfDevicev2 } from '@ln/utils';
import {
    cocinaAMedidaMock,
    getMockBySubcategory
} from '../../../features/foodit-global/common/subcategorias/helpers';
import {
    applyPageBasedPriority,
    getCriticalImagesForPage,
    trackSubcategoryCard
} from '../_helpers';
import { useImagePreload } from '../hooks/useImagePreload';
import { CategoryCustom } from './sections/CategoryCustom';
import { CategoryDefault } from './sections/CategoryDefault';
import isSSR from '../../../private/LN/common/utils/isSSR';

export function CardCategory() {
    const { deployment, requestUri, contextPath } = useAppContext();

    const assetsPath = file =>
        deployment(
            `${contextPath}/resources/foodit/assets/images/subcategories/${file}`
        );

    const getMockDataForPreload = () => {
        if (requestUri?.includes('cocina-a-tu-medida')) {
            return cocinaAMedidaMock;
        }
        return getMockBySubcategory(requestUri);
    };

    const mockData = getMockDataForPreload();

    const criticalImages = getCriticalImagesForPage(
        requestUri,
        mockData,
        assetsPath
    );

    const device = !isSSR()
        ? getTypeOfDevicev2({
              breakpoints: {
                  mobile: 768
              }
          })
        : 'desktop';

    const isMobile = !isSSR() && device === 'mobile';

    useImagePreload(criticalImages, isMobile);

    if (requestUri?.includes('cocina-a-tu-medida')) {
        return (
            <CategoryCustom
                applyPageBasedPriority={applyPageBasedPriority}
                trackSubcategoryCard={trackSubcategoryCard}
                assetsPath={assetsPath}
                requestUri={requestUri}
            />
        );
    }

    const currentMock = getMockBySubcategory(requestUri);

    if (currentMock) {
        return (
            <CategoryDefault
                currentMock={currentMock}
                applyPageBasedPriority={applyPageBasedPriority}
                trackSubcategoryCard={trackSubcategoryCard}
                assetsPath={assetsPath}
                requestUri={requestUri}
            />
        );
    }

    return null;
}
