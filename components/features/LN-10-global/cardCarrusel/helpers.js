import { cx } from '@ln/cva';
import { cva } from '@ln/ds-cva';

export function secondsToMinutes(seconds) {
    if (typeof seconds !== 'number' || seconds < 0) return '';

    const minutes = Math.floor(seconds / 60);
    const dif = Math.floor(seconds % 60);

    const formatMinutes = String(minutes).padStart(2, '0');
    const formatSeconds = String(dif).padStart(2, '0');

    return `${formatMinutes}:${formatSeconds}`;
}

export const getClassNamesMedia = isPlaying => {
    const classNamePoster = cx(
        'w-full h-full absolute object-cover',
        !isPlaying ? 'z-2' : 'z-1'
    );
    const classNameVideo = cx(
        'w-full h-full absolute object-cover duration-500 ease-in transition-opacity',
        isPlaying ? 'opacity-100 z-2' : 'opacity-0 z-1'
    );

    return { classNamePoster, classNameVideo };
};

export const getDesktopPreviewVideo = previewVideo =>
    previewVideo?.replace(/-\d+\.mp4$/, '-640.mp4') || previewVideo;

export const getDesktopPosterImage = posterImage =>
    posterImage?.replace(/([?&]width=)\d+/, '$1640') || posterImage;

export const cardVideoClassNames = cva(['card-carousel', 'cursor-pointer'], {
    variants: {
        withTitle: {
            true: 'bg-gradient-accent',
            false: 'bg-gradient-accent-sm'
        },
        variant: {
            vertical: ['card-vertical-carousel'],
            horizontal: ['card-horizontal-carousel']
        }
    }
});
