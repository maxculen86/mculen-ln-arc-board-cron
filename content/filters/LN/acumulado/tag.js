export default `
{
    Payload {
        items {
            slug
            name
            description
        }
    }
    name
    node_type
    canonical_url
    acumuladoGeneral {
        anexosuperior
        anexoinferior
        collectionForTag
    }
    isWiki
    imageId
    wikiSourceData {
        creation_date
        description
        image {
            alt
            height
            resizedUrls {
                option {
                    height
                    proportion
                    width
                }
                resizedUrl
            }
            url
        }
        related_tags {
            text
            slug
        }
        schemas_info {
            additional_name
            birth_date
            birth_place
            family_name
            given_name
            job_title
            address
            founding_date
            founding_location
            legal_name
            location
        }
        social_networks {
            type
            name
            url
        }
        type
        _id
    }
}`;
