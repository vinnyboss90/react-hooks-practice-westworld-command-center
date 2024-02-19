import React from "react";
import { Segment } from "semantic-ui-react";
import Area from "./Area";

function WestworldMap({ areas, onClickHost }) {

  const areaLists = areas.map((area) => {
    return <Area area={area} key={area.id} onClickHost={onClickHost} />
  })
  return <Segment id="map">{areaLists}</Segment>;
}

export default WestworldMap;