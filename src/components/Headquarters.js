import React, {useState} from "react";
import { Grid } from "semantic-ui-react";
import Details from "./Details";
import "../stylesheets/Headquarters.css";
import ColdStorage from "./ColdStorage";
import LogPanel from "./LogPanel"

function Headquarters({
  hosts, 
  onClickHost, 
  selectedHost, 
  areas, 
  onUpdateHost, 
  activeHosts, 
  onActivateClick
}) {

  const [logs, setLogs] = useState([])

  function handleAddLog(log) {
    setLogs([log, ...logs])
  }

  return (
    <Grid celled="internally">
      <Grid.Column width={8}>
        <ColdStorage 
          hosts={hosts} 
          onClickHost={onClickHost}/>
      </Grid.Column>
      <Grid.Column width={5}>
        <Details  
          areas={areas} 
          host={selectedHost}
          onUpdateHost={onUpdateHost}
          onAddLog={handleAddLog}
          />
      </Grid.Column>
      <Grid.Column width={3}>
        <LogPanel 
          logs={logs}
          activeHosts={activeHosts}
          onAddLog={handleAddLog}
          onActivateClick = {onActivateClick}
        />
      </Grid.Column>
    </Grid>
  );
}

export default Headquarters;