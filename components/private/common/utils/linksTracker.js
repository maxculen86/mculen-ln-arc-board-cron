const createIntersectionObserverForLinks = () => {
    const target = document.querySelector('.cuerpo__nota');
    const links = target.querySelectorAll('p a');
    console.log(
        '🚀 ~ file: linksTracker.js ~ line 4 ~ createIntersectionObserverForLinks ~ paragraphs',
        links
    );

    const callback = entries => {
        entries.forEach(e => {
            console.log(e);
        });
    };

    const observer = new IntersectionObserver(callback);

    links.forEach(link => {
        observer.observe(link);
    });
};
export default createIntersectionObserverForLinks;
