import React from "react";
import { useState, useContext } from "react";
// app
// p5
import { Menu } from "../components/menu";
import P5Wrapper from "../components/P5Wrapper";
import P5Manager from "../components/P5Manager";
import { P5DispatchContext, P5StateContext } from "../components/P5Manager";
import { MenuButton } from "../components/menuButton";

const Artwork_wrapper = P5Wrapper("my artwork");
const Button_refresh = P5Wrapper("refresh");

const ArtWork = () => (
  <>
    <P5Manager>
      <div style={{ position: "absolute" }}>
        <ComponentBuffer comp={Artwork_wrapper} />
      </div>
      <div style={{ position: "absolute" }}>
        <Menu></Menu>
        <MenuButton comp={Button_refresh} label="REFRESH" what="add_x" />
      </div>
    </P5Manager>
  </>
);

export default ArtWork;

let buf = {
  value: 0,
};

function ComponentBuffer(props) {
  const { x } = useContext(P5StateContext);
  const [state_data, set_data] = useState(buf);
  if (x !== state_data.value) {
    buf.value = x;
    set_data(buf);
  }

  return (
    <props.comp sketch={my_sketch_background} data={state_data}></props.comp>
  );
}

/**
 *
 * P5JS / PROCESSING SKETCH
 *
 */
function my_sketch_background(p5) {
  let ref = -1;
  let bg_color;
  let shape_color;
  let size = p5.createVector(0, 0);
  let pos = p5.createVector(0, 0);
  let angle = 0;
  p5.setup = function () {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.windowResized = () => {
      p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    };
    bg_color = p5.color(p5.random(255), p5.random(255), p5.random(255));
    set_shape();
  };

  p5.draw = function () {
    p5.noStroke();
    let new_ref = p5.data.value;
    if (ref !== new_ref) {
      bg_color = p5.color(p5.random(255), p5.random(255), p5.random(255));
      set_shape();
      ref = new_ref;
    }

    p5.background(bg_color);
    p5.fill(shape_color);
    p5.push();
    p5.translate(p5.width / 2, p5.height / 2);
    p5.push();
    p5.rotate(angle);
    // p5.rotate(p5.map(p5.mouseX, 0, p5.width, 0, p5.TAU));
    p5.translate(-size.x / 2, -size.y / 2);

    p5.rect(0, 0, size.x, size.y);
    p5.pop();
  };

  // MES FUNCTION
  function set_shape() {
    shape_color = p5.color(p5.random(255), p5.random(255), p5.random(255));
    size.set(
      p5.random(p5.width / 20, p5.width * 2),
      p5.random(p5.height / 20, p5.height * 2)
    );
    pos.set(p5.width / 2 - size.x / 2, p5.height / 2 - size.y / 2);
    angle = p5.random(p5.TAU);
  }
}
