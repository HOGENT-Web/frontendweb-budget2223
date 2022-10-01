import TransactionList from './components/transactions/TransactionList';
import PlacesList from './components/places/PlacesList';
import { ThemeContext, themes } from './contexts/Theme.context';
import { IoMoonSharp, IoSunny } from 'react-icons/io5';
import { useContext } from 'react';

function App() {
    const { theme, oppositeTheme, toggleTheme } = useContext(ThemeContext);

    return (
        <div className={`container-xl bg-${theme} text-${oppositeTheme}`}>
            <button type="button" onClick={toggleTheme}>
                {theme === themes.dark ?
                    <IoMoonSharp /> :
                    <IoSunny />}
            </button>
            <TransactionList />
            <PlacesList />
        </div>
    );
}
export default App;
