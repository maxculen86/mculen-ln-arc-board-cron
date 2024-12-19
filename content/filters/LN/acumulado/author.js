import { imageResizedUrl } from '../common';

export default `
{
    name
    node_type
    canonical_url
    author_type
    byline
    firstName
    lastName
    middleName
    bio_page
    bio
    image {
        url
        type
        resized_urls {
            ${imageResizedUrl}
        }
    }
    longBio
    slug
    role
    email
    expertise
    location
    books {
        title
        publisher
        url
    }
    podcasts {
        name
        url
        download_url
    }
    education {
        name
    }
    awards {
        name
    }
    personal_website
    languages
    affiliations
    twitter
    facebook
    youtube
    instagram
    linkedin
    rss
    medium
    reddit
    pinterest
    soundcloud
    snapchat
    whatsapp
    tumblr
}`;
