const Anticipo = ({
    customFields: { hide, title, link, textBadge, lead, video }
}) => {
    if (!title) return null;

    return {
        information: {
            hideCaja: hide || false,
            title,
            url: link,
            textBadge,
            lead,
            video
        }
    };
};

export default Anticipo;
