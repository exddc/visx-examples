import './App.css';
import { BasicLineChart } from './components/basicLineChart';
import { BasicBarChart } from './components/basicBarChart';

function App() {
    const width = 800;
    const height = 500;

    return (
        <div className="App">
            <h1>Visx Examples</h1>
            <div>
                <h2>Basic Line Chart</h2>
                <BasicLineChart width={width} height={height} />
            </div>
            <div>
                <h2>Basic Bar Chart</h2>
                <BasicBarChart width={width} height={height} />
            </div>
        </div>
    );
}

export default App;
