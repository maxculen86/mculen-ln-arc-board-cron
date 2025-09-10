/* eslint-disable react/prop-types */
/* eslint-disable react/no-danger */
import React from 'react';
import get from '../../private/common/utils/get';
import { criticalCssPathsBySite } from './helpers';
import isAllowedSection from '../../private/LN/common/utils/isAllowedSection';

export function GetCriticalCss({
    arcSite,
    layout,
    // layoutsName,
    Resource,
    globalContent
}) {
    if (!Resource || typeof Resource !== 'function') {
        return null;
    }

    const siteConfig = criticalCssPathsBySite[arcSite] || {};
    const stylePath = get(siteConfig, `.${layout}`, siteConfig.default || '');

    const listOfAllowedSection = [
        // { pageLayout: layoutsName.Noticia },
        // { pageLayout: layoutsName.HomeLN10 }
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
                    data && (
                        <style
                            id="critical-css"
                            dangerouslySetInnerHTML={{
                                __html: data
                            }}
                        />
                    )
                }
            </Resource>
            {shouldLoadTailwidcss && (
                <Resource
                    path="resources/dist/css/ln/tailwind/global.css"
                    encoding="utf8"
                >
                    {({ data }) =>
                        data && (
                            <style
                                id="critical-css-tailwind"
                                dangerouslySetInnerHTML={{
                                    __html: data
                                }}
                            />
                        )
                    }
                </Resource>
            )}
        </>
    );
}
