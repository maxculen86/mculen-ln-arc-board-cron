export const getSubheaderStateClass = ({ sticky, isSubscribed }) => {
    const SHOW_CLASS = 'show';
    const HIDE_CLASS = 'hide';

    if (sticky === 'default' || !isSubscribed) return null;

    return isSubscribed && sticky === 'show-subheader'
        ? SHOW_CLASS
        : HIDE_CLASS;
};
