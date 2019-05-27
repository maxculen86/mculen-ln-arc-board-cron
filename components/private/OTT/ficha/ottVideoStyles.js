export default function loadOTTVideoStyles() {
    window.PowaSettings = {};
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
                top: '-3px'
            }
        },
        template: function powaShotTemplate(settings) {
            let playText = '▶';

            let template = `
                    <div class="powa-shot-image powa-shot-click powa-shot-click-play" style="background-image: url('${
                        settings.image
                    }')">
                        <div class="powa-shot-play-btn powa-shot-click powa-shot-click-play"><span class="video-btn-play-powa">${playText}</span></div>
                    </div>`;

            return template.trim();
        }
    };
}
