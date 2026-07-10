
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { AppRoutes } from './routes/routes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@rentbook/rentbook-ui-lib/microfrontend.min.css'

const queryClient = new QueryClient();

function App() {

  return (
    <>
      <QueryClientProvider client={queryClient} >
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>

      </QueryClientProvider>

    </>
  )
}

export default App
