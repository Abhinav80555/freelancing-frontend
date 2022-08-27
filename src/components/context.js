import {createContext , useState} from 'react';


 export const MyContext = createContext();

function AppContext({children}) {
    const[cuser,setCuser]=useState(null);
    const[fuser,setFuser]=useState(null);
    const [projectList, setProjectList] = useState([]);
   

    return(
        <MyContext.Provider value={{cuser,setCuser,fuser,setFuser,projectList, setProjectList}}>{children}</MyContext.Provider>
    );
}
export default AppContext;