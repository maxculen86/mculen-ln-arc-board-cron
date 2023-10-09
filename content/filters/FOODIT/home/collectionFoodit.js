import articleReceta from './articleFoodit';

export default `
{
    _id
    type
    subtype
    content_elements 
        ${articleReceta}    
    
    display_date,
    created_date,
    first_publish_date,
    last_updated_date,
    publish_date,
    website_url
}`;
