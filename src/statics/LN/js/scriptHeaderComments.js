window.addEventListener('load', () => {
    const verLegalesBtn = document.querySelector('#ver-legales-btn');
    verLegalesBtn.onclick = () => {
        const verLegalesText = document.querySelector('#ver-legales-text');
        verLegalesText.classList.toggle('none');
    };
});
