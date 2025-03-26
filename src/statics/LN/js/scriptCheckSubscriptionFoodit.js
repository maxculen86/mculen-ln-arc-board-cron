import { checkSubscriptionFromCookie } from '../../../../components/chains/utils/_BuildRoof/_helper/checkSubscription';

export const handleButtonSubscriptionFoodit = () => {
    if (checkSubscriptionFromCookie('22')) {
        const buttonFooditGridDesk = document.getElementById('btn-foodit-grid');
        const buttonFooditGridMob = document.getElementById('btn-foodit-roof');
        if (buttonFooditGridDesk) {
            buttonFooditGridDesk.classList.add('none');
        }
        if (buttonFooditGridMob) {
            buttonFooditGridMob.classList.add('none');
        }
    }
};

handleButtonSubscriptionFoodit();
