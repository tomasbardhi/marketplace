import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SingleDetailPage from './routes/SingleDetailPage'
import CreatorsPage from './routes/CreatorsPage'
import CollectionsPage from './routes/CollectionsPage'
import SinglesPage from './routes/SinglesPage'
import { AppContextProvider } from "./context/AppContext"
import "./style/style.css"
import RegistrationPage from './routes/Auth/RegistrationPage'
import LoginPage from './routes/Auth/LoginPage'
import CreatorPage from './routes/CreatorPage'

const App = () => {
    return (
        <AppContextProvider>
            <div>
                <Router>
                    <Routes>
                        {/* <Route exact path="/" element={<HomePage />}></Route> */}
                        <Route exact path="/" element={<SinglesPage />} ></Route>
                        <Route exact path="/single/:id" element={<SingleDetailPage />}></Route>
                        <Route exact path="/creators" element={<CreatorsPage />}></Route>
                        <Route exact path="/collections" element={<CollectionsPage />} ></Route>
                        <Route exact path="/register" element={<RegistrationPage />} ></Route>
                        <Route exact path="/login" element={<LoginPage />} ></Route>
                        <Route exact path="/creator/:id" element={<CreatorPage/>}></Route>
                        {/* <Route exact path="/singles" element={<SinglesPage />} ></Route> */}
                    </Routes>
                </Router>
            </div>
        </AppContextProvider>
    )
}

export default App