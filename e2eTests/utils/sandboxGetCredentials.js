const fetch = require('node-fetch');

(async () => {
    const resp = await fetch(
        'https://sandbox.lanacion.com.ar/6VOdwXVPP3zI6Uy0Zzs0ejy1LTa8nZMCpCr/'
    );

    const authCookie = resp.headers.get('set-cookie');
    console.log(authCookie.replace(/^el_arc=([a-zA-Z0-9-]+);.*$/, '$1'));
})();
