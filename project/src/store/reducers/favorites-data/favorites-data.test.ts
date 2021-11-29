import { LoadingStatus } from '../../../const';
import { FavoritesData } from '../../../types/state';
import { getFakeOffers, getFakeOffer } from '../../../utils/mock';
import { loadFavoriteOffers,
  setFavoriteOffersLoadingStatus,
  setToggleIsFavoriteLoadingStatus,
  updateOffer} from '../../action';
import { favoritesData } from './favorites-data';


const state: FavoritesData = {
  favoriteOffers: [],
  favoriteOffersLoadingStatus: LoadingStatus.Idle,
  toggleIsFavoriteLoadingStatus: LoadingStatus.Idle,
};

const offers = getFakeOffers();

describe('Reducer: favoritesData', () => {
  it('with omit parameters should return initial state', () => {
    expect(favoritesData(void 0, { type: 'UNKNOWN_TYPE' }))
      .toEqual(state);
  });
  it('should update state if favorites is loaded', () => {
    expect(favoritesData(state, loadFavoriteOffers(offers)))
      .toEqual({
        ...state,
        favoriteOffers: offers,
      });
  });

  it('should update loading status when favorite offers are loaded or not loaded', () => {
    expect(favoritesData(state, setFavoriteOffersLoadingStatus(LoadingStatus.Succeeded)))
      .toEqual({
        ...state,
        favoriteOffersLoadingStatus: LoadingStatus.Succeeded,
      });
    expect(favoritesData(state, setFavoriteOffersLoadingStatus(LoadingStatus.Failed)))
      .toEqual({
        ...state,
        favoriteOffersLoadingStatus: LoadingStatus.Failed,
      });
  });

  it('should update favorites when doing updating process', () => {
    const initialState = {
      ...state,
      favoriteOffers: offers,
    };
    const randomOffer = offers[Math.floor(Math.random() * offers.length)];
    const uniqueId = offers.reduce((sum, current) => sum + current.id, 1);
    const updatedOfferSameId = {
      ...getFakeOffer(),
      id: randomOffer.id,
    };
    const updatedOfferUniqueId = {
      ...getFakeOffer(),
      id: uniqueId,
    };
    expect(favoritesData(initialState, updateOffer(updatedOfferSameId)).favoriteOffers)
      .toEqual(expect.not.arrayContaining([randomOffer]));

    expect(favoritesData(initialState, updateOffer(updatedOfferUniqueId)).favoriteOffers)
      .toEqual(expect.arrayContaining([updatedOfferUniqueId]));
  });


  it('should update loading status when offer is added to or removed from favorite offers', () => {
    expect(favoritesData(state, setToggleIsFavoriteLoadingStatus(LoadingStatus.Succeeded)))
      .toEqual({
        ...state,
        toggleIsFavoriteLoadingStatus: LoadingStatus.Succeeded,
      });
    expect(favoritesData(state, setToggleIsFavoriteLoadingStatus(LoadingStatus.Failed)))
      .toEqual({
        ...state,
        toggleIsFavoriteLoadingStatus: LoadingStatus.Failed,
      });
  });
});
