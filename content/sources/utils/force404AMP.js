import Redirect from './redirect';

const force404AMP = ({ outputType = 'default', redirectUrl }) => {
    if (outputType === 'amp' && redirectUrl) {
        throw new Redirect(redirectUrl, 301);
    }
};

export default force404AMP;
