const baseUrl = "http://localhost:3002";

import { processServerResponse } from "./promise";
import { getToken } from "./token";

function registerUser({ name, email, password }) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  }).then(processServerResponse);
}

function signInUser({ email, password }) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(processServerResponse);
}

function updateUser({ name }) {
  const token = getToken();
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },

    body: JSON.stringify({ name }),
  }).then(processServerResponse);
}

function isValidToken(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  })
    .then((data) => {
      return data;
    })
    .then(processServerResponse);
}

export { registerUser, signInUser, updateUser, isValidToken };
