export default `
{
    author_type,
    byline,
    bio_page,
    image { url },
    longBio,
    twitter,
    slug,
    role,
    email,
    firstName,
    lastName,
    books {
        title,
        publisher,
        url
    },
    podcast {
        name,
        url
    },
    education {
        name
    },
    awards {
        name
    },
    personal_website,
    facebook,
    languages,
    affiliations
}`;
