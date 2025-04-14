export default `{
    type
    sources {
        file
        height
        filesize
    }
    title
    mediaid
    image
    images {
        src
        width
        type
    }
    poster
    promo_items {
        basic {
            url
            width
            height
            resized_urls {
                resizedUrl
                media
                option {
                    width
                    height
                    media
                    useFullSize
                    proportion
                    media_preload
                }
            }
        }
    }
    streams {
        url
        stream_type
        width
        height
        filesize
    }
    headlines {
        basic
    }
}`;
