import styled from 'styled-components';
import Login from '../componentes/Login/index';


const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(90deg, #002F52 10%, #326589);
`

function Home() {
  return (
    <AppContainer>
      <Login/>
    </AppContainer>
  );
}

export default Home;
