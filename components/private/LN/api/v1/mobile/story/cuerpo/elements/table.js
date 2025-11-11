const table = ({ header = [], rows = [] }) => {
    return {
        type: 'table',
        header,
        rows
    };
};

export default table;