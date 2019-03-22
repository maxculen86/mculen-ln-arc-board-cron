const resolve = (key) => {
    const {  query } = key
    const website = 'la-nacion-ar'
    //sort=publish_date:desc&from=0&size=12
    if(!query)
        throw new Error('Debe definir website y query para realizar la consulta')
    return `/content/v4/search/published?website=${website}&q=type:video&${query}`;
  } 
   export default {
    resolve,
    schemaName: 'video-schema',
    params: {
        query: 'text'
    } 
  }  
 