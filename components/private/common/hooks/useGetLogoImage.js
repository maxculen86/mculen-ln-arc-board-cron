import { useContent } from 'fusion:content';

const useGetLogoImage = (id, isHome, isMultimedia) => {
    const image = useContent({
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

    return image;
};

export default useGetLogoImage;
