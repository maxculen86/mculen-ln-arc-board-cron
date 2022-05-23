const setProportion = (device, isAmp) =>
    ['mobile', 'tablet'].includes(device) || isAmp ? '2:3' : '3:2';

export default setProportion;
