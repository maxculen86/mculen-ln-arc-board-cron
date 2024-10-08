import { checkSubscriptionFromCookie } from '../../../../components/chains/utils/_BuildRoof/_helper/checkSubscription';

export const handleButtonSubscriptionLN = () => {
    if (checkSubscriptionFromCookie('2')) {
        const button = document.querySelector('a.--roof-button.--subscribe');
        button && button?.remove();
    }
};

handleButtonSubscriptionLN();
