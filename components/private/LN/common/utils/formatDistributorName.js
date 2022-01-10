const formatDistributorName = (text = '') => {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[()]/g, '')
        .replace(/[\s./]/g, '-');
};

export default formatDistributorName;
