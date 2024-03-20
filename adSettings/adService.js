export const generateUniqueId = () => {
  return Date.now().toString(36);
};
export const addAd = (ads, newAd) => {
  return [...ads, { ...newAd, id: generateUniqueId() }];
};
export const updateAd = (ads, updatedAd) => {
  return ads.map((ad) => (ad.id === updatedAd.id ? { ...ad, ...updatedAd } : ad));
};
export const deleteAd = (ads, adId) => {
  return ads.filter((ad) => ad.id !== adId);
};