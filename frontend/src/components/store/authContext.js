import { createContext  , useState} from "react";

const AuthContext= createContext();

const AuthProvider= ({children})=>{

    const [domainData,setDomainData]= useState([])


    return (
        <AuthContext.Provider value={{domainData,setDomainData}}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider ,AuthContext};