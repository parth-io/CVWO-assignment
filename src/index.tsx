import ReactDOM from 'react-dom';
import App from './App';
import Authenticate from './components/Authenticate'
import Guest from './components/Guest'
import Logout from './components/Logout'
import TopBar from './components/TopBar';
import MainLayout from './components/MainLayout'
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { store } from './redux/store';
import { Provider } from 'react-redux';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/app" element={<TopBar />}>
                    <Route path="home" element={<MainLayout />}/>
                </Route>
                <Route path="/guest/login" element={<Guest />}/>
                <Route path="/login" element={<Authenticate />}/>
                <Route path="/logout" element={<Logout />}/>
                <Route path="/" element={<App />}>
                    <Route
                        path="*"
                        element={
                            <main style={{ padding: "1rem" }}>
                                <p>404, there's nothing here!</p>
                            </main>
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
