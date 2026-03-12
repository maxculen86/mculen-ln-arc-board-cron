import React from 'react';

export function Favicon({ contextPath, deployment }) {
    if (!contextPath || !deployment) return null;
    const assetsPath = asset =>
        deployment(`${contextPath}/resources/foodit/assets/favicon/${asset}`);

    return (
        <>
            <link
                rel="shortcut icon"
                type="image/x-icon"
                href={assetsPath('favicon.ico')}
            />
            <link
                rel="apple-touch-icon"
                sizes="180x180"
                href={assetsPath('apple-touch-icon.png')}
            />
            <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href={assetsPath('favicon-32x32.png')}
            />
            <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href={assetsPath('favicon-16x16.png')}
            />
            <link
                rel="mask-icon"
                href={assetsPath('safari-pinned-tab.svg')}
                color="#5bbad5"
            />
            <meta name="msapplication-TileColor" content="#da532c" />
            <meta name="theme-color" content="#ffffff" />
        </>
    );
}
