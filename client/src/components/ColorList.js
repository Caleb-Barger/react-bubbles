import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import { Form, FormGroup, Label, Input, Col, Button } from 'reactstrap'

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, getColors }) => {
  // console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(initialColor)

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log(res.data)
        let colorsClone = [...colors]
        colorsClone.forEach(color => {
          if (color.id === res.data.id) {
            color = res.data
          }
        })
        updateColors(colorsClone)
        getColors()
      })
      .catch(err => console.log(err))
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`, colorToEdit)
      .then(res => {
        colors.filter(item => {
          return item.id !== color.id
        })
      })
    updateColors(colors)
    getColors()
  };

  const addNewColor = e => {
    e.preventDefault()
    // setNewColor({ ...newColor, id: shortid.generate() })
    console.log(newColor)
    axiosWithAuth()
      .post('/api/colors', newColor)
      .then(res => {
        updateColors(res.data)
        getColors()
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <div className="colors-wrap">
        <p>colors</p>
        <ul>
          {colors.map(color => (
            <li key={color.color} onClick={() => editColor(color)}>
              <span>
                <span className="delete" onClick={e => {
                  e.stopPropagation();
                  deleteColor(color)
                }
                }>
                  x
              </span>{" "}
                {color.color}
              </span>
              <div
                className="color-box"
                style={{ backgroundColor: color.code.hex }}
              />
            </li>
          ))}
        </ul>
        {editing && (
          <form onSubmit={saveEdit}>
            <legend>edit color</legend>
            <label>
              color name:
            <input
                onChange={e =>
                  setColorToEdit({ ...colorToEdit, color: e.target.value })
                }
                value={colorToEdit.color}
              />
            </label>
            <label>
              hex code:
            <input
                onChange={e =>
                  setColorToEdit({
                    ...colorToEdit,
                    code: { hex: e.target.value }
                  })
                }
                value={colorToEdit.code.hex}
              />
            </label>
            <div className="button-row">
              <button type="submit">save</button>
              <button onClick={() => setEditing(false)}>cancel</button>
            </div>
          </form>
        )}
        {/* stretch - build another form here to add a color */}
      </div>
      <Form onSubmit={addNewColor} className="add-color">
        <FormGroup row>
          <Label sm={3}>Color Name:</Label>
          <Col sm={9}>

            <Input
              type="text"
              value={newColor.color}
              onChange={e =>
                setNewColor({
                  ...newColor,
                  color: e.target.value
                })}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={3}>Color Code:</Label>
          <Col sm={9}>
            <Input
              type="text"
              value={newColor.code.hex}
              onChange={e =>
                setNewColor({
                  ...newColor,
                  code: { hex: e.target.value }
                })}
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button outline>New Color!</Button>
          </Col>
        </FormGroup>
      </Form>
    </>
  );
};

export default ColorList;
