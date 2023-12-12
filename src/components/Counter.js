import { render } from "@testing-library/react";
import React from "react";
import { ReactDOM } from "react";
import "./Counter.css";

class Counter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      customInput: 1,
      history: [],
    };
  }

  handleIncrement = async () => {
    console.log("increment function");

    console.log(JSON.stringify(this.state.history));
    await this.setState((prevState) => ({
      counter: prevState.counter + this.state.customInput,
      customInput: 1,
      history: [
        ...prevState.history,
        "Increment value by 1, Counter Value:  " +
          (prevState.counter + this.state.customInput),
      ],
    }));
    console.log(JSON.stringify(this.state.history));
  };

  handleDecrement = async () => {
    console.log("Decrement function");
    if (this.state.counter == 0) {
      alert("Counter cannot be negative");
    } else {
      await this.setState((prevState) => ({
        counter: prevState.counter - this.state.customInput,
        customInput: 1,
        history: [
          ...prevState.history,
          "Decrement value by 1, Counter Value:  " +
            (prevState.counter - this.state.customInput),
        ],
      }));
    }
  };

  customInputHandle = (e) => {
    this.setState({ customInput: parseInt(e.target.value) });
  };

  handleReset = () => {
    this.setState((prevState) => ({ counter: (prevState.counter = 0) }));
    this.setState(() => ({
      history: [],
    }));
  };

  render() {
    const renderHistory = this.state.history.map((item) => (
      <div className="list">
        <td>{item}</td>
      </div>
    ));

    return (
      <div className="center">
        <div align="center">
          <h1 className="p3">Counter App</h1>
          <h2 className="p1" data-testid="counter">
            Counter new Count : {this.state.counter}
          </h2>
          <button className="button button1" onClick={this.handleIncrement}>
            Increment
          </button>
          <button className="button button2" onClick={this.handleDecrement}>
            Decrement
          </button>
          <br />
          <br />
          <div className="p8"></div>
          <button className="button buttonReset" onClick={this.handleReset}>
            Reset
          </button>
          {renderHistory}
        </div>
        <div></div>
      </div>
    );
  }
}

export default Counter;
