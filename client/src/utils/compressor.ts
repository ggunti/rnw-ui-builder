import lz from 'lzutf8';

export function compress(serializedJson: string | undefined) {
  if (serializedJson) {
    return lz.encodeBase64(lz.compress(serializedJson));
  }
  return undefined;
}

export function decompress(compressedString: string | undefined) {
  if (compressedString) {
    return lz.decompress(lz.decodeBase64(compressedString));
  }
  return undefined;
}
