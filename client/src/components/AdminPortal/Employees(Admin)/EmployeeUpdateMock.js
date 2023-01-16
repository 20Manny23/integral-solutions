import React, { useState } from "react";
import {
  Form,
  Header,
  Divider,
  Message,
  Icon,
  Grid,
  Container,
  Button,
} from "semantic-ui-react";
import { TagsInput } from "react-tag-input-component";

import { Link } from "react-router-dom";
// add apollo graphql
import { useMutation } from "@apollo/client";
import { EDIT_TEAM_MEMBER } from "../../utils/mutations";

const EditTeamMemberForm = (props) => {
  // state logic
  // set state for alert
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [inputs, setInputs] = useState({
    id: props.id,
    name: props.name,
    email: props.email,
    phoneNumber: props.phoneNumber,
    mailingAddress: props.mailingAddress,
    pocName: props.pocName,
    pocPhoneNumber: props.pocPhoneNumber,
    pocRelationship: props.pocRelationship,
  });

  // Text Area State
  const [experience, setExperience] = useState(props.experience);
  const [familySituation, setFamilySituation] = useState(props.familySituation);
  const [notes, setNotes] = useState(props.notes);

  // Tag State
  const [skills, setSkills] = useState(props.skills);
  const [responsibilities, setResponsibilities] = useState(
    props.responsibilities
  );
  const [personalInterests, setPersonalInterests] = useState(
    props.personalInterests
  );
  const [training, setTraining] = useState(props.training);

  // Important Dates State
  const [importantDates, setImportantDates] = useState(props.importantDates);

  // add addUser mutation
  const [editTeamMember] = useMutation(EDIT_TEAM_MEMBER);

  // logic goes here
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleExperienceChange = (event) => {
    setExperience(event.target.value);
  };

  const handleFamilySituationChange = (event) => {
    setFamilySituation(event.target.value);
  };

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  const handleImportantDatesChange = (event, index) => {
    let data = [...importantDates];
    data[index][event.target.name] = event.target.value;
    setImportantDates(data);
  };

  const addImportantDate = () => {
    let object = {
      importantDate: "",
      description: "",
    };

    setImportantDates([...importantDates, object]);
  };

  const removeImportantDate = (index) => {
    let data = [...importantDates];
    data.splice(index, 1);
    setImportantDates(data);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (inputs.name) {
      try {
        // put important dates in a format that can be sent through apollo graphql
        const dates = [];
        for (let impDate of importantDates) {
          dates.push(impDate.importantDate);
          dates.push(impDate.description);
        }

        // save to the database
        // call editTeamMember mutation
        const { data } = await editTeamMember({
          variables: {
            ...inputs,
            experience,
            familySituation,
            notes,
            skills,
            responsibilities,
            personalInterests,
            training,
            dates,
          },
        });

        setErrorMessage("");
        setSuccessMessage(data?.editTeamMember.message);
      } catch (err) {
        setErrorMessage(err.message);
        setSuccessMessage("");
      }
    }
  };

  return (
    <Container>
      <Form onSubmit={handleFormSubmit}>
        <Header size="medium">Contact Info</Header>
        <Form.Group>
          <Form.Field
            label="Name:"
            name="name"
            control="input"
            type="text"
            value={inputs.name}
            onChange={handleChange}
            required
          ></Form.Field>
          <Form.Field
            label="Email:"
            name="email"
            control="input"
            type="text"
            value={inputs.email || ""}
            onChange={handleChange}
          ></Form.Field>
          <Form.Field
            label="Phone Number:"
            name="phoneNumber"
            control="input"
            type="text"
            value={inputs.phoneNumber || ""}
            onChange={handleChange}
          ></Form.Field>
          <Form.Field
            label="Mailing Address"
            name="mailingAddress"
            control="input"
            type="text"
            value={inputs.mailingAddress || ""}
            onChange={handleChange}
          ></Form.Field>
        </Form.Group>

        <Divider></Divider>

        <Header size="medium">Emergency POC</Header>
        <Form.Group>
          <Form.Field
            label="Name:"
            name="pocName"
            control="input"
            type="text"
            value={inputs.pocName || ""}
            onChange={handleChange}
          ></Form.Field>
          <Form.Field
            label="Phone Number:"
            name="pocPhoneNumber"
            control="input"
            type="text"
            value={inputs.pocPhoneNumber || ""}
            onChange={handleChange}
          ></Form.Field>
          <Form.Field
            label="Relationship:"
            name="pocRelationship"
            control="input"
            type="text"
            value={inputs.pocRelationship || ""}
            onChange={handleChange}
          ></Form.Field>
        </Form.Group>

        <Divider></Divider>

        <Header size="medium">Skills</Header>
        <TagsInput
          value={skills}
          onChange={setSkills}
          name="skills"
          placeHolder="enter skills"
        />
        <em>press enter or comma to add new tag</em>

        <Header size="medium">Responsibilities</Header>
        <TagsInput
          value={responsibilities}
          onChange={setResponsibilities}
          name="responsibilities"
          placeHolder="enter responsibilities"
        />
        <em>press enter or comma to add new tag</em>

        <Header size="medium">Training</Header>
        <TagsInput
          value={training}
          onChange={setTraining}
          name="training"
          placeHolder="enter training"
        />
        <em>press enter or comma to add new tag</em>

        <Header size="medium">Experience</Header>
        <Form.TextArea
          name="experience"
          value={experience}
          onChange={handleExperienceChange}
        />

        <Divider></Divider>
        <Header size="medium">Personal Details</Header>

        <Header size="tiny">Interests</Header>
        <TagsInput
          value={personalInterests}
          onChange={setPersonalInterests}
          name="personalInterests"
          placeHolder="enter personal interests"
        />
        <em>press enter or comma to add new tag</em>

        <Header size="tiny">Important Dates</Header>
        <Grid
          columns="three"
          stretched
          verticalAlign="middle"
          padded="vertically"
        >
          {importantDates.map((impDate, index) => {
            return (
              <Grid.Row key={index}>
                <Grid.Column>
                  <Form.Input
                    name="importantDate"
                    placeholder="Important Date"
                    onChange={(event) =>
                      handleImportantDatesChange(event, index)
                    }
                    value={impDate.importantDate}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Form.Input
                    name="description"
                    placeholder="Description"
                    onChange={(event) =>
                      handleImportantDatesChange(event, index)
                    }
                    value={impDate.description}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Form.Button
                    compact
                    negative
                    icon
                    type="button"
                    onClick={() => removeImportantDate(index)}
                  >
                    <Icon name="trash alternate outline" />
                  </Form.Button>
                </Grid.Column>
              </Grid.Row>
            );
          })}

          <Grid.Row>
            <Grid.Column width="3">
              <Form.Button
                positive
                compact
                type="button"
                onClick={addImportantDate}
              >
                <Icon name="add" />
                New Important Date
              </Form.Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Form.TextArea
          label="Family Situation"
          name="familySituation"
          value={familySituation}
          onChange={handleFamilySituationChange}
        />

        <Form.TextArea
          label="Notes"
          name="notes"
          value={notes}
          onChange={handleNotesChange}
        />

        <Divider></Divider>

        <Form.Group inline>
          <Form.Button primary center disabled={!inputs.name}>
            Submit
          </Form.Button>

          {successMessage && (
            <Message positive>
              <Message.Header>{successMessage}</Message.Header>
              <Link to="/team">
                <Button type="button" compact>
                  Return to Team
                </Button>
              </Link>
            </Message>
          )}
          {errorMessage && (
            <Message negative>
              <Message.Header>{errorMessage}</Message.Header>
            </Message>
          )}
        </Form.Group>
      </Form>
    </Container>
  );
};

export default EditTeamMemberForm;
