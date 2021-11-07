import React from 'react';
import Loader from '../components/screens/loader/loader';

type WithLoaderProps = {
  isLoad: boolean,
}

// eslint-disable-next-line react/display-name
const withLoader = <T,>(Component: React.ComponentType<T>): React.FC<T & WithLoaderProps> => ({
  isLoad,
  ...props
}: WithLoaderProps) =>
  (isLoad && <Component {...props as T} />) || <Loader />;


// const withLoading = <P extends object>(
//   Component: React.ComponentType<P>
// ): React.FC<P & WithLoadingProps> => ({
//   loading,
//   ...props
// }: WithLoadingProps) =>
//   loading ? <LoadingSpinner /> : <Component {...props as P} />;

export default withLoader;
