import React from 'react';
import { getMediaItem } from '../../../helpers/mediaHelper';

function Media({ data }) {
    const { mediaData, caption, attribution } = data;
    const mediaItem = getMediaItem({ mediaData });

    if (!mediaItem) return null;

    return (
        <div className="w-full md:grid md:justify-items-center md:grid-cols-12 md:gap-x-24 lg:grid-cols-16 lg:gap-x-31">
            <figure className="w-full max-w-750 flex flex-col md:col-span-12 lg:col-start-4 lg:col-span-10">
                {mediaItem}
                {/* epigrafe que se usa en el body */}
                {(caption || attribution) && (
                    <figcaption className="py-8">
                        {caption && (
                            <span className="font-normal text-base-default text-16 text-center leading-[110%] tracking-[-0.3px]">
                                {caption}
                            </span>
                        )}
                        {attribution && (
                            <span className="pl-8 font-normal text-base-light text-16 text-center leading-[110%] tracking-[-0.3px]">
                                {attribution}
                            </span>
                        )}
                    </figcaption>
                )}
            </figure>
        </div>
    );
}

export default Media;
