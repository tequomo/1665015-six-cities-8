import { renderHook } from '@testing-library/react-hooks';
import useMap from './use-map';
import { getFakeCity } from '../utils/mock';
import { Map } from 'leaflet';

const city = getFakeCity();

describe('Hook: useMap', () => {
  it('Should return map instance with correct ref', () => {
    const fakeRef = { current: document.createElement('div') };

    const { result } = renderHook(() =>
      useMap(fakeRef, city),
    );

    expect(result.current).toBeInstanceOf(Map);
    expect(result.current).not.toBe(null);
  });
  it('Should return null with null ref', () => {
    const fakeRef = { current: null };

    const { result } = renderHook(() =>
      useMap(fakeRef, city),
    );

    expect(result.current).toBe(null);
  });

  it('should call setView on location change', () => {
    const fakeRef = { current: document.createElement('div') };

    let fakeCity = getFakeCity();

    const { result, rerender } = renderHook(() =>
      useMap(fakeRef, fakeCity),
    );

    const mockFn = jest.fn();

    if (result.current) {
      result.current.setView = mockFn;
    }

    fakeCity = getFakeCity();
    rerender();

    expect(mockFn).toBeCalledTimes(1);
  });

});
