/* eslint-disable react-hooks/rules-of-hooks */
import useTermica from '../../../common/hooks/useTermica';

const showSubscribeButton = loginData => {
    const paywall = useTermica('paywall') || false;
    const { subscription = false } = loginData;
    debugger;
    return paywall && typeof window !== 'undefined' && !subscription;
};

export default showSubscribeButton;
