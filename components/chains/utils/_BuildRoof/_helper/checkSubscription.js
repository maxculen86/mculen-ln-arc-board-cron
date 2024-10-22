// 2 Subscription LN
// 22 Subscription FOODIT

export function checkSubscriptionFromCookie(cookie = '') {
    if (typeof document === 'undefined' || !document.cookie) {
        return false;
    }

    const parts = document.cookie.split('; ProductoPremiumId=');

    const productsPremium =
        parts.length === 2 ? parts.pop().split(';').shift() : '';

    if (!productsPremium) {
        return false;
    }

    const cookieArray = productsPremium.split(',');

    return cookieArray.includes(cookie);
}
