import fieldsToArticles from '../config/configFieldsArticlesByTypeChain.json';

export const getFieldsInArticleByTypeChain2 = typeChain => {
    const keyTypeChain = typeChain || 'default';
    const boxFieldsArticlesByTypeChain = {
        hashtag:
            'taxonomy,distributor.name,related_content.basic,_id,last_updated_date,headlines,workflow,description,label,promo_items,canonical_website,subtype,first_publish_date,publish_date,website,website_url,taxonomy.primary_section',
        default:
            'taxonomy,distributor.name,related_content.basic,_id,last_updated_date,headlines,workflow,subheadlines,description,label,promo_items,canonical_website,credits,subtype,first_publish_date,publish_date,website,website_url,taxonomy.primary_section'
    };

    return boxFieldsArticlesByTypeChain[keyTypeChain];
};

export const getFieldsArticlesByTypeChain = typeChain => {
    const keyTypeChain = typeChain || 'default';
    return fieldsToArticles[keyTypeChain];
};
