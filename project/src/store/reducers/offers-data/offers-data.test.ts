import { OffersData } from '../../../types/state';
import { LoadingStatus } from '../../../const';
import { loadOffers, setOffersLoadingStatus, updateOffer } from '../../action';
// import { updateOffers } from '../../../utils/utils';
import { offersData } from './offers-data';
import { getFakeOffers, getFakeOffer } from '../../../utils/mock';


const state: OffersData = {
  offers: [],
  offersLoadingStatus: LoadingStatus.Idle,
};

const offers = getFakeOffers();

describe('Reducer: offersData', () => {
  it('with omit parameters should return initial state', () => {
    expect(offersData(void 0, { type: 'UNKNOWN_TYPE' }))
      .toEqual(state);
  });
  it('should update state if nearby offers is loaded', () => {
    expect(offersData(state, loadOffers(offers)))
      .toEqual({
        ...state,
        offers: offers,
      });
  });
  it('should update loading status when offers are loaded or not loaded', () => {
    expect(offersData(state, setOffersLoadingStatus(LoadingStatus.Succeeded)))
      .toEqual({
        ...state,
        offersLoadingStatus: LoadingStatus.Succeeded,
      });
    expect(offersData(state, setOffersLoadingStatus(LoadingStatus.Failed)))
      .toEqual({
        ...state,
        offersLoadingStatus: LoadingStatus.Failed,
      });
  });

  it('should update favorites when doing updating process', () => {
    const initialState = {
      ...state,
      offers: offers,
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

    expect(offersData(initialState, updateOffer(updatedOfferSameId)).offers)
      .toEqual(expect.not.arrayContaining([randomOffer]));

    // expect(offersData(initialState, updateOffer(updatedOfferUniqueId)).offers)
    //   .toEqual(expect.arrayContaining([updatedOfferUniqueId]));

    expect(offersData(initialState, updateOffer(updatedOfferUniqueId)).offers)
      .toEqual(initialState.offers);
  });

  // it('should update nearby offers when doing updating process', () => {
  //   const initialState = {
  //     ...state,
  //     nearbyOffers: offers,
  //   };
  //   const randomOffer = offers[Math.floor(Math.random() * offers.length)];
  //   const uniqueId = offers.reduce((sum, current) => sum + current.id, 1);
  //   const updatedOfferSameId = {
  //     ...getFakeOffer(),
  //     id: randomOffer.id,
  //   };
  //   const updatedOfferUniqueId = {
  //     ...getFakeOffer(),
  //     id: uniqueId,
  //   };
  //   expect(nearbyData(initialState, updateOffer(updatedOfferSameId)).nearbyOffers)
  //     .toEqual(expect.arrayContaining([updatedOfferSameId]));

  //   expect(nearbyData(initialState, updateOffer(updatedOfferSameId)).nearbyOffers)
  //     .toEqual(expect.not.arrayContaining([randomOffer]));

  //   expect(nearbyData(initialState, updateOffer(updatedOfferUniqueId)).nearbyOffers)
  //     .toEqual(initialState.nearbyOffers);
  // });

});


// const offersData = createReducer(initialState, (builder) => {
//   builder
//     .addCase(loadOffers, (state, action) => {
//       state.offers = action.payload;
//     })
//     .addCase(setOffersLoadingStatus, (state, action) => {
//       state.offersLoadingStatus = action.payload;
//     })
//     .addCase(updateOffer, (state, action) => {
//       state.offers = updateOffers(state.offers, action.payload);
//     });
// });

// export { offersData };
