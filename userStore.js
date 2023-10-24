import { createContainer } from "unstated-next";
import {useState} from 'react';

function useUserStore () {
    const [user, setUser] = useState(null); 
    console.log(user);
    return {user, setUser}; 
}
export const UserStore = createContainer(useUserStore);