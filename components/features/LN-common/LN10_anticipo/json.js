const Anticipo = ({
    customFields: { hide, title, url, textBadge, lead, video }
}) => {
    if (!title) return null;

    return {
        information: {
            hideCaja: hide || false,
            title,
            url,
            textBadge,
            lead,
            video
        }
    };
};

export default Anticipo;
