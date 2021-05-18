import Consumer from 'fusion:consumer';

const CajaAnticipo = ({ customFields: { hide, title, link } }) => {
    if (!title) return null;

    const information = {
        hideCaja: hide || false,
        title,
        url: link
    };

    return {
        information: {
            hideCaja: hide || false,
            title,
            url: link
        }
    };
};

export default Consumer(CajaAnticipo);
