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
};

handleScriptBtnSuscription();
