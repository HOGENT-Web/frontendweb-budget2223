import { Routes, Route, Navigate } from 'react-router-dom';
import TransactionList from './components/transactions/TransactionList';
import TransactionForm from './components/transactions/TransactionForm';
import PlacesList from './components/places/PlacesList';
import {
    useTheme,
} from './contexts/Theme.context';
import Navbar from './components/Navbar';

function App() {
    const {
        theme,
        oppositeTheme,
    } = useTheme();

    return (
        <div className={`container-xl bg-${theme} text-${oppositeTheme}`}>
            <Navbar />
            
            <Routes>
                <Route path="/" element={<Navigate to="/transactions" />} />
                <Route path="/transactions" element={<TransactionList />} />
                <Route path="/transactions/add" element={<TransactionForm />} />
                <Route path="/transactions/edit/:id" element={<TransactionForm />} />
                <Route path="/places" element={<PlacesList />} />
            </Routes>
        </div>
    );
}
export default App;