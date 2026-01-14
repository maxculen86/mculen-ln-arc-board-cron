/* eslint-disable react/no-danger */
import React from 'react';
import get from '../../private/common/utils/get';
import { criticalCssPathsBySite } from './helpers';
import isAllowedSection from '../../private/LN/common/utils/isAllowedSection';
import config from '../../../properties/sites/la-nacion-ar';

const {
    layoutsName: {
        Acumulado,
        Deportes,
        HomeLN10,
        LiveBlog,
        FotoAl100,
        Cards,
        NotaOpinion
    }
} = config;

export function GetCriticalCss({ arcSite, layout, Resource, globalContent }) {
    if (!Resource || typeof Resource !== 'function') {
        return null;
    }

    const siteConfig = criticalCssPathsBySite[arcSite] || {};
    const stylePath = get(siteConfig, `.${layout}`, siteConfig.default || '');

    const listOfAllowedSection = [
        { pageLayout: Acumulado },
        { pageLayout: Deportes },
        { pageLayout: HomeLN10 },
        { pageLayout: LiveBlog },
        { pageLayout: FotoAl100 },
        { pageLayout: Cards },
        { pageLayout: NotaOpinion }
    ];
    const shouldLoadTailwidcss = isAllowedSection({
        globalContent,
        listOfAllowedSection,
        layout
    });

    return (
        <>
            <Resource path={stylePath} encoding="utf8">
                {({ data }) =>
                    data ? (
                        <style
                            id="critical-css"
                            dangerouslySetInnerHTML={{
                                __html: data
                            }}
                        />
                    ) : null
                }
            </Resource>
            {shouldLoadTailwidcss && (
                <Resource
                    path="resources/dist/css/ln/tailwind/global.css"
                    encoding="utf8"
                >
                    {({ data }) =>
                        data ? (
                            <style
                                id="critical-css-tailwind"
                                dangerouslySetInnerHTML={{
                                    __html: data
                                }}
                            />
                        ) : null
                    }
                </Resource>
            )}
        </>
    );
}
