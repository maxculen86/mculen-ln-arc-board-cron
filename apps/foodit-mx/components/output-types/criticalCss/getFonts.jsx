import React from 'react';
import get from '../../private/common/utils/get';
import { fontsBySite } from './helpers';

export function GetFonts({ contextPath, deployment, arcSite }) {
    const fonts = get(fontsBySite(contextPath, deployment), `.${arcSite}`, '');
    if (!fonts) return <></>;
    return (
        <style
            id="critical-fonts"
            dangerouslySetInnerHTML={{
                __html: fonts
            }}
        />
    );
}
