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

    if (productsPremium && productsPremium.includes('2')) {
        const button = document.querySelector('a.--roof-button.--subscribe');

        button && button.classList.add('none');
    }

    if (productsPremium && productsPremium.includes('22')) {
        const buttonFooditRoof = document.getElementById('btn-foodit-roof');
        const buttonFooditGrid = document.getElementById('btn-foodit-grid');

        buttonFooditRoof && buttonFooditRoof.classList.add('none');
        buttonFooditGrid && buttonFooditGrid.classList.add('none');
    }
};

handleScriptBtnSuscription();
