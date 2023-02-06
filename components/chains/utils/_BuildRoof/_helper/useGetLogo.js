import useGetLogoImage from '../../../../private/common/hooks/useGetLogoImage';
import get from '../../../../private/common/utils/get';

const useGetLogo = (logoId, title) => {
    const id = logoId && logoId.trim() && logoId;
    const logo = useGetLogoImage(id, true);

    return (
        logo && {
            src: get(logo, 'url', ''),
            alt: title,
            height: get(logo, 'height', ''),
            width: get(logo, 'width', '')
        }
    );
};

export default useGetLogo;
