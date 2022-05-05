const wikiTypes = {
    person: {
        creation_date: 'ISO DATE_TIME',
        type: 1,
        description: 'text',
        image: {
            url: 'text',
            width: 'text',
            height: 'text',
            alt: 'text'
        },
        social_networks: [
            {
                type: 'text',
                name: 'instagram',
                url: 'text'
            }
        ],
        related_tags: [
            {
                text: 'text',
                slug: 'text'
            },
            {
                text: 'text',
                slug: 'text'
            }
        ],
        schemas_info: {
            additional_name: 'text',
            birth_date: '2022-05-01T19:00:00',
            birth_place: 'text',
            family_name: 'text',
            given_name: 'text',
            job_title: 'text'
        }
    },

    organization: {
        creation_date: 'ISO DATE_TIME',
        type: 2,
        description: 'text',
        logo_url: 'text',
        image: {
            url: 'text',
            width: 'text',
            height: 'text',
            alt: 'text'
        },
        social_networks: [
            {
                type: 'text',
                name: 'text',
                url: 'text'
            }
        ],
        related_tags: [
            {
                text: 'text',
                slug: 'slug'
            },
            {
                text: 'text',
                slug: 'slug'
            }
        ],
        schemas_info: {
            address: 'text',
            founding_date: '2022-05-01T19:00:00',
            founding_location: 'text',
            legal_name: 'text',
            location: 'text'
        }
    }
};

export default wikiTypes;
