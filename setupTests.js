import "@testing-library/jest-dom/extend-expect";
// src/setupTests.js
import { server } from "./mocks/server.ts";

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  server.resetHandlers();

  //hide red console error
  jest.spyOn(console, "error");
  jest.spyOn(console, "warn");

  // @ts-ignore jest.spyOn adds this functionallity
  console.error.mockImplementation(() => null);
  console.warn.mockImplementation(() => null);
});

// Clean up after the tests are finished.
afterAll(() => {
  server.close();

  //hide red console error
  console.error.mockRestore();
});
