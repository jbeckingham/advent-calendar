import React, { useState, useEffect } from "react";
import { Header, Button, Input, Grid, Form } from "semantic-ui-react";
import Snowfall from "react-snowfall";

const Password = ({ onChange, onSubmit, correctPassword, loading }) => {
    return (
        <>
            <Snowfall />
            <Grid
                textAlign="center"
                style={{ height: "calc(100vh - 190px)" }}
                verticalAlign="middle"
            >
                <Grid.Row>
                    <Grid.Column>
                        <Grid textAlign="center">
                            <Grid.Row>
                                <Form onSubmit={onSubmit}>
                                    <Form.Field>
                                        <Input
                                            placeholder="Enter the password"
                                            size="massive"
                                            onChange={onChange}
                                            autoFocus
                                        />
                                    </Form.Field>
                                    {correctPassword == false && (
                                        <p style={{ color: "red" }}>
                                            Incorrect password
                                        </p>
                                    )}
                                    <Button
                                        type="submit"
                                        size="huge"
                                        primary
                                        color="red"
                                        size="massive"
                                        loading={loading}
                                    >
                                        Submit
                                    </Button>
                                </Form>
                            </Grid.Row>
                        </Grid>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </>
    );
};

export default Password;
