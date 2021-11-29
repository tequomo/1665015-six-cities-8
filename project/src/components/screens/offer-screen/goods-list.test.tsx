import { render } from '@testing-library/react';
import { datatype } from 'faker';
import { generateFakeList } from '../../../utils/mock';
import GoodsList from './goods-list';

const GOODS_ITEMS = generateFakeList(datatype.string);

describe('Component: InteriorGallery', () => {
  it('should render correctly', () => {
    const {
      getByText,
    } = render(
      <GoodsList goods={GOODS_ITEMS}/>,
    );

    expect(getByText(/What's inside/i)).toBeInTheDocument();
  });
});
