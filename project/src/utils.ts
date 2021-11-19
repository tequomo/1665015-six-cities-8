import { AuthStatus, MAX_RATING_VALUE, SortingTypes } from './const';
import { CityType, OfferType } from './types/offer-type';

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

export const isCheckedAuth = (authStatus: AuthStatus): boolean =>
  authStatus === AuthStatus.Unknown;

export const getCityData = (offers: OfferType[]): CityType => offers
  .reduce((_city, offer) => offer.city, {} as CityType);

export const getRandomItems = (items: string[], length: number): string[] => items.slice().sort(() => 0.5 - Math.random()).slice(0,length);


export const updateOffers = (offers: OfferType[], updateData: OfferType): OfferType[] => {
  const updateDataIndex = offers.findIndex((offer) => offer.id === updateData.id);
  if (updateDataIndex === -1) {
    return [
      ...offers,
      updateData,
    ];
  }
  return [
    ...offers.slice(0, updateDataIndex),
    ...offers.slice(updateDataIndex + 1),
  ];
};

export const validateLogin = (login: string): string => {
  // const loginReg = /\S+@\S+\.\S+/;
  const loginReg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
  if (loginReg.test(login)) {
    return '';
  }
  return 'Login must contain at least 1 letter and 1 number.\n No spaces allowed';
};

export const validatePassword = (password: string): string => {
  const passwordReg = /(?=.*\d)(?=.*[a-zA-Z])./;
  if (passwordReg.test(password)) {
    return '';
  }
  return 'Password must contain at least 1 letter and 1 number.\n No spaces allowed';
};

