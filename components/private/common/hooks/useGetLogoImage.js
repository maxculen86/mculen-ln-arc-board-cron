import { useContent } from 'fusion:content';

const useGetLogoImage = (id, isHome, isMultimedia) => {
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
        staticMode: isHome && !isMultimedia
    });
};

export default useGetLogoImage;
