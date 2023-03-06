import React from 'react';

const Loading = () => {
    return (
        <div className='flex justify-center'>
            <div className="w-8 h-8 rounded-full animate-spin border-[5px] border-solid border-yellow-400 border-t-transparent shadow-md"></div>
        </div>
    );
};

export default Loading;