const childrenFilter = `
    _id,
    name,
`;

export default `
    {
        Termicas {
            tooltip_subscribe_foodit_show
            tooltip_subscribe_foodit_text
            show_nutritional_info
            subscribe_button_header_text
            hide_subscribe_button_foodit
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
