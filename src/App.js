import "./index.css";
import { BiArchive } from "react-icons/bi";
import Search from "./components/Search";
import AddAppointment from "./components/AddAppointment";
import AppointmentInfo from "./components/AppointmentInfo";
import { useCallback, useState, useEffect } from "react";

function App() {
  let [appointmentList, setAppointmentList] = useState([]);

  const fetchData = useCallback(() => {
    fetch("./data.json")
      .then((response) => response.json())
      .then((data) => {
        setAppointmentList(data);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="App container mx-auto mt-3 font-semibold">
      <h1 className="text-5xl mb-3">
        <BiArchive className="inline-block text-blue-800 align-top" /> Your
        Appointment{" "}
      </h1>
      <AddAppointment />
      <Search />

      {/* mapping the data json file */}
      <ul className="divide-y divide-gray-200">
        {appointmentList
          .map(data => (
          <AppointmentInfo key={data.id} data={data} />
        ))}
      </ul>
    </div>
  );
}

export default App;
