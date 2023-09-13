export default `{
    type
    sources {
        file
        height
        filesize
    }
    poster
    promo_items {
        basic {
            url
            width
            height
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
    resizedUrl {
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
    _id
}`;
