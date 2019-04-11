import { addResizedUrls } from '@arc-core-components/content-source_content-api-v4';
import { RESIZER_SECRET, RESIZER_URL } from 'fusion:environment';

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

  const transform = (data) => {
    return addResizedUrls(data, { resizerSecret: RESIZER_SECRET, resizerUrl: RESIZER_URL, presets: {
      smallDesktop: { height: 230 },
      mediumDesktop: { height: 320 },
      largeDesktop: { height: 460 },
      extraLargeDesktop: { height: 620 },
      extraExtraLargeDesktop: { height: 866 },
      smallMobile: { height: 210 },
      mediumMobile: { height: 425 },
      largeMobile: { height: 425 },
      extraLargeMobile: { height: 425 },
      extraExtraLargeMobile: {height: 425 }
    }});
  };
  
  
  export default {
    resolve,
    schemaName: 'article-schema',
    params: {
        url: 'text',
        id: 'text'
    },
    transform
  }   