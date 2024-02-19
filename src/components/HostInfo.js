import React from "react";
import {
  Radio,
  Icon,
  Card,
  Grid,
  Image,
  Dropdown,
  Divider,
} from "semantic-ui-react";
import { Log } from "../services/Log";
import "../stylesheets/HostInfo.css";

function HostInfo({host, areas, onUpdateHost, onAddLog}) {

  function handleOptionChange(e, {value}) {
    const newArea = areas.find((area) => area.name === value)
    if (newArea.hosts.length < newArea.limit) {
      fetch (`http://localhost:3001/hosts/${host.id}`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          ...host, 
          area: newArea.name
        })
      })
      .then(resp => resp.json())
      .then((updatedHost) => {
        onUpdateHost(updatedHost)
        onAddLog(Log.notify(`${firstName} set in area ${newArea.formattedName}`))
      })
    } else {
      onAddLog(Log.error(`Too many hosts. Cannot add ${firstName} to ${newArea.formattedName}`))
    }
  }

  function handleRadioChange(e, {checked}) {
    fetch (`http://localhost:3001/hosts/${host.id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        ...host, 
        active: checked
      })
    })
    .then(resp => resp.json())
    .then((updatedHost) => {
      onUpdateHost(updatedHost)
      if (checked) {
        onAddLog(Log.warn(`Activated ${host.firstName}`))
      } else {
        onAddLog (Log.notify(`Decommissioned ${host.firstName}`))
      }
    })
  }

  const { firstName, gender, active, area, imageUrl } = host
  const options = areas.map ((area) => ({
   key: area.id,
   text: area.formattedName, 
   value: area.name
  }))

 
  return (
    <Grid>
      <Grid.Column width={6}>
        <Image
          src={imageUrl}
          floated="left"
          size="small"
          className="hostImg"
        />
      </Grid.Column>
      <Grid.Column width={10}>
        <Card>
          <Card.Content>
            <Card.Header>
              {firstName} | {' '}
              {gender === 'Male' ? <Icon name="man" /> : <Icon name="woman" />}
            </Card.Header>
            <Card.Meta>
              <Radio
                onChange={handleRadioChange}
                label={active ? "Active" : "Decommissioned"}
                checked={active}
                slider
              />
            </Card.Meta>
            <Divider />
            Current Area:
            <Dropdown
              onChange={handleOptionChange}
              value={area}
              options={options}
              selection
            />
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid>
  );
}

export default HostInfo;