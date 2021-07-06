window.pluginOptions = {
    height: '400px',
    width: '500px'
};
window.initializePlugin = ({ field, initVal, onClose, onSave }) => {
    const input = document.getElementById('html');
    input.value = initVal || '';
    input.placeholder = (!initVal && '<div>Hola Mundo</div>') || '';

    document.getElementById('save').addEventListener('click', () => {
        onSave(input.value);
    });

    document.getElementById('close').addEventListener('click', onClose);
};
