import { useContent } from 'fusion:content';

const useGetLogoImage = (id, isHome) => {
    return useContent({
        source: (id && 'imageSource') || null,
        query: {
            id
        },
        filter: `
        {
            caption
            width
            height
            url
        }
    `,
        staticMode: isHome
    });
};

export default useGetLogoImage;
