const getTitleText = (headlines = {}, label = '') => {
    const { basic = '', mobile = '' } = headlines;
    const volanta = label && label.volanta && label.volanta.text;
    const volantaComponent = volanta ? `${volanta} ` : '';
    const titleText = `${mobile || basic}`;
    return `${volantaComponent}${titleText}`;
};

export default getTitleText;
