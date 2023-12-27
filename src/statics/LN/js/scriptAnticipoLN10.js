export const initializeAnticipoScript = () => {
    const buttonCloseAdvance = document.getElementById('closeAdvance');
    const advance = document.querySelector('.ln-advance');

    if (buttonCloseAdvance) {
        buttonCloseAdvance.onclick = () => {
            advance && advance.classList.add('none');
        };
    }
};

initializeAnticipoScript();
