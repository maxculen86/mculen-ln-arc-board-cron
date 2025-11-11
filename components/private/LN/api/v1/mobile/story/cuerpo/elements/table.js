const table = ({ header = [], rows = [] }) => {
    return {
        _t: 'table',
        header,
        rows
    };
};

export default table;