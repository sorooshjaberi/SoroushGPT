import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
const queryClient = new QueryClient();

export default function QueryProvider(props: { children: any }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      {props.children}
    </QueryClientProvider>
  );
}
