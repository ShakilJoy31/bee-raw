"use client"
import React from 'react';

import Category from '@/Components/Category';

const Page = () => {
    const dataForDynamicComponent = ['RGB Light', 'RGB Light'];
    return (
        <div>
            <Category dataForDynamicComponent={dataForDynamicComponent}></Category>
        </div>
    );
};

export default Page;