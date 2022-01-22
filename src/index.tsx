import ReactDOM from 'react-dom';
import App, {Authss} from './App';
import TopBar from './TopBar'; //todo <User />
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Link, Route, Routes, Outlet} from "react-router-dom";
import { store } from './redux/store';
import { Provider } from 'react-redux';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/app" element={<TopBar />}>
                    {/*<Route path="about" element={<About/>}/>*/}
                    <Route path="home" element={<User />}/>
                </Route>
                <Route path="/login" element={<Authss />}/>
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


function User(props: any) {
    return (
        <main style={{padding: "1rem 0"}}>
            <h2>User</h2>
        </main>
    );

}

// let invoices = [
//     {
//         name: "Santa Monica",
//         number: 1995,
//         amount: "$10,800",
//         due: "12/05/1995"
//     },
//     {
//         name: "Stankonia",
//         number: 2000,
//         amount: "$8,000",
//         due: "10/31/2000"
//     },
//     {
//         name: "Ocean Avenue",
//         number: 2003,
//         amount: "$9,500",
//         due: "07/22/2003"
//     },
//     {
//         name: "Tubthumper",
//         number: 1997,
//         amount: "$14,000",
//         due: "09/01/1997"
//     },
//     {
//         name: "Wide Open Spaces",
//         number: 1998,
//         amount: "$4,600",
//         due: "01/27/2998"
//     }
// ];

// function About() {
//     return (
//         <div style={{display: "flex"}}>
//             <nav
//                 style={{
//                     borderRight: "solid 1px",
//                     padding: "1rem"
//                 }}
//             >
//                 {invoices.map(invoice => (
//                     <Link
//                         style={{display: "block", margin: "1rem 0"}}
//                         to={`/about/${invoice.number}`}
//                         key={invoice.number}
//                     >
//                         {invoice.name}
//                     </Link>
//                 ))}
//             </nav>
//             {/*<nav>*/}
//             {/*    <Link to="/user">User</Link>*/}
//             {/*</nav>*/}
//         </div>
//     );
// }


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
