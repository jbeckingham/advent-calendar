import React, { useState, useEffect } from "react";
import { Header, Button } from "semantic-ui-react";
import Snowfall from "react-snowfall";
import { useParams } from "react-router-dom";
import Calendar from "./Calendar";
import config from "./config";
import firebaseConfig from "./config-firebase";
import firebase from "firebase";
import Password from "./Password";
import snowtree from "./snowtree.png";
require("firebase/functions");

const Home = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    var db = firebase.firestore();
    const { id } = useParams();
    const [name, setName] = useState(null);
    const [loading, setLoading] = useState(null);
    const [password, setPassword] = useState(null);
    const [correctPassword, setCorrectPassword] = useState(null);
    const [members, setMembers] = useState([]);
    const [userOpenedDoors, setUserOpenedDoors] = useState([]);

    const getUserDoorData = (userName) => {
        db.collection("doors")
            .where("name", "==", userName)
            .where("calendar_id", "==", parseInt(id))
            .get()
            .then((querySnapshot) => {
                let resultsArray = [];
                querySnapshot.forEach(function (doc) {
                    resultsArray.push(doc.data().door);
                });
                setUserOpenedDoors(resultsArray);
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    };

    const onNameSelected = (event) => {
        getUserDoorData(event.target.id);
        setName(event.target.id);
    };

    const onPasswordInputChange = (event) => {
        setPassword(event.target.value);
    };

    const onPasswordSubmit = () => {
        setLoading(true);
        var verifyPassword = firebase
            .functions()
            .httpsCallable("verifyPassword");
        verifyPassword({ password: password, id: id }).then(function (result) {
            setCorrectPassword(result.data);
            setLoading(false);
        });
    };

    const onDoorOpened = (day) => {
        if (!userOpenedDoors.includes(day)) {
            db.collection("doors")
                .add({
                    name: name,
                    calendar_id: parseInt(id),
                    door: day,
                })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                });
            getUserDoorData(name);
        }
    };

    useEffect(() => {
        var verifyPassword = firebase
            .functions()
            .httpsCallable("verifyPassword");
        verifyPassword().catch(function (error) {
            console.log("Expected this!", error);
        });
        db.collection("users")
            .where("calendar_id", "==", parseInt(id))
            .get()
            .then((querySnapshot) => {
                let newMembers = [];
                querySnapshot.forEach(function (doc) {
                    newMembers.push(doc.data().name);
                });
                setMembers(newMembers);
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    }, []);

    return (
        <>
            {id ? (
                <>
                    {correctPassword ? (
                        <>
                            {name ? (
                                <Calendar
                                    name={name}
                                    userOpenedDoors={userOpenedDoors}
                                    doors={config[id].doors}
                                    onDoorOpened={onDoorOpened}
                                    password={password}
                                    id={id}
                                />
                            ) : (
                                <div style={{ height: "calc(100vh - 190px)" }}>
                                    <Snowfall />
                                    <Header
                                        as="h1"
                                        style={{ color: "#BB2528" }}
                                    >
                                        Who are you?
                                    </Header>
                                    {members.map((name, i) => (
                                        <Button
                                            id={name}
                                            size="massive"
                                            style={{
                                                textAlign: "center",
                                                backgroundColor: "#165B33",
                                                color: "white",
                                                margin: "15px",
                                                minWidth: "130px",
                                            }}
                                            onClick={onNameSelected}
                                        >
                                            {name}
                                        </Button>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <Password
                            onChange={onPasswordInputChange}
                            onSubmit={onPasswordSubmit}
                            correctPassword={correctPassword}
                            loading={loading}
                        />
                    )}
                </>
            ) : (
                <Header as="h1" color="red">
                    No calendar id specified
                </Header>
            )}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <img
                    style={{
                        width: "150px",
                    }}
                    alt=""
                    src={snowtree}
                />
                <img
                    style={{
                        width: "150px",
                    }}
                    alt=""
                    src={snowtree}
                />
            </div>
        </>
    );
};

export default Home;
