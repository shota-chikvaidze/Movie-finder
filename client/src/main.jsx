import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ScrollToTop from './components/ScrollToTop/ScrollToTop.jsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
        <QueryClientProvider client={queryClient} >
            <Router>
                <ScrollToTop />

                <App />
            </Router>
        </QueryClientProvider>
)
