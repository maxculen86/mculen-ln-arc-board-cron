const resolveButtonLogo = ({ buttonLogo, isFoodit }) => {
    if (isFoodit) return '';
    if (buttonLogo && typeof buttonLogo === 'object' && buttonLogo.src) {
        return { ...buttonLogo, loading: 'lazy' };
    }
    return buttonLogo;
};

export default resolveButtonLogo;
