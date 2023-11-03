import { useState } from 'react';

import { createContainer } from 'unstated-next';

function useUserStore () {
    const [user, setUser] = useState(null); 
    return {user, setUser}; 
}
export const UserStore = createContainer(useUserStore);