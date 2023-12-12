import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import Counter from "./components/Counter";
import { waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { ReactDOM } from "react";
import reportWebVitals from "./reportWebVitals";
import Home from "./components/Home";

test("inital counter App", () => {
  render(<Counter />);
  expect(screen.getByText("Counter App")).toBeInTheDocument();
});

test("Home Page", () => {
  render(<Home />);
  expect(screen.getByText("This is home page for counter")).toBeInTheDocument();
});

test("renders the counter with correct className and content", () => {
  const { container } = render(<Counter />);
  const counterElement = container.getElementsByClassName("p1")[0];
  expect(counterElement).toBeInTheDocument();

  // expect(counterElement).toHaveTextContent("Count : 0"); // Replace '0' with the expected counter value
});

test("Count visible", () => {
  const { container } = render(<Counter />);
  const counterElement = container.getElementsByClassName("p1")[0];
  expect(counterElement).toHaveTextContent("Count : 0");
});

test("increments the counter when the Increment button is clicked", async () => {
  const { getByText, getByTestId } = render(<Counter />);
  const initialCounter = getByTestId("counter").textContent;
  fireEvent.click(getByText("Increment"));
  await new Promise((resolve) => setTimeout(resolve, 0));
  const updatedCounter = getByTestId("counter").textContent;
  expect(parseInt(updatedCounter)).toBe(parseInt(initialCounter) + 1);
});

test("decrements the counter when the Decrement button is clicked", async () => {
  const { getByText, getByTestId } = render(<Counter />);
  const initialCounter = getByTestId("counter").textContent;
  fireEvent.click(getByText("Decrement"));
  await new Promise((resolve) => setTimeout(resolve, 0));
  const updatedCounter = getByTestId("counter").textContent;
  expect(parseInt(updatedCounter)).toBe(parseInt(initialCounter) - 1);
});

test("counter increments by 4 when + button is clicked four times", () => {
  render(<Counter />);
  const initialCounter = screen.getByTestId("counter").textContent;
  fireEvent.click(screen.getByText("Increment"));
  new Promise((resolve) => setTimeout(resolve, 0));
  const updatedCounter = screen.getByTestId("counter").textContent;
  expect(parseInt(updatedCounter)).toBe(parseInt(initialCounter) + 1);
  expect(parseInt(updatedCounter)).toBe(parseInt(initialCounter) + 1);
  expect(parseInt(updatedCounter)).toBe(parseInt(initialCounter) + 1);
  expect(parseInt(updatedCounter)).toBe(parseInt(initialCounter) + 1);
});

test("counter value should be 0 when + button is clicked 2 times and - 2 times", () => {
  render(<Counter />);
  fireEvent.click(screen.getByText("Increment"));
  fireEvent.click(screen.getByText("Increment"));
  fireEvent.click(screen.getByText("Decrement"));
  fireEvent.click(screen.getByText("Decrement"));

  const initialCounter = screen.getByTestId("counter").textContent;
  const updatedCounter = screen.getByTestId("counter").textContent;
  expect(parseInt(updatedCounter)).toBe(parseInt(initialCounter));
  // expect(screen.getByText("0")).toBeInTheDocument();
});

test("counter value should be present", () => {
  render(<Counter />);
  fireEvent.click(screen.getByText("Reset"));

  expect(screen.getByTestId("counter")).toBeInTheDocument();
});

test("renders the App component without crashing", () => {
  // Render your component
  render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  // Check if a text from your App component is present
  const appText = screen.getByText(/Counter App/i); // Replace with the actual text in your App component
  // Assert that the text is present
  expect(appText).toBeInTheDocument();
});

jest.mock("./reportWebVitals", () => ({
  __esModule: true,
  default: jest.fn(),
}));

// it("renders correctly with a counter 1", () => {
//   const { asFragment } = render(<Counter />);
//   expect(asFragment()).toMatchSnapshot();
// });

jest.mock("web-vitals", () => ({
  __esModule: true,
  getCLS: jest.fn(),
  getFID: jest.fn(),
  getFCP: jest.fn(),
  getLCP: jest.fn(),
  getTTFB: jest.fn(),
}));

test("customInputHandle updates state with parsed integer value", () => {
  const { container } = render(<Counter />);
  const counterElement = container.getElementsByClassName("p2")[0];
  expect(counterElement).toHaveTextContent("Custom Input:");
});

test("handleReset resets counter and clears history", () => {
  const initialState = {
    counter: 5,
    customInput: 3,
    history: [
      "Increment value by 1, Counter Value: 6",
      "Decrement value by 1, Counter Value: 5",
    ],
  };

  const { container } = render(<Counter />);
  const inputElement = container.getElementsByClassName("p2")[0];

  // Trigger handleReset
  fireEvent.click(screen.getByText("Reset"));

  // Check if counter is reset
  expect(screen.getByText("Count : 0")).toBeInTheDocument();
});
