const createHash = data => {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);

    return crypto.subtle
        ? crypto.subtle.digest('SHA-256', dataBuffer).then(hashBuffer => {
              if (!hashBuffer) return null;
              const hashArray = Array.from(new Uint8Array(hashBuffer));
              return hashArray
                  .map(byte => byte.toString(16).padStart(2, '0'))
                  .join('');
          })
        : Promise.reject(new Error('crypto.subtle only works on HTTPS'));
};

export default createHash;
