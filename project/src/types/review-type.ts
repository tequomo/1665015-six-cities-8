import { BackendHostType, HostType } from './offer-type';

// type UserType = {
//   avatarUrl: string,
//   id: number,
//   isPro: boolean,
//   name: string,
// }

export type ReviewType = {
  comment: string,
  date: string,
  id: number,
  rating: number,
  user: HostType,
};

export type BackendReviewType = Omit<ReviewType, 'user'> & {user: BackendHostType};
