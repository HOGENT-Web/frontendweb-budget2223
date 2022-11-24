import { Routes, Route, Navigate } from 'react-router-dom';
import TransactionList from './components/transactions/TransactionList';
import TransactionForm from './components/transactions/TransactionForm';
import PlacesList from './components/places/PlacesList';
import {
  useTheme,
} from './contexts/Theme.context';
import Navbar from './components/Navbar';
import RequireAuth from './components/authentication/RequireAuth';
import AuthLanding from './components/authentication/AuthLanding';

function App() {
  const {
    theme,
    oppositeTheme,
  } = useTheme();

  return (
    <div className={`container-xl bg-${theme} text-${oppositeTheme}`}>
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate replace to="/transactions" />} />
        <Route path="/transactions">
          <Route
            index
            element={(
              <RequireAuth>
                <TransactionList />
              </RequireAuth>
            )}
          />
          <Route
            path="add"
            element={(
              <RequireAuth>
                <TransactionForm />
              </RequireAuth>
            )}
          />
          <Route
            path="edit/:id"
            element={(
              <RequireAuth>
                <TransactionForm />
              </RequireAuth>
            )}
          />
        </Route>

        <Route
          path="/places"
          element={(
            <RequireAuth>
              <PlacesList />
            </RequireAuth>
          )}
        />

        <Route path="/login" element={<AuthLanding />} />

      </Routes>
    </div>
  );
}
export default App;
