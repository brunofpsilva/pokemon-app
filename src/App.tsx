import React from 'react';
import './App.css';
import {CssBaseline} from "@mui/material";
import Router from "./routes";

function App() {
    return (
        <CssBaseline>
            <Router/>
        </CssBaseline>
    );
}

export default App;
