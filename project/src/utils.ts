import { MAX_RATING_VALUE, SortingTypes } from './const';
import { OfferType } from './types/offer-type';

export const capitalizeWord = (word: string): string => word.charAt(0).toUpperCase() + word.slice(1);

export const getRatingWidth = (rating: number): number => Math.round((rating / 5) * 100);

export const ratingValues = new Array(MAX_RATING_VALUE).fill(null).map((_, index) => index + 1).sort((a, b) => b - a);

export const formatReviewDate = (reviewDate: string): string[] => {
  const rawDate = new Date(reviewDate);
  return [
    rawDate.toLocaleString('en-CA').slice(0, 10),
    rawDate.toLocaleString('en-US', { month: 'long', year: 'numeric' }),
  ];
};

export const getSelectedCityOffers = (offers: OfferType[], selectedCity: string): OfferType[]  => offers.filter((offer) => offer.city.name === selectedCity);


export const sortingOffers = (currentSortingType: string, offers: OfferType[]): OfferType[] => {
  switch (currentSortingType) {
    case SortingTypes.PRICE_UP:
      return [...offers].sort((a, b) => a.price - b.price);
    case SortingTypes.PRICE_DOWN:
      return [...offers].sort((a, b) => b.price - a.price);
    case SortingTypes.TOP_RATED:
      return [...offers].sort((a, b) => b.rating - a.rating);
    default:
      return offers;
  }
};
