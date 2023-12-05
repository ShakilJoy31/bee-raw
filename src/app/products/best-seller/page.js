"use client"
import React from 'react';

import Category from '@/Components/Category';

const Page = () => {
    const dataForDynamicComponent = ['Best seller', 'Top Sold Products'];
    return (
        <div>
            <Category dataForDynamicComponent={dataForDynamicComponent}></Category>
        </div>
    );
};

export default Page;