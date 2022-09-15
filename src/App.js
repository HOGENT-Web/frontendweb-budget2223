import Transaction from './components/transactions/Transaction';
import TRANSACTION_DATA from './api/mock-data'; 

function App() {
    return (
        <div>
        {TRANSACTION_DATA.map(trans => 
            <Transaction {...trans}/> )}
        </div>
    );
}
export default App;
