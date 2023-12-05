"use client"
import React from 'react';

import Category from '@/Components/Category';

const Page = () => {
    const dataForDynamicComponent = ['Home and Living', 'Home And Living'];
    return (
        <div>
            <Category dataForDynamicComponent={dataForDynamicComponent}></Category>
        </div>
    );
};

export default Page;