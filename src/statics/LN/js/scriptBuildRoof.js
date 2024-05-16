// TODO analizar y ver posibilidad de un test
export const handleScriptBtnSuscription = () => {
    const parts = document.cookie.split('; ProductoPremiumId=');
    const productsPremium =
        parts.length === 2
            ? parts
                  .pop()
                  .split(';')
                  .shift()
            : '';

    const cookieArray = productsPremium.split(',');
    const subscription = cookieArray.includes('2');

    if (cookieArray.includes('22')) {
        const buttonFooditRoof = document.getElementById('btn-foodit-roof');
        const buttonFooditGrid = document.getElementById('btn-foodit-grid');

        buttonFooditRoof && buttonFooditRoof.classList.add('none');
        buttonFooditGrid && buttonFooditGrid.classList.add('none');
    }
    if (subscription) {
        const button = document.querySelector('a.--roof-button.--subscribe');
        button && button.classList.add('none');
    }
    if (subscription && cookieArray.includes('22')) {
        const buttonFooditRoof = document.getElementById('btn-foodit-roof');
        const buttonFooditGrid = document.getElementById('btn-foodit-grid');
        const button = document.querySelector('a.--roof-button.--subscribe');

        buttonFooditRoof && buttonFooditRoof.classList.add('none');
        buttonFooditGrid && buttonFooditGrid.classList.add('none');
        button && button.classList.remove('none');
    }
};

handleScriptBtnSuscription();
