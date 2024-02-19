import React from "react";
import "../stylesheets/Area.css";
import HostList from "./HostList";

function Area({ area, onClickHost }) {

    const { name, formattedName, limit, hosts} = area
    const activeHosts = hosts.filter((host) => host.active)

  return (
    <div className={"area"} id={name}>
      <h3 className="labels">
        {formattedName} | Limit: {limit}
      </h3>
      <HostList hosts={activeHosts} onClickHost={onClickHost} />
    </div>
  );
}


export default Area;