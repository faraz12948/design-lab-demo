import React, { useState, useEffect } from 'react';
import { fabric } from 'fabric';
import tImg from './img/tImg.png';
import logo from './img/batman.png';
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import './App.css';
const App = () => {
  const [objects, setObjects] = useState({});
  const [text, setText] = useState('');
  const [textColor, setTextColor] = useState("#000000");
  const [color, setColor] = useState(null);
  // const [image, setImage] = useState('');
  const { selectedObjects, editor, onReady } = useFabricJSEditor();
  const [imgURL, setImgURL] = useState('https://cdn.dribbble.com/users/24078/screenshots/15522433/media/e92e58ec9d338a234945ae3d3ffd5be3.jpg?compress=1&resize=400x300');
  const changeTcolor = (e, clr) => {

    document.getElementById("tshirt-backgroundpicture").style.backgroundColor = clr;
    setColor(clr);

  }
  useEffect(() => {
    console.log(editor?.canvas.toObject);
    initCanvas();
  }, [])
  const initCanvas = () => {
    editor?.canvas.setWidth(200);
    editor?.canvas.setHeight(400);
  }
  const addImg = (e, url) => {

    e.preventDefault();
    fabric.Image.fromURL(url, function (oImg) {
      editor?.canvas.setWidth(200);
      editor?.canvas.setHeight(400);
      editor?.canvas.add(oImg);
      const obj = editor?.canvas.getObjects();
      obj?.forEach((o) => {
        if (o.type === "image") {
          o.scaleToHeight(100);
          o.scaleToHeight(100);
        }
      });
      editor?.canvas.centerObject(oImg);
      setObjects(editor?.canvas.getObjects());
      console.log(objects);


    });




    // setImgURL('');

  }
  const onAddCircle = () => {
    editor.addCircle();
  };
  const onAddRectangle = () => {
    editor.addRectangle();
  };

  useEffect(() => {

    // console.log(textColor);
    const obj = editor?.canvas.getObjects();
    // console.log(obj);
    obj?.forEach((o) => {

      if (o.type === "textbox") {
        editor?.canvas.getActiveObject().set("fill", textColor);
        editor?.canvas.renderAll();
      }
    });



  }, textColor);
  const deleteObject = () => {
    editor?.canvas.getActiveObjects().forEach((object) => {
      editor?.canvas.remove(object);
    });

  }



  const addText = (e, text) => {
    e.preventDefault();

    try {
      editor?.canvas.add(
        new fabric.Textbox(text, {
          fill: textColor,
          fontSize: 20,
          fontFamily: "Arial",
          fontWeight: "bold",
          textAlign: "center",
          name: "text",
        })
      );
      editor?.canvas.renderAll();
    } catch (error) {
      console.log(error);
    }

    setText('');
    // setObjects(editor?.canvas.getObjects());
    // console.log(objects);

  }
  const getObj = () => {
    if (objects) {
      objects.forEach((ob) => {
        console.log(ob);
        editor?.canvas.add(ob);
        editor?.canvas.renderAll();
      })

    }


  }









  return (
    <div>

      <div id="tshirt-div">

        <img id="tshirt-backgroundpicture" src={tImg} />



      </div>

      <div id="drawingArea" class="drawing-area">
        <div class="canvas-container">
          <FabricJSCanvas id="canvas" onReady={onReady} />
        </div>
      </div>


      <div>


        <br />
        <label for="tshirt-design">T-Shirt Design:</label>
        <select id="tshirt-design">
          <option value="">Select one of our designs ...</option>
          <option value={logo}>Batman</option>
        </select>
        <br />
        <button onClick={deleteObject}>Delete selected item</button>

        <br />
        <div className='add-text'>
          <form onSubmit={e => addText(e, text)}>
            <input
              type="text"
              value={text}
              onChange={e => setText(e.target.value)}
            >

            </input>
            <button type="submit">Add Text</button>
          </form>
          <label for="text-color">Text Color:</label>
          <select id="text-color" onChange={e => setTextColor(e.target.value)}>

            <option value="#ffffff">White</option>
            <option value="#000000">Black</option>
            <option value="#f00000">Red</option>
            <option value="#008000">Green</option>
            <option value="#ff0000">Yellow</option>
          </select>
        </div>
        <div>
          <button onClick={onAddCircle}>Add circle</button>
          <button onClick={onAddRectangle}>Add Rectangle</button>
          <button onClick={getObj}>Add objects</button>
        </div>
        <label for="tshirt-color">T-Shirt Color:</label>
        <select id="tshirt-color" onChange={e => changeTcolor(e, e.target.value)}>

          <option value="#fff">White</option>
          <option value="#000">Black</option>
          <option value="#f00">Red</option>
          <option value="#008000">Green</option>
          <option value="#ff0">Yellow</option>
        </select>

        <br />
        <label for="tshirt-custompicture">Upload your own design:</label>

        <form onSubmit={e => addImg(e, imgURL)}>
          <div>
            <input
              type="text"
              value={imgURL}
              onChange={e => setImgURL(e.target.value)}
            />
            <button type="submit">Add Image</button>
          </div>
        </form>
      </div>















    </div>
  );
}
export default App;
