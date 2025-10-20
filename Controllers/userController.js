import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function createUser(req, res) {
  const hashPassword = bcrypt.hashSync(req.body.password, 10);

  const newUser = new User({
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,

    password: hashPassword,
  });

  newUser
    .save()
    .then(() => {
      console.log("New user added successfully");
      res.status(201).json({
        message: "New user added successfully",
        status: "success",
      });
    })
    .catch((error) => {
      console.error("Error adding new user", error.message);
      res.status(500).json({
        message: "Error adding new user",
        status: "error",
      });
    });
}

export function loginUser(req, res) {
  User.findOne({
    email: req.body.email,
  }).then((user) => {
    if (user == null) {
      res.status(403).json({
        message: "User not found",
        status: "error",
      });
    } else {
      const ispasswordValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (ispasswordValid) {
        const token = jwt.sign(
          {
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            role: user.role,
            isblocked: user.isblocked,
            isEmailVerified: user.isEmailVerified,
          },
          "jwt-scret" //This is a secret key for signing the JWT token
        );

        res.json({
          message: "Login successful",
          status: "success",
          token: token,
          user: {
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            role: user.role,
            isblocked: user.isblocked,
            isEmailVerified: user.isEmailVerified,
            profilepicture: user.profilepicture,
          },
        });
      } else {
        res.status(401).json({
          message: "Invalid password",
          status: "error",
        });
      }
    }
  });
}

export function isAdmin(req) {
  if (req.user == null) {
    return false;
  }

  if (req.user.role != "Admin") {
    return false;
  }

  return true;
}

export function isCustomer(req){
  if (req.user == null) {
    return false;
  }

  if (req.user.role != "user") {
    return false;
  }
  
  return true;
}