import './App.css';
import { ChakraProvider } from "@chakra-ui/react";
import Aside from './assets/components/Aside';
import Main from './assets/components/Main';
import Basic from './assets/components/Basic';

function App() {
  return (
  <ChakraProvider>
    <div id='app'>
      <Aside></Aside>

      <Main></Main>
    </div>
  </ChakraProvider>
  );
}

export default App;