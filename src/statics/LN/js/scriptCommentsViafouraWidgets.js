// TODO ver posibilidad de testear script
window.addEventListener('load', _event => {
    let token = '';
    let productoPremium = '';
    const value = '; ' + document.cookie;
    const parts = value.split('; token=');
    const partsPremiumd = value.split('; ProductoPremiumId=');

    if (parts.length === 2)
        token = parts
            .pop()
            .split(';')
            .shift();

    if (partsPremiumd.length === 2)
        productoPremium = partsPremiumd
            .pop()
            .split(';')
            .shift();

    window.vfQ = window.vfQ || [];
    window.vfQ.push(() => {
        window.vf.$prepublish((channel, event, ...args) => {
            if (channel === 'authentication' && event === 'required') {
                return false;
            }
            if (channel === 'commenting' && event === 'loaded') {
                const loader = document.getElementsByClassName('loader');
                loader && loader[0].classList.add('hlp-none');
            }
            return { channel, event, args };
        });
        if (productoPremium && productoPremium.includes('2')) {
            window.vf &&
                window.vf.session &&
                window.vf.session.login
                    .cookie(token)
                    .then(successMessage => {
                        console.log('Viafoura Login correcto ', successMessage);
                    })
                    .catch(error => {
                        console.log('Viafoura Login incorrecto ', error);
                    });
        }
    });
});
