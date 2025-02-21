const childrenFilter = `
    _id,
    name,
`;

export default `
    {
        Termicas {
            tooltip_subscribe_foodit_show,
            tooltip_subscribe_foodit_text
        },
        children {
            ${childrenFilter}
            children {
                ${childrenFilter}
                children {
                    ${childrenFilter}
                }
            }
        }
    }
`;
