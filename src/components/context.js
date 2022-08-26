import {createContext , useState} from 'react';


 export const MyContext = createContext();

function AppContext({children}) {
    const[cuser,setCuser]=useState(null);
    const[fuser,setFuser]=useState(null);
   

    return(
        <MyContext.Provider value={{cuser,setCuser,fuser,setFuser}}>{children}</MyContext.Provider>
    );
}
export default AppContext;