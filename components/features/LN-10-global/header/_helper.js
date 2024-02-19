import classNames from 'classnames';
import dynamicallyLoadScript from '../../../private/LN/common/utils/dynamicallyLoadScript';
import handleCookie from '../../../private/LN/common/utils/handleCookie';
import { LOGIN_URL } from 'fusion:environment';

export const getUserType = (isSubscribed, userEmail) => {
    if (isSubscribed) return 'subscribed';
    if (userEmail) return 'logged';
    return 'unlogged';
};

export const getConfigClassName = ({ sticky, negative, isHome }) => {
    return {
        wrapperMainHeaderClassNames: isHome ? 'h-64 h-86_md h-88_l' : undefined,
        mainHeaderClassNames: classNames(
            'border border-bottom border-thin relative',
            negative
                ? 'bg-black-64 border-neutral-light-900'
                : 'bg-light-50 border-neutral-light-100',
            { 'fixed_l top-0 w-100 z-1500': sticky },
            { '--transition-header': sticky && isHome }
        ),
        mainHeaderContentClassNames: classNames(
            'lay-container h-64',
            sticky ? 'h-64 h-86_md h-56_l' : 'h-64 h-86_md h-88_l'
        ),
        centerOptionsClassNames: classNames(
            'logo-header flex jc-center relative',
            sticky ? 'w-152 w-304_md w-268_l' : 'w-152 w-304_md'
        ),
        subHeaderClassNames: classNames(
            'border border-thin border-bottom border-light-300',
            { 'mt-88_l': sticky }
        )
    };
};

export const isHeaderNegative = ({
    layout = '',
    section = '',
    layoutsName = {}
}) => {
    const validationBy = [section, layout];

    const validations = [
        layoutsName.FotoAl100,
        layoutsName.StoryTelling,
        layoutsName.Video,
        '/revista-hola',
        '/revista-lugares'
    ];

    return validationBy.some(validation => validations.includes(validation));
};

// export const handleClickBuscar = () => {
//     dynamicallyLoadScript('//www.queryly.com/js/queryly.v4.js', 'body').then(
//         () => {
//             const initScript = document.createElement('script');
//             initScript.innerHTML = `queryly.init('8075c0c1c4c44847', document.querySelectorAll('#fusion-app'));`;
//             document.body.appendChild(initScript);
//             document.getElementById('querylyButton').click();
//         }
//     );
// };

export const getUserData = () => {
    const { getCookie } = handleCookie();
    const ProductoPremiumId = getCookie('ProductoPremiumId') || '';

    return {
        userName: getCookie('usuario%5Fdetalle%5Fnombre'),
        userLastName: getCookie('usuario%5Fdetalle%5Fapellido'),
        userEmail: getCookie('usuarioemail'),
        isSubscribed: ProductoPremiumId.includes('2'),
        goToLoginUrl: () => {
            location.href = LOGIN_URL + window.btoa(location.href);
        },
        loading: false
    };
};
