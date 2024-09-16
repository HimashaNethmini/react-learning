import './index.css'
import { BiArchive } from "react-icons/bi";
import Search from './components/Search';
import AddAppointment from './components/AddAppointment';

function App() {
  return (
    <div className="App container mx-auto mt-3 font-semibold">
      <h1 className='text-5xl mb-3'>
        <BiArchive className='inline-block text-blue-800 align-top'/> Your Appointment </h1>
      <AddAppointment />
      <Search />
    </div>
  );
}

export default App;
