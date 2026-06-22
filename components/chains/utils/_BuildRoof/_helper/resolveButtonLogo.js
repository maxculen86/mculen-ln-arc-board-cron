const resolveButtonLogo = ({ buttonLogo, isFoodit }) => {
    if (isFoodit) return '';
    if (buttonLogo && typeof buttonLogo === 'object' && buttonLogo.src) {
        return {
            ...buttonLogo,
            loading: 'lazy',
            classNameImage: 'w-auto max-w-100 object-contain'
        };
    }
    return buttonLogo;
};

export default resolveButtonLogo;
