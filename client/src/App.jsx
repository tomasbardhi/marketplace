import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SingleDetailPage from './routes/SingleDetailPage'
import Home from './routes/Home'
import { AppContextProvider } from "./context/AppContext"

const App = () => {
    return (
        <AppContextProvider>
            <div>
                <Router>
                    <Routes>
                        <Route exact path="/" element={<Home />}></Route>
                        <Route exact path="/single/:id" element={<SingleDetailPage />}></Route>
                    </Routes>
                </Router>
            </div>
        </AppContextProvider>
    )
}

export default App