const resolve = (key) => {
    const { url, id } = key
    console.log(id)
    const basePath = '/content/v4/stories/?website=la-nacion-ar';

    if (id)
        return `${basePath}&_id=${id}`;
    else if (url)
        return `${basePath}&website_url=${url}`;
    else throw new Error('Debe definir url o id para obtener la nota');
  }
  
  export default {
    resolve,
    schemaName: 'article-schema',
    params: {
        url: 'text',
        id: 'text'
    }  
  }   