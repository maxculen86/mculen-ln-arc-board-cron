export default function loadOTTVideoStyles() {
    window.PoWaSettings = {};
    window.PoWaSettings.promo = {
        style: {
            backgroundColor: 'black',
            zIndex: 1,
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: '0px',
            left: '0px',

            // inline style can be applied to child elements by specifying the class or id of the child
            '.powa-shot-image': {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            },

            '.powa-shot-title': {
                fontSize: 'xx-large',
                color: '#EEE',
                textShadow:
                    '2px 2px 3px rgba(0,0,0, 0.8), -1px -1px 0 rgba(0,0,0, 0.3), 1px -1px 0 rgba(0,0,0, 0.3), -1px 1px 0 rgba(0,0,0, 0.3), 1px 1px 0 rgba(0,0,0, 0.3)',
                position: 'absolute',
                top: '30px',
                left: '30px'
            },

            '.powa-shot-play-btn': {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '75px',
                height: '75px',
                cursor: 'pointer',
                fontSize: 'xx-large',
                color: '#EEE',
                backgroundClip: 'padding-box',
                border: '3px solid rgba(255,255,255, 0.5)',
                borderRadius: '50%',
                backgroundColor: '#111'
            },

            '.powa-shot-duration': {
                fontSize: 'x-large',
                color: '#EEE',
                textShadow:
                    '2px 2px 3px rgba(0,0,0, 0.8), -1px -1px 0 rgba(0,0,0, 0.3), 1px -1px 0 rgba(0,0,0, 0.3), -1px 1px 0 rgba(0,0,0, 0.3), 1px 1px 0 rgba(0,0,0, 0.3)',
                position: 'absolute',
                bottom: '30px',
                left: '30px'
            },

            '.video-btn-play-powa': {
                margin: '0',
                position: 'relative',
                left: '2px',
                top: '2px',
                display: 'inline-block'
            }
        },
        template: function powaShotTemplate(settings) {
            //const playText = '';

            const template = `
                    <div class="powa-shot-image powa-shot-click powa-shot-click-play" style="background-image: url('${settings.image}')">
                        <div class="powa-shot-play-btn powa-shot-click powa-shot-click-play"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.376 12.416L8.777 19.482C8.70171 19.5321 8.61423 19.5609 8.52389 19.5652C8.43355 19.5695 8.34373 19.5492 8.264 19.5065C8.18427 19.4639 8.1176 19.4003 8.07111 19.3228C8.02462 19.2452 8.00005 19.1564 8 19.066V4.93401C8.00005 4.84356 8.02462 4.75483 8.07111 4.67725C8.1176 4.59967 8.18427 4.53616 8.264 4.49347C8.34373 4.45078 8.43355 4.43051 8.52389 4.43484C8.61423 4.43916 8.70171 4.4679 8.777 4.51801L19.376 11.584C19.4445 11.6297 19.5006 11.6915 19.5395 11.7641C19.5783 11.8367 19.5986 11.9177 19.5986 12C19.5986 12.0823 19.5783 12.1633 19.5395 12.2359C19.5006 12.3085 19.4445 12.3703 19.376 12.416Z" fill="#ffffff"/></svg></div>
                    </div>`;

            return template.trim();
        }
    };
}
