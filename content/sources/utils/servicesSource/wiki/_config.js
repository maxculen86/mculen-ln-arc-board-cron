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
        schemasInfo: {
            addtional_name: 'text',
            birth_date: 'ISO DATE_TIME',
            job_title: 'text'
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
        ]
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
        schemasInfo: {
            address: 'text',
            founding_date: 'ISO DATE_TIME'
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
        ]
    }
};

export default wikiTypes;
