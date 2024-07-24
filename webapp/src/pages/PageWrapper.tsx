import React from "react";
import Header from "../components/Header/Header";

interface PageWrapperProps {
    children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
}

const links = [
    { label: 'Home', url: '/' },
    { label: 'Products', url: '/products' }
];

const PageWrapper = (props: PageWrapperProps) => (
    <div className="flex flex-col min-h-screen">
        <div className="sticky top-0 z-10">
            <Header links={links} />
        </div>
        <main className="flex-grow overflow-auto">
            <div className="flex flex-col items-center justify-center p-4">
                <span className="text-9xl text-white">MARZ VFX</span>
                {props.children}
            </div>
        </main>
    </div>
);

export default PageWrapper;