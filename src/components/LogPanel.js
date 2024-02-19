import React from "react";
import { Segment, Button } from "semantic-ui-react";
import { Log } from "../services/Log";

function LogPanel({activeHosts, onActivateClick, onAddLog, logs}) {
 
  function handleActivateClick () {
    const activate = !activeHosts
    if(activate) {
      onAddLog(Log.warn('Activating all hosts!'))
    } else {
      onAddLog(Log.notify('Decommissioning all hosts.'))
    }
    onActivateClick(activate)
  }

  return (
    <Segment className="HQComps" id="logPanel">
      <pre>
        {logs.map((log, i) => (
          <p key={i} className={log.type}>
            {log.msg}
          </p>
        ))}
      </pre>
      <Button 
        fluid 
        color={activeHosts ? "green" : "red"} 
        content={activeHosts ? 'DECOMMISSION ALL' : 'ACTIVATE ALL'} 
        onClick={handleActivateClick}/>
    </Segment>
  );
}

export default LogPanel;