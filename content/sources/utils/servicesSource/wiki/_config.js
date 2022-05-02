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
                name: 'text',
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
        schemasInfo: {
            addtional_name: 'text',
            birth_date: 'ISO DATE_TIME',
            family_name: 'text',
            given_name: 'text',
            job_title: 'text'
        }
    },

    organization: {
        creation_date: 'ISO DATE_TIME',
        type: 1,
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
        schemasInfo: {
            address: 'text',
            founding_date: 'ISO DATE_TIME',
            founding_location: 'text',
            legal_name: 'text',
            location: 'text'
        }
    }
};

export default wikiTypes;
