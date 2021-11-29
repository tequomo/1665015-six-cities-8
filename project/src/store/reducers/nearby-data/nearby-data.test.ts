import { LoadingStatus } from '../../../const';
import { NearbyData } from '../../../types/state';
import { getFakeOffers, getFakeOffer } from '../../../utils/mock';
import { loadNearbyOffers, setNearbyOffersLoadingStatus, updateOffer } from '../../action';
import { nearbyData } from './nearby-data';

const state: NearbyData = {
  nearbyOffers: [],
  nearbyOffersLoadingStatus: LoadingStatus.Idle,
};

const offers = getFakeOffers();

describe('Reducer: nearbyData', () => {
  it('with omit parameters should return initial state', () => {
    expect(nearbyData(void 0, { type: 'UNKNOWN_TYPE' }))
      .toEqual(state);
  });
  it('should update state if nearby offers is loaded', () => {
    expect(nearbyData(state, loadNearbyOffers(offers)))
      .toEqual({
        ...state,
        nearbyOffers: offers,
      });
  });
  it('should update loading status when nearby offers are loaded or not loaded', () => {
    expect(nearbyData(state, setNearbyOffersLoadingStatus(LoadingStatus.Succeeded)))
      .toEqual({
        ...state,
        nearbyOffersLoadingStatus: LoadingStatus.Succeeded,
      });
    expect(nearbyData(state, setNearbyOffersLoadingStatus(LoadingStatus.Failed)))
      .toEqual({
        ...state,
        nearbyOffersLoadingStatus: LoadingStatus.Failed,
      });
  });

  it('should update nearby offers when doing updating process', () => {
    const initialState = {
      ...state,
      nearbyOffers: offers,
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
    expect(nearbyData(initialState, updateOffer(updatedOfferSameId)).nearbyOffers)
      .toEqual(expect.arrayContaining([updatedOfferSameId]));

    expect(nearbyData(initialState, updateOffer(updatedOfferSameId)).nearbyOffers)
      .toEqual(expect.not.arrayContaining([randomOffer]));

    expect(nearbyData(initialState, updateOffer(updatedOfferUniqueId)).nearbyOffers)
      .toEqual(initialState.nearbyOffers);
  });

});
