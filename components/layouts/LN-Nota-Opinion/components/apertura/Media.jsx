import React from 'react';
import { getMediaItem } from '../../../helpers/mediaHelper';

function Media({ data }) {
    const { mediaData, caption, attribution } = data;
    const mediaItem = getMediaItem({ mediaData });

    if (!mediaItem) return null;

    return (
        <div className="w-full md:grid md:justify-items-center md:grid-cols-12 md:gap-x-24 lg:grid-cols-16 lg:gap-x-31">
            <figure className="w-full max-w-750 flex flex-col md:col-span-12 lg:col-start-4 lg:col-span-10">
                {/* // TODO para front: realizar ajustes de estilos segun diseño */}
                <div className="border-1 border-muted aspect-3/2 -mx-16 md:mx-0 w-[calc(100%+2rem)] md:w-full max-md:max-w-none">
                    {mediaItem}
                </div>
                <figcaption className="py-8">
                    <span className="font-normal text-base-default text-16 text-center leading-[110%] tracking-[-0.3px]">
                        {caption}
                    </span>
                    <span className="pl-8 font-normal text-base-light text-16 text-center leading-[110%] tracking-[-0.3px]">
                        {attribution}
                    </span>
                </figcaption>
            </figure>
        </div>
    );
}

export default Media;
