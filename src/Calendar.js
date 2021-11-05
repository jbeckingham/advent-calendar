import React from "react";
import { Grid, GridRow, GridColumn } from "semantic-ui-react";
import Snowfall from "react-snowfall";
import Door from "./Door.js";

const Calendar = ({
    name,
    userOpenedDoors,
    doors,
    onDoorOpened,
    password,
    id,
}) => {
    return (
        <div className="calendar">
            <Snowfall />
            <Grid columns={6} doubling>
                {doors.map((door, i) => (
                    <GridColumn>
                        <Door
                            door={door}
                            userOpenedDoors={userOpenedDoors}
                            onDoorOpened={onDoorOpened}
                            password={password}
                            id={id}
                        />
                    </GridColumn>
                ))}
            </Grid>
        </div>
    );
};

export default Calendar;
