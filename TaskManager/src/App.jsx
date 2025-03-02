import "./App.css"
import Dropdown from "./components/Dropdown/Dropdown"
import DropdownItem from "./components/DropdownItem/DropdownItem";

const App = () => {
    const items = [1,2,3,4,5,6,7,8,9,0];

    return(
        <div className="App">
            <div className="content">
                <Dropdown buttonText="Task List" content={
                    <>
                        {items.map((item) => (
                            <DropdownItem key={item}>
                                {`Item ${item}`}
                            </DropdownItem>
                        ))}
                    </>
                }/>
            </div>
        </div>
    );
};

export default App;