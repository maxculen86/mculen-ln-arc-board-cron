import React from 'react';
import get from '../../private/common/utils/get';
import { criticalCssPathsBySite } from './helpers';

export const GetCriticalCss = props => {
    const { arcSite, layout, Resource } = props;

    const stylePath = get(
        criticalCssPathsBySite[arcSite],
        `.${layout}`,
        criticalCssPathsBySite[arcSite].default || ''
    );

    return (
        <>
            {stylePath ? (
                <Resource path={stylePath}>
                    {({ data }) => {
                        return (
                            data && (
                                <style
                                    id="critical-css"
                                    dangerouslySetInnerHTML={{
                                        __html: data.replace(
                                            '@charset "UTF-8";',
                                            ''
                                        )
                                    }}
                                />
                            )
                        );
                    }}
                </Resource>
            ) : (
                <></>
            )}
        </>
    );
};
