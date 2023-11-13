import { useState } from 'react';

import { createContainer } from 'unstated-next';

function useUserStore () {
    const [user, setUser] = useState([]); 
    return {user, setUser}; 
}
export const UserStore = createContainer(useUserStore);


function useProductStore () {
    const [products, setProducts] = useState([]); 
    return {products, setProducts}; 
}
export const ProductsStore = createContainer(useProductStore);