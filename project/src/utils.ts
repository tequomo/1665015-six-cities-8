import { MAX_RATING_VALUE } from './const';
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
