const iconProxyHostname = 'images.weserv.nl';

export function getReadableIconUrl(url, currentOrigin) {
  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.origin === currentOrigin || ['data:', 'blob:'].includes(parsedUrl.protocol)) return url;
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) return url;
    if (parsedUrl.username || parsedUrl.password || parsedUrl.search || parsedUrl.hash) return url;
    return `https://${iconProxyHostname}/?url=${encodeURIComponent(parsedUrl.href)}&output=png`;
  } catch {
    return url;
  }
}

export function getIconSources(primaryUrl, fallbackUrl, currentOrigin) {
  const rawSources = [...new Set([primaryUrl, fallbackUrl].filter(Boolean))];
  return [...new Set(rawSources.flatMap((url) => [getReadableIconUrl(url, currentOrigin), url]))];
}

export function isReadableIconProxy(url) {
  try {
    return new URL(url).hostname === iconProxyHostname;
  } catch {
    return false;
  }
}

export function shouldUseDarkIconBackground(pixels, sampleSize) {
  let visibleWeight = 0;
  let lowContrastWeight = 0;
  let highContrastWeight = 0;
  let edgeWeight = 0;
  let lowContrastEdgeWeight = 0;
  let luminanceWeight = 0;

  for (let index = 0; index < pixels.length; index += 4) {
    const alpha = pixels[index + 3] / 255;
    if (alpha < 0.12) continue;
    const red = pixels[index] / 255;
    const green = pixels[index + 1] / 255;
    const blue = pixels[index + 2] / 255;
    const linearRed = red <= 0.04045 ? red / 12.92 : ((red + 0.055) / 1.055) ** 2.4;
    const linearGreen = green <= 0.04045 ? green / 12.92 : ((green + 0.055) / 1.055) ** 2.4;
    const linearBlue = blue <= 0.04045 ? blue / 12.92 : ((blue + 0.055) / 1.055) ** 2.4;
    const luminance = 0.2126 * linearRed + 0.7152 * linearGreen + 0.0722 * linearBlue;
    const contrastWithWhite = 1.05 / (luminance + 0.05);
    const pixelIndex = index / 4;
    const x = pixelIndex % sampleSize;
    const y = Math.floor(pixelIndex / sampleSize);
    const isEdge = x < 3 || x >= sampleSize - 3 || y < 3 || y >= sampleSize - 3;

    visibleWeight += alpha;
    luminanceWeight += luminance * alpha;
    if (contrastWithWhite < 2) lowContrastWeight += alpha;
    if (contrastWithWhite >= 2.5) highContrastWeight += alpha;
    if (isEdge) {
      edgeWeight += alpha;
      if (contrastWithWhite < 2) lowContrastEdgeWeight += alpha;
    }
  }

  if (!visibleWeight) return false;
  const opaqueCoverage = visibleWeight / (sampleSize * sampleSize);
  const lowContrastRatio = lowContrastWeight / visibleWeight;
  const highContrastRatio = highContrastWeight / visibleWeight;
  const averageLuminance = luminanceWeight / visibleWeight;
  const lowContrastEdgeRatio = edgeWeight ? lowContrastEdgeWeight / edgeWeight : 0;
  const hasLightCanvas = opaqueCoverage > 0.9 && lowContrastEdgeRatio > 0.85 && highContrastRatio >= 0.04;
  return lowContrastRatio >= 0.68 && averageLuminance >= 0.55 && !hasLightCanvas;
}
