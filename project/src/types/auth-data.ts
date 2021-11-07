export type AuthDataRequest = {
  login: string;
  password: string;
};

export type AuthDataResponse = {
    'avatar_url': string,
    'email': string,
    'id': number,
    'is_pro': boolean,
    'name': string,
    'token': string,
};

export type AuthUserData = {
  'avatarUrl': string,
  'email': string,
  'id': number,
  'isPro': boolean,
  'name': string,
  'token': string,
}
