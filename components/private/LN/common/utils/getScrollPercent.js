const getScrollPercent = () => {
    const docElem = document.documentElement;
    const bod = document.body;
    return (
        ((docElem.scrollTop || bod.scrollTop) /
            ((docElem.scrollHeight || bod.scrollHeight) -
                docElem.clientHeight)) *
        100
    );
};

export default getScrollPercent;
