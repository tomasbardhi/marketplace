import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SingleDetailPage from './routes/SingleDetailPage'
import CreatorsPage from './routes/CreatorsPage'
import CollectionsPage from './routes/CollectionsPage'
import SinglesPage from './routes/SinglesPage'
import RegistrationPage from './routes/RegistrationPage'
import LoginPage from './routes/LoginPage'
import CreatorDetailPage from './routes/CreatorDetailPage'
import { AppContextProvider } from "./context/AppContext"
import { SingleListContextProvider } from "./context/SinglesListContext"
import "./style/style.css"

const App = () => {
    return (
        <AppContextProvider>
            <SingleListContextProvider>
            <div>
                <Router>
                    <Routes>
                        <Route exact path="/" element={<SinglesPage />} ></Route>
                        <Route exact path="/single/:id" element={<SingleDetailPage />}></Route>
                        <Route exact path="/creators" element={<CreatorsPage />}></Route>
                        <Route exact path="/collections" element={<CollectionsPage />} ></Route>
                        <Route exact path="/register" element={<RegistrationPage />} ></Route>
                        <Route exact path="/login" element={<LoginPage />} ></Route>
                        <Route exact path="/creator/:id" element={<CreatorDetailPage/>}></Route>
                    </Routes>
                </Router>
            </div>
            </SingleListContextProvider>
        </AppContextProvider>
    )
}

export default App