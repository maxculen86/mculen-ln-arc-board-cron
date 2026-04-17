export default `
    {
        mediaid,
        poster,
        duration,
        sources {
            file,
            type,
            bitrate,
            filesize,
            framerate,
            height,
            label,
            type,
            width
        },
        title,
        tracks {
            file,
            kind
        },
        resizedImages {
            promo_items {
                basic {
                    resized_urls {
                        resizedUrl,
                        option {
                            width,
                            height,
                            proportion,
                            media
                        }
                    }
                }
        }
    }
`;
