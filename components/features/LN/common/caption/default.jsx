import React from 'react';

export function Caption({ caption, credit }) {
    if (!(caption || credit)) return null;

    return (
        <figcaption className="py-8 space-x-8">
            {caption && (
                <span className="font-normal text-base-default text-16 text-center leading-[140%] tracking-[-0.3px]">
                    {caption}
                </span>
            )}
            {credit && (
                <span className="font-normal text-base-light text-16 text-center leading-[140%] tracking-[-0.3px]">
                    {credit}
                </span>
            )}
        </figcaption>
    );
}
