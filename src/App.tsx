
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { AppRoutes } from './routes/routes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@rentbook/rentbook-ui-lib/microfrontend.min.css'
import toast, { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'

const queryClient = new QueryClient();
interface ToastEventDetails {
  message: string;
  type: "success" | "error" | "loading" | "custom";
}


function App() {
  useEffect(() => {
    const handleIncomingWidgetToast = (event: Event) => {
      const customEvent = event as CustomEvent<ToastEventDetails>;

      if (!customEvent.detail) return;

      const { message, type } = customEvent.detail;
      
      // 2. Map dynamic variant invocations to react-hot-toast actions safely
      if (type === "success") {
        toast.success(message);
      } else if (type === "error") {
        toast.error(message);
      } else if (type === "loading") {
        toast.loading(message);
      } else {
        toast(message); // Fallback standard message variant
      }
    };

    window.addEventListener("app-toast-notification", handleIncomingWidgetToast);

    return () => {
      window.removeEventListener("app-toast-notification", handleIncomingWidgetToast);
    };
  }, []);
  return (
    <>
      <QueryClientProvider client={queryClient} >
        <BrowserRouter>
          <AppRoutes />
          <Toaster position="top-right" reverseOrder={false} />
        </BrowserRouter>

      </QueryClientProvider>

    </>
  )
}

export default App
