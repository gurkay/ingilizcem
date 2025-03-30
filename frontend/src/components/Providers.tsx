'use client';

import { store } from "@/app/lib/features/store";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";

function Providers({children}: {children: React.ReactNode}) {
    return(
        <SessionProvider>
            <Provider store={store}>{children}</Provider>
        </SessionProvider>
    );
}

export default Providers;