import React, {useState, useEffect} from "react";
import { Segment } from "semantic-ui-react";
import "../stylesheets/App.css";
import WestworldMap from "./WestworldMap";
import Headquarters from "./Headquarters";


function App() {

  const [hosts, setHosts] = useState([])
  const [areas, setAreas] = useState([])
  const [clickedHostId, setClickedHostId] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3001/hosts')
      .then((resp) => resp.json())
      .then((hosts) => {
        const formattedHostAreas = hosts.map((host) => {
          const formattedAreaName = host.area
            .split('_')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
          return { ...host, formattedArea: formattedAreaName };
        });
        setHosts(formattedHostAreas);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:3001/areas')
    .then((resp) => resp.json())
    .then((areas) => {
      const formattedAreas = areas.map((area) => {
        const formattedAreaName = area.name
          .split('_')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        return { ...area, formattedName: formattedAreaName };
      });
      setAreas(formattedAreas);
    });
}, []);

function handleSelectedHost(host) {
  setClickedHostId(host.id)
}
function handleUpdateHost(updatedHost) {
  const udpatedHosts = hosts.map((host) =>
    host.id === updatedHost.id ? updatedHost : host
  );
  setHosts(udpatedHosts);
}

function handleActivateClick(activate) {
  const updatedHosts = hosts.map((host) => ({
    ...host, 
    active: activate
  }))
  setHosts(updatedHosts)
}

const hostsToAreas = areas.map((area) => ({
  ...area, 
  hosts: hosts.filter((host) => host.area === area.name)
}))

const formattedSelectedHosts = hosts.map((host) => ({
  ...host, 
  selected: host.id === clickedHostId
}))

const selectedHost = hosts.find((host) => host.id === clickedHostId)
const inactiveHosts = formattedSelectedHosts.filter((host) => !host.active)
const activeHosts = formattedSelectedHosts.length === formattedSelectedHosts.filter((host) => host.active).length

  return (
    <Segment id="app">
      <WestworldMap 
        areas={hostsToAreas}
        onClickHost={handleSelectedHost}
      />
      <Headquarters 
        hosts={inactiveHosts} 
        onClickHost={handleSelectedHost}
        selectedHost={selectedHost}
        areas={hostsToAreas}
        onUpdateHost={handleUpdateHost}
        activeHosts={activeHosts}
        onActivateClick={handleActivateClick}
      />
    </Segment>
  );
}

export default App;