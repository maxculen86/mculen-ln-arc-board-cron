import React from 'react';
import Link from '../../../ui/ln/link/default';

function SubNavHeader({
    hasLogo = false,
    titleText = '',
    url = '',
    imageProps = {}
}) {
    if (!hasLogo && !titleText) return null;

    if (hasLogo) {
        return (
            <h1>
                <span className="hidden">{titleText}</span>
                <img
                    className="w-auto max-h-46 md:max-h-70 lg:max-h-90"
                    style={
                        imageProps?.height
                            ? { height: `${imageProps.height}px` }
                            : undefined
                    }
                    src={imageProps.src}
                    alt={titleText}
                    width={imageProps.width}
                    height={imageProps.height}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                />
            </h1>
        );
    }

    return (
        <h1>
            <Link
                href={url}
                title={`Ir a ${titleText}`}
                size="custom"
                color="black"
                className="font-primary text-heading-lg font-w-extrabold"
            >
                {titleText}
            </Link>
        </h1>
    );
}

export default SubNavHeader;
