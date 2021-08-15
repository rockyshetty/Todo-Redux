import React, { useRef, useEffect, useState } from "react";

export default TodoForm = (props) => {
    return (
        <Form>
            <Form.Group>
                <Row>
                    <Form.Label className="col-md-4">
                        Title
                    </Form.Label>
                    <Form.Control className="col-md-8" type="text" value={props.formData.title} />
                </Row>
                {props.error.name && <Row>
                    <Form.Text className="text-muted">{props.error.title}</Form.Text>
                </Row>}
            </Form.Group>
            <Form.Group>
                <Row>
                    <Form.Label className="col-md-4">
                        Description
                    </Form.Label>
                    <Form.Control className="col-md-8" as="textarea" value={props.formData.description} />
                </Row>
                {props.error.description && <Row>
                    <Form.Text className="text-muted">{props.error.description}</Form.Text>
                </Row>}
            </Form.Group>
            <Form.Group>
                <Row>
                    <Form.Label className="col-md-4">
                        Person
                    </Form.Label>
                    <Form.Select className="col-md-8">
                        <option value="">

                        </option>
                    </Form.Select>
                </Row>
                {props.error.person && <Row>
                    <Form.Text className="text-muted">{props.error.person}</Form.Text>
                </Row>}
            </Form.Group>
            <Form.Group>
                <Row>
                    <Form.Label>
                        Start Date
                    </Form.Label>
                    <Form.Control as="date" value={props.formData.startDate} />
                </Row>
                {props.error.startDate && <Row>
                    <Form.Text className="text-muted">{props.error.startDate}</Form.Text>
                </Row>}
            </Form.Group>
            <Form.Group>
                <Row>
                    <Form.Label>
                        End Date
                    </Form.Label>
                    <Form.Control as="date" value={props.formData.endDate} />
                </Row>
                {props.error.endDate && <Row>
                    <Form.Text className="text-muted">{props.error.endDate}</Form.Text>
                </Row>}
            </Form.Group>
            <Form.Group className="row d-flex float-right" >
                <Button>
                    Clear
                </Button>
                <Button>
                    Submit
                </Button>
            </Form.Group>
        </Form>
    )
}