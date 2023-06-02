import { store } from "./store";

import Login from "./pages/Login";
import Messaging from "./pages/Messaging";

function App() {
  const [state] = store.useState("auth");

  return !state.host ? <Login /> : <Messaging />;
}

export default App;
