type UserType = {
  avatarUrl: string,
  id: number,
  isPro: boolean,
  name: string,
}

export type ReviewType = {
  offersID: number,
  comment: string,
  date: Date,
  id: number,
  rating: number,
  user: UserType,
};
