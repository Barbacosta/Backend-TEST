import "./App.css"
import Dropdown from "./components/Dropdown/Dropdown"

const App = () => {
    const items = [1,2,3,4,5,6,7,8,9,0];

    return(
        <div className="App">
            <div className="content"><Dropdown buttonText="Dropdown Button" content={<p>Hello World</p>}/>
            </div>
        </div>
    );
};

export default App;