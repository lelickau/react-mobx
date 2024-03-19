import { RootStoreContext } from './context/root-store-context'
import Todos from './pages/Todos'
import RootStore from './store/roote-store'

function App() {
  return (
    <RootStoreContext.Provider value={new RootStore()}>
      <Todos />
    </RootStoreContext.Provider>
  )
}

export default App
