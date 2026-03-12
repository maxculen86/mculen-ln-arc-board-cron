import React from 'react';

export default function SetFixedHeight({
    elementId,
    heightMobile = 0,
    heightTablet = 0,
    heightDesktop = 0
}) {
    return (
        <style>
            {`#${elementId}{height:${parseInt(
                heightMobile,
                10
            )}px}@media(min-width:768px){#${elementId}{height:${
                // eslint-disable-next-line prettier/prettier
                parseInt(heightTablet, 10)
            }px}}@media(min-width:1024px){#${elementId}{height:${
                // eslint-disable-next-line prettier/prettier
                parseInt(heightDesktop, 10)
            }px}}`}
        </style>
    );
}
