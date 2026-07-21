const getTitleText = (headlines = {}, label = '', withVolanta = true) => {
    const { basic = '', mobile = '' } = headlines;
    const volanta = label && label.volanta && label.volanta.text;
    const volantaComponent = volanta ? `${volanta} ` : '';
    const titleText = `${mobile || basic}`;
    return withVolanta ? `${volantaComponent}${titleText}` : titleText;
};

export default getTitleText;
