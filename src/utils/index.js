export const parseEOS    = eosString => parseFloat(eosString.split(" ")[0]);
export const toEOSString = value => `${parseFloat(value).toFixed(4)} EOS`;