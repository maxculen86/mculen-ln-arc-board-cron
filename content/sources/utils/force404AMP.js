import NotFoundError from './notFoundError';

const force404AMP = ({ outputType = 'default' }) => {
    if (outputType === 'amp') {
        throw new NotFoundError('Pagina en Amp no encontrada');
    }
};

export default force404AMP;
