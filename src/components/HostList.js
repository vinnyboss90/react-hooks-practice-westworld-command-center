import React from "react";
import { Card } from "semantic-ui-react";
import Host from "./Host";

function HostList({hosts, onClickHost}) {

  const allHosts = hosts.map((host) => {
    return <Host key={host.id} host={host} onClickHost={onClickHost}/>
  })

  return (
    <Card.Group itemsPerRow={6}>{allHosts}</Card.Group>
  );
}

export default HostList;