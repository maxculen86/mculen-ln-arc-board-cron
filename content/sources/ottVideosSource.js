const resolve = (key) => {
    const { ids } = key
    const website = 'la-nacion-ar'
    if(!ids)
        throw new Error('Debe definir website y query para realizar la consulta')
        
    return `/content/v4/ids?website=${website}&ids=${ids.join(',')}`;
  } 
   export default {
    resolve,
    schemaName: 'video-schema',
    params: {
        ids: 'text'
    } 
  }  