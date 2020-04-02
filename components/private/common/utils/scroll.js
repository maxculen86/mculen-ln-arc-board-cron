const getScrollDirection = scrollPos => {
    const windowY = window.scrollY;
    return {
        isScrollUp: windowY < scrollPos,
        isScrollDown: windowY >= scrollPos
    };
};

export default { getScrollDirection };
