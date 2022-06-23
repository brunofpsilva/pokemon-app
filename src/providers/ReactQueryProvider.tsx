import { QueryClient, QueryClientProvider } from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import {ReactNode} from "react";

interface ChildrenProps  {
    children?: ReactNode;
}

export function ReactQueryProvider({ children }: ChildrenProps) {

    const queryClient = new QueryClient();
    
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}