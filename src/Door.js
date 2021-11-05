import React from "react";
import { Button, Modal, Image, Header } from "semantic-ui-react";
import "./App.css";

const exampleReducer = (state, action) => {
    switch (action.type) {
        case "OPEN_MODAL":
            return { open: true, dimmer: action.dimmer };
        case "CLOSE_MODAL":
            return { open: false };
        default:
            throw new Error();
    }
};

const canOpenDoor = (day) => {
    let newDate = new Date();
    let date = newDate.getDate();
    return day <= date;
};

const Door = ({ door, userOpenedDoors, onDoorOpened, password, id }) => {
    const [state, dispatch] = React.useReducer(exampleReducer, {
        open: false,
        dimmer: undefined,
    });
    const { open, dimmer } = state;

    const alreadyOpened = userOpenedDoors.includes(door.day);
    const showPhoto = door.photo && alreadyOpened;
    const imageLocation = id + "/" + door.photo;
    const imageUrl =
        "https://us-central1-advent-calendar-1e118.cloudfunctions.net/getImage?password=" +
        password +
        "&image=" +
        imageLocation +
        "&id=" +
        id;

    return (
        <div>
            <Button
                id={door}
                style={{
                    width: "120px",
                    height: "100px",
                    backgroundColor: "#165B33",
                    color: "white",
                }}
                disabled={!canOpenDoor(door.day)}
                onClick={() => {
                    onDoorOpened(door.day);
                    dispatch({ type: "OPEN_MODAL", dimmer: "blurring" });
                }}
            >
                {showPhoto ? (
                    <Image
                        style={{
                            width: "100px",
                            height: "80px",
                        }}
                        src={imageUrl}
                        rounded
                    />
                ) : (
                    <>{door.day}</>
                )}
            </Button>

            <Modal
                dimmer={dimmer}
                open={open}
                className="door_modal"
                style={{ width: "fit-content" }}
                onClose={() => dispatch({ type: "CLOSE_MODAL" })}
            >
                <Modal.Content style={{ background: "#6d1f02" }}>
                    {door.desc && (
                        <Header
                            as="h2"
                            style={{ textAlign: "center", color: "white" }}
                        >
                            {door.desc}
                        </Header>
                    )}
                    <img
                        alt=""
                        style={{ maxWidth: "400px", minHeight: "300px" }}
                        src={imageUrl}
                    ></img>
                </Modal.Content>
            </Modal>
        </div>
    );
};

export default Door;
