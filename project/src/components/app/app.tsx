import MainScreen from '../screens/main-screen/main-screen';

type MainProps = {
  offersCount: number;
  offersShown: number;
}

function App({offersCount, offersShown}: MainProps): JSX.Element {
  return (
    <MainScreen offersCount={offersCount} offersShown={offersShown}/>
  );
}

export default App;
