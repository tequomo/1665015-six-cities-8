import { LoadingStatus } from '../../../const';
import { CurrentOfferData } from '../../../types/state';
import { loadCurrentOffer, setCurrentOfferLoadingStatus, updateOffer } from '../../action';
import { updateCurrentOffer } from '../../../utils/utils';
import { getFakeOffer } from '../../../utils/mock';
import { currentOfferData } from './current-offer-data';

const state: CurrentOfferData = {
  currentOffer: null,
  currentOfferLoadingStatus: LoadingStatus.Idle,
};

const offer = getFakeOffer();
const anotherOfferSameId = {...offer, id: offer.id};
const anotherOfferAnotherId = {...offer, id: offer.id + 10};

describe('Reducer: currentOfferData', () => {

  it('with omit parameters should return initial state', () => {
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

  it('should update loading status when current offer is loaded or not loaded', () => {
    expect(currentOfferData(state, setCurrentOfferLoadingStatus(LoadingStatus.Succeeded)))
      .toEqual({
        ...state,
        currentOfferLoadingStatus: LoadingStatus.Succeeded,
      });
    expect(currentOfferData(state, setCurrentOfferLoadingStatus(LoadingStatus.Failed)))
      .toEqual({
        ...state,
        currentOfferLoadingStatus: LoadingStatus.Failed,
      });
  });

  it('should update current offer during updating', () => {
    const initialState = {
      ...state,
      currentOffer: offer,
    };
    const updatedState = {
      ...state,
      currentOffer: updateCurrentOffer(offer, anotherOfferSameId),
    };
    expect(currentOfferData(initialState, updateOffer(anotherOfferSameId)))
      .toEqual(updatedState);
    expect(currentOfferData(initialState, updateOffer(anotherOfferAnotherId)))
      .toEqual(initialState);
  });

});
