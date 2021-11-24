import { LoadingStatus } from '../../../const';
import { CurrentOfferData } from '../../../types/state';
import { loadCurrentOffer/*, setCurrentOfferLoadingStatus, updateOffer */} from '../../action';
// import { updateCurrentOffer } from '../../../utils/utils';
import { getFakeOffer } from '../../../utils/mock';
import { currentOfferData } from './current-offer-data';

const state: CurrentOfferData = {
  currentOffer: null,
  currentOfferLoadingStatus: LoadingStatus.Idle,
};

const offer = getFakeOffer();
// const anotherOfferSameId = {...offer, id: offer.id};
// const anotherOfferAnotherId = {...offer, id: offer.id + 10};

describe('Reducer: currentOfferData', () => {

  it('without additional parameters should return initial state', () => {
    expect(currentOfferData(void 0, { type: 'UNKNOWN_TYPE' }))
      .toEqual(state);
  });

  it('should load current offer', () => {
    expect(currentOfferData(state, loadCurrentOffer(offer)))
      .toEqual({
        ...state,
        currentOffer: offer,
      });
  });

  //   it('should update current offer during updating', () => {
  //     const initialState = {
  //       ...state,
  //       currentOffer: offer,
  //     };
  //     const updatedState = {
  //       ...state,
  //       currentOffer: anotherOfferSameId,
  //     };
  //     expect(currentOfferData(initialState, updateOffer(anotherOfferSameId)))
  //       .toEqual(updatedState);
  //     expect(currentOfferData(initialState, updateOffer(anotherOfferAnotherId)))
  //       .toEqual(initialState);
  //   });

  // });

  // describe('Reducer: dataCurrentOffer', () => {


  //   it('should update current offer and loaded status by load offer', () => {
  //     expect(currentOfferData(state, loadCurrentOffer(offer)))
  //       .toEqual({
  //         currentOffer: offer,
  //         currentOfferLoadingStatus: LoadingStatus.Idle,
  //       });
  //   });

  //   it('should update eror status when error loaded', () => {
  //     expect(currentOfferData(state, setCurrentOfferLoadingStatus))
  //       .toEqual({
  //         currentOffer: null,
  //         currentOfferLoadingStatus: LoadingStatus.Idle,
  //       });
  //   });


});


// const currentOfferData = createReducer(initialState, (builder) => {
//   builder
//     .addCase(loadCurrentOffer, (state, action) => {
//       state.currentOffer = action.payload;
//     })
//     .addCase(setCurrentOfferLoadingStatus, (state, action) => {
//       state.currentOfferLoadingStatus = action.payload;
//     })
//     .addCase(updateOffer, (state, action) => {
//       if (state.currentOffer !== null) {
//         state.currentOffer = updateCurrentOffer(state.currentOffer, action.payload);
//       }
//     });
// });
