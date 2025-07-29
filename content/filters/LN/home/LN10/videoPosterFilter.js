export default `{
    type
    sources {
        file
        height
        filesize
    }
    poster
    resizedImages {
      promo_items {
        basic {
          url
          width
          height
          type
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
    }
    streams {
        url
        stream_type
        width
        height
        filesize
    }
  }`;
