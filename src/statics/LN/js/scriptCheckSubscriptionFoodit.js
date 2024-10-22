import { checkSubscriptionFromCookie } from '../../../../components/chains/utils/_BuildRoof/_helper/checkSubscription';

export const handleButtonSubscriptionFoodit = () => {
    if (checkSubscriptionFromCookie('22')) {
        const buttonFooditGrid = document.getElementById('btn-foodit-grid');
        if (buttonFooditGrid) {
            buttonFooditGrid.classList.add('none');
        }
    }
};

handleButtonSubscriptionFoodit();
