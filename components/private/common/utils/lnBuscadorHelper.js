const insertTitleAndDescrition = (searchResults, title, description) => {
    const head = document.querySelector('head');
    const tagTitle = document.createElement('title');
    const tagMetaDescription = document.createElement('meta');

    tagTitle.innerHTML = `${searchResults}: ${title}`;

    tagMetaDescription.setAttribute('name', 'description');
    tagMetaDescription.setAttribute(
        'content',
        description.replace(/[+]/, searchResults)
    );

    head.appendChild(tagTitle);
    head.appendChild(tagMetaDescription);
};

export default insertTitleAndDescrition;
