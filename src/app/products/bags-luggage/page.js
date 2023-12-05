"use client"
import React from 'react';

import Category from '@/Components/Category';

const Page = () => {
    const dataForDynamicComponent = ['Bags and Luggage', 'Bags & Luggage'];
    return (
        <div>
            <Category dataForDynamicComponent={dataForDynamicComponent}></Category>
        </div>
    );
};

export default Page;