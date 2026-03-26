export const newsletters = [
    {
        id: 243,
        title: 'Newsletter Foodit',
        badge: 'LUNES',
        description:
            'Mantente motivado y creativo en la cocina con recetas fáciles, ricas y originales seleccionadas por nuestra editora.',
        image: 'https://especialess3.lanacion.com.ar/LN/newsletter/landing/foodit.jpg'
    },
    {
        id: 244,
        title: 'Newsletter Foodit veggie',
        badge: 'MIERCOLES',
        description:
            'Con plantas, legumbres y semillas, una selección de deliciosas recetas vegetarianas y veganas.',
        image: 'https://especialess3.lanacion.com.ar/LN/newsletter/landing/veggie.jpg'
    }
];

export const getNewsletters = async ({ accessToken, token }) => {
    const response = await fetch(
        'https://api-newsletters.lanacion.com.ar/v3/Suscripciones',
        {
            method: 'GET',
            headers: {
                Authorization: accessToken,
                'X-Token': token,
                'Content-Type': 'application/json'
            }
        }
    );
    const responseNewsletter = await response.json();

    const idsInteresados = newsletters.map(newsletter => newsletter.id);
    const resultado = responseNewsletter.reduce((acc, item) => {
        const id = item?.servicio?.id;

        if (id && idsInteresados.includes(id)) {
            acc[id] = item.suscripto;
        }

        return acc;
    }, {});
    return resultado;
};

export const postNewsletter = async ({
    accessToken,
    token,
    add = [],
    remove = [],
    email = ''
}) => {
    const servicios = {
        serviciosAgregar: add,
        serviciosRemover: remove
    };
    const data = { ...servicios, ...(email && { email }) };

    const response = await fetch(
        'https://api-newsletters.lanacion.com.ar/v3/Suscripciones',
        {
            method: 'POST',
            headers: {
                Authorization: accessToken,
                'X-Token': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
    );
    return response;
};
