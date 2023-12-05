"use client"
import React from 'react';

import Category from '@/Components/Category';

const Page = () => {
    const dataForDynamicComponent = ['Memory card', 'Memory card'];
    return (
        <div>
            <Category dataForDynamicComponent={dataForDynamicComponent}></Category>
        </div>
    );
};

export default Page;