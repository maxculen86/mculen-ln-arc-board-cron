const showSubscribeButton = ({ paywall, window, loginData }) => {
    const { subscription = false } = loginData;
    return paywall && typeof window !== 'undefined' && !subscription;
};

export default showSubscribeButton;
