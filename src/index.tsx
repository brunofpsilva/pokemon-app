import React from 'react';
import ReactDOM from 'react-dom/client';
import {HelmetProvider} from 'react-helmet-async';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ReactQueryProvider} from "./providers/ReactQueryProvider";
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <HelmetProvider>
        <ReactQueryProvider>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </ReactQueryProvider>
    </HelmetProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
