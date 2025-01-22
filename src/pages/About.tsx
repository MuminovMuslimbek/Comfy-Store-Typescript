import React from 'react';

const About: React.FC = () => {
    return (
        <div className="flex flex-col items-center py-20 h-full align-element">
            <h1 className="flex items-center gap-5 font-bold text-[#F8F8F2] text-4xl sm:text-6xl leading-none tracking-tight">
                We love{' '}
                <span className="bg-[#FF7AC6] px-6 py-4 rounded-2xl font-bold text-[#301C27] text-4xl tracking-widest stat-title">
                    comfy
                </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-[#F8F8F2] text-lg leading-8">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quae quam blanditiis vitae, dolor non eveniet
                ipsum voluptatibus, quia optio aut! Perferendis ipsa cumque ipsam nostrum reprehenderit ad illo sed officiis ea
                tempore! Similique eos minima sit porro, ratione aspernatur!
            </p>
        </div>
    );
};

export default About;
