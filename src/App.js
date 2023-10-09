import {createBrowserRouter ,RouterProvider} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import NotFound from './components/NotFound/NotFound';
import Note from './components/Note/Note';
import Search from './components/Search/Search';
import Login from './components/Login/Login';
import UserContextProvider from './Context/UserContext';
import NoteContextProvider from './Context/NoteContext';

export default function App() {
  
  const route =  createBrowserRouter([
    {path:'', element:<ProtectedRoute><Layout/></ProtectedRoute> , children:[
      {path:'login' , element:<Login/> },
      {path:'signup' , element:<Register/> },
      {path:'*' , element:<NotFound/> },
      {path:'' , index:true, element:<ProtectedRoute><Home/></ProtectedRoute> },
      {path:'note' , index:true, element:<ProtectedRoute><Note/></ProtectedRoute> },
      {path:'search' , index:true, element:<ProtectedRoute><Search/></ProtectedRoute> },
    ]}
  ]);

  return <>
    <UserContextProvider>
     <NoteContextProvider>
       <RouterProvider router={route}></RouterProvider>
     </NoteContextProvider>
    </UserContextProvider>
  </>

}

