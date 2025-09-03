import { useState } from 'react'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import User from "./routes/User/User.jsx";
import Admin from './routes/Admin/Admin.jsx';
function App() {
    return <>
    	<Provider store={store}>
            <User/> 
       <Admin/>
        </Provider>
       
    </>
}
export default App
