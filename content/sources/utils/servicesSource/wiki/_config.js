const wikiTypes = {
    person: {
        creation_date: 'ISO DATE_TIME',
        type: 1,
        description: 'text',
        addtional_name: 'text',
        birth_date: 'ISO DATE_TIME',
        family_name: 'text',
        given_name: 'text',
        image: 'text',
        job_title: 'text',
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
        type: 1,
        address: 'text',
        description: 'text',
        founding_date: 'ISO DATE_TIME',
        founding_location: 'text',
        legal_name: 'text',
        location: 'text',
        logo_url: 'text',
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
