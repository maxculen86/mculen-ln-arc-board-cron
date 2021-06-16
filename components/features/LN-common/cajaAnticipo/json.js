const CajaAnticipo = ({ customFields: { hide, title, link } }) => {
    if (!title) return null;

    return {
        information: {
            hideCaja: hide || false,
            title,
            url: link
        }
    };
};

export default CajaAnticipo;
