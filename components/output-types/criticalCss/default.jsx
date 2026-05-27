/* eslint-disable react/no-danger */
import React from 'react';
import get from '../../private/common/utils/get';
import { criticalCssPathsBySite } from './helpers';

export function GetCriticalCss({ arcSite, layout, Resource }) {
    if (!Resource || typeof Resource !== 'function') {
        return null;
    }

    const siteConfig = criticalCssPathsBySite[arcSite] || {};
    const stylePath = get(siteConfig, `.${layout}`, siteConfig.default || '');

    return (
        <>
            {Boolean(stylePath) && (
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
            )}
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
        </>
    );
}
