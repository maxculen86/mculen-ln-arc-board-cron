const createHash = data => {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);

    return crypto.subtle
        ? crypto.subtle.digest('SHA-256', dataBuffer).then(hashBuffer => {
              if (hashBuffer) {
                  const hashArray = Array.from(new Uint8Array(hashBuffer));
                  const hashHex = hashArray
                      .map(byte => byte.toString(16).padStart(2, '0'))
                      .join('');

                  return hashHex;
              }
          })
        : Promise.reject('crypto.subtle only works on HTTPS');
};

export default createHash;
