import { Adaptableimage } from '@ln/common-ui-adaptableimage';

export const Facade = ({ id = '', playlist = [], alt = '' }) => {
    // TODO: obtener imagen dinamicamente desde playlist
    const [video] = playlist || {};
    // TODO: remover handlePlayMock cuando se aplique el funcionamiento real
    const handlePlayMock = () => {
        document?.querySelector('#facade-')?.remove();
        document?.querySelector('.jw-player')?.classList.remove('none');
    };
    return (
        <div id={`facade-${id}`} className="relative ratio-16-9">
            <button
                id="button-play"
                className="absolute w-100 h-100 flex jc-center ai-center"
                onClick={() => handlePlayMock()}
            >
                <svg
                    width="64"
                    height="64"
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="relative z-15"
                >
                    <g opacity="0.65">
                        <rect width="64" height="64" rx="32" fill="#1C1C1F" />
                        <path
                            d="M41.8347 32.5547L27.7027 41.976C27.6023 42.0428 27.4857 42.0811 27.3652 42.0869C27.2448 42.0927 27.125 42.0656 27.0187 42.0087C26.9124 41.9518 26.8235 41.8671 26.7615 41.7637C26.6995 41.6602 26.6667 41.5419 26.6667 41.4213V22.5787C26.6667 22.4581 26.6995 22.3398 26.7615 22.2363C26.8235 22.1329 26.9124 22.0482 27.0187 21.9913C27.125 21.9344 27.2448 21.9074 27.3652 21.9131C27.4857 21.9189 27.6023 21.9572 27.7027 22.024L41.8347 31.4453C41.926 31.5062 42.0009 31.5887 42.0526 31.6855C42.1044 31.7822 42.1315 31.8903 42.1315 32C42.1315 32.1098 42.1044 32.2178 42.0526 32.3146C42.0009 32.4113 41.926 32.4938 41.8347 32.5547V32.5547Z"
                            fill="#FEFEFE"
                        />
                    </g>
                </svg>
            </button>
            <Adaptableimage
                src="https://www.lanacion.com.ar/resizer/v2/llaryora-fue-el-primer-gobernador-que-francos-IDCN67IUENHCVH57IQZ2K6H7DM.jpeg?auth=bce5758878b4e4d577ab6e843ec1a0dbcb07c76c9be4e782c890570ab68d9e05&width=880&height=586&quality=70&smart=true"
                alt={alt}
                className="w-100 h-100 facade-img ratio-16-9"
            />
        </div>
    );
};
export default Facade;
