const childrenFilter = `
    _id,
    name,
    navigation {
        nav_title
    }
`;

export default `
    {
        Termicas {
            tooltip_subscribe_foodit_show
            tooltip_subscribe_foodit_text
            show_nutritional_info
            subscribe_button_header_text
            hide_subscribe_button_foodit
            hide_chat_ia_foodit
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
