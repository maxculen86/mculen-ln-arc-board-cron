import Consumer from 'fusion:consumer';

const CajaAnticipo = ({ customFields: { hide, title, link } }) => {
    return {
        hide,
        title,
        link
    };
};

export default Consumer(CajaAnticipo);
