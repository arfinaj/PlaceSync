function AuthLayout({children}){
    return(
        <div className="min-h-screen bg-slate-950 text-white">
            <div className="mx-auto flex min-h-screen max-w-7xl">

                {/*Left Panel*/}

                <div className="hidden w-1/2 flex-col justify-center px-16 lg:flex">
                <h1 className="text-5xl font-bold">Place <span className="text-violet-500">Sync</span></h1>

                <p className="mt-6 text-xl text-gray-400">
                    Smart Placement Management System 
                </p>

                <div className="mt-12 space-y-5">
                 
            <p>✅ Resume Builder</p>

            <p>✅ AI Eligibility Screening</p>

            <p>✅ Faculty Referrals</p>

            <p>✅ WhatsApp Notifications</p>
                </div>
                </div>
                {/*Right Panel*/}
                
                <div className="flex flex-1 items-center justify-center px-6">
                    {children}
                </div>
                


            </div>
        </div>
    );
}

export default AuthLayout;