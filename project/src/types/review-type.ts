type UserType = {
  avatarUrl: string,
  id: number,
  isPro: boolean,
  name: string,
}

export type ReviewType = {
  comment: string,
  date: Date,
  id: number,
  rating: number,
  user: UserType,
};
