import React from 'react';
import Navbar from '../components/Navbar';
import SupportBox from '../components/SupportBox';
import Footer from '../components/Footer';

const SupportPage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-amber-600">
            <Navbar />

            <div className="h-64 w-full flex flex-col justify-center items-center m-0 p-20 bg-white">
                <h1 className="text-3xl font-bold text-amber-300 mb-4">Yap Center</h1>
                <input className="p-2 border-2 w-100 border-amber-300 rounded-md" placeholder="Search" />
            </div>

            <div className="bg-amber-400 m-0 p-20">
                <h1 className="text-3xl font-bold text-white mb-4 flex flex-col justify-center items-center">Need Help? We've got you covered.</h1>
                <div className='flex flex-wrap justify-center gap-10 m-10'>
                    <SupportBox page="/updates" title="Latest Updates" desc="Check out what's new on YapYap!"/>
                    <SupportBox page="/faq" title="FAQ" desc="Find answers to common questions."/>
                    <SupportBox page="/contact" title="Contact" desc="Reach out to our team anytime."/>
                    <SupportBox page="/feedback" title="Feedback" desc="Share your thoughts with us."/>
                </div>
            </div>

            <Footer />
        </div>
    );
};


export default SupportPage;
