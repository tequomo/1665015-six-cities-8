import { MAX_RATING_VALUE } from './const';

export const capitalizeWord = (word: string): string => word.charAt(0).toUpperCase() + word.slice(1);

export const getRatingWidth = (rating: number): number => Math.round((rating / 5) * 100);

export const ratingValues = new Array(MAX_RATING_VALUE).fill(null).map((_, index) => index + 1).sort((a, b) => b - a);
