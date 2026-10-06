const { response } = require("express");

localStorage.setItem("token", response.data.token)

localStorage.removeItem("token")