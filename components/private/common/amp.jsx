import { useAppContext } from 'fusion:context';

export default function Amp({ children }) {
    const { outputType } = useAppContext();

    return outputType === 'amp' ? children : null;
}
