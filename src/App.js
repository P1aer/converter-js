import {MainPage} from "./components/main-page";
import {AuthPage} from "./components/auth page";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import React, {useEffect} from "react";
import {useSelector} from "react-redux";

function App() {
    const user = useSelector(state => state.user.data)
  return (
    <div className="App">
        <Router>
            {
                user ?
                    <Routes>
                        <Route path={'/main'} element={   <MainPage name={user.email} id={user.id}/>}/>
                        <Route
                            path="*"
                            element={<Navigate to="/main" />}
                        />
                    </Routes>
                    :
                    <Routes>
                        <Route path={'/'} element={ <AuthPage/>}/>
                        <Route
                            path="*"
                            element={<Navigate to="/" />}
                        />
                    </Routes>

            }
        </Router>

    </div>
  );
}

export default App;
