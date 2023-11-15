import './App.css';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';
import{ApolloClient, InMemoryCache, ApolloProvider, createHttpLink} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
const

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
