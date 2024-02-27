const childrenFilter = `
    _id,
    name,
`;

export default `
    {
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
