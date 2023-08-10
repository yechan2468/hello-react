import { useState } from "react";
import ReactSlider from "react-slider";

function Button({
  value,
  handle_click,
}: {
  value: string;
  handle_click: () => void;
}) {
  return (
    <button className="square" onClick={handle_click}>
      {value}
    </button>
  );
}

export default function Calculator() {
  const [result, set_result] = useState(["　", "　"]);
  const [calculated, set_calculated] = useState(true);
  const [speed, set_speed] = useState(0);

  function init() {
    const new_result = result.slice();
    new_result[0] = "　";
    new_result[1] = "　";
    set_result(new_result);
    set_calculated(true);
  }

  function on_digit_click(
    digit: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
  ) {
    const new_result = result.slice();
    if (new_result[1] === "　") {
      new_result[1] = digit;
      set_result(new_result);
      return;
    }
    new_result[1] += digit;
    set_result(new_result);
  }
  function on_operator_click(operator: "+" | "-" | "*" | "/") {
    const new_result = result.slice();
    if (new_result[1] === "　") {
      return;
    }
    if (new_result[0].startsWith("　")) {
      new_result[0] = new_result[0].substring(1);
    }
    new_result[0] =
      (calculated ? "" : new_result[0]) + new_result[1] + " " + operator + " ";
    new_result[1] = "　";
    set_result(new_result);
    set_calculated(false);
    return;
  }

  function on_delete_click() {
    const new_result = result.slice();
    if (new_result[1].length <= 1) {
      new_result[1] = "　";
      set_result(new_result);
      return;
    }
    new_result[1] = new_result[1].substring(0, new_result[1].length - 1);
    set_result(new_result);
  }
  function on_point_click() {
    const new_result = result.slice();
    if (new_result[1] === "　") {
      new_result[1] = "0.";
      set_result(new_result);
      return;
    }
    if (new_result[1].includes(".")) {
      return;
    }
    new_result[1] += ".";
    set_result(new_result);
  }
  function on_percentage_sign_click() {
    const new_result = result.slice();
    if (new_result[1] === "　") {
      return;
    }
    new_result[1] = (parseFloat(new_result[1]) / 100).toString();
    set_result(new_result);
  }
  function on_sign_click() {
    const new_result = result.slice();
    if (new_result[1] === "　") {
      return;
    }
    if (new_result[1].startsWith("-")) {
      new_result[1] = new_result[1].substring(1);
    } else {
      new_result[1] = "-" + new_result[1];
    }
    set_result(new_result);
  }

  function on_equal_click() {
    const new_result = result.slice();
    if (new_result[0] === "　") {
      new_result[0] = new_result[1];
      new_result[1] = "　";
      set_result(new_result);
      return;
    }
    if (new_result[1] === "　") {
      return;
    }
    if (new_result[0] === new_result[1]) {
      return;
    }
    if (calculated) {
      new_result[0] = new_result[1];
      set_result(new_result);
      return;
    }
    new_result[0] = new_result[0] + new_result[1];
    try {
      new_result[1] = eval(new_result[0]).toString();
    } catch (err) {
      console.error(err);
    }
    set_result(new_result);
    set_calculated(true);
  }

  function get_spin_style(speed: number): { [key: string]: string } {
    return {
      WebkitAnimation: "spin 8s linear infinite",
      MozAnimation: "spin 8s linear infinite",
      animation: "spin linear infinite",
      animationDuration: `${1000 / (speed * speed)}s`,
    };
  }

  function on_speed_change(value: number) {
    console.log("speed", speed);
    set_speed(value);
  }

  return (
    <>
      <h1>Hello React!</h1>

      <div className="calculator" style={get_spin_style(speed)}>
        <div>
          <p className="math-expression">{result[0]}</p>
          <p className="current-number">{result[1]}</p>
        </div>
        <div className="buttons">
          <div className="row">
            <Button value="C" handle_click={() => init()} />
            <Button value="←" handle_click={() => on_delete_click()} />
            <Button value="%" handle_click={() => on_percentage_sign_click()} />
            <Button value="÷" handle_click={() => on_operator_click("/")} />
          </div>
          <div className="row">
            <Button value="7" handle_click={() => on_digit_click("7")} />
            <Button value="8" handle_click={() => on_digit_click("8")} />
            <Button value="9" handle_click={() => on_digit_click("9")} />
            <Button value="×" handle_click={() => on_operator_click("*")} />
          </div>
          <div className="row">
            <Button value="4" handle_click={() => on_digit_click("4")} />
            <Button value="5" handle_click={() => on_digit_click("5")} />
            <Button value="6" handle_click={() => on_digit_click("6")} />
            <Button value="-" handle_click={() => on_operator_click("-")} />
          </div>
          <div className="row">
            <Button value="1" handle_click={() => on_digit_click("1")} />
            <Button value="2" handle_click={() => on_digit_click("2")} />
            <Button value="3" handle_click={() => on_digit_click("3")} />
            <Button value="+" handle_click={() => on_operator_click("+")} />
          </div>
          <div className="row">
            <Button value="+/-" handle_click={() => on_sign_click()} />
            <Button value="0" handle_click={() => on_digit_click("0")} />
            <Button value="." handle_click={() => on_point_click()} />
            <Button value="=" handle_click={() => on_equal_click()} />
          </div>
        </div>
      </div>

      <ReactSlider
        className="horizontal-slider"
        thumbClassName="example-thumb"
        trackClassName="example-track"
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
        defaultValue={speed}
        onChange={(value) => {
          on_speed_change(value);
        }}
      />
    </>
  );
}
