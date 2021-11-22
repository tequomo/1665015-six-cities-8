import { BackendHostType, HostType } from './offer-type';

export type ReviewType = {
  comment: string,
  date: string,
  id: number,
  rating: number,
  user: HostType,
};

export type BackendReviewType = Omit<ReviewType, 'user'> & {user: BackendHostType};

export type PostReviewType = {
  comment: string,
  rating: number,
};
