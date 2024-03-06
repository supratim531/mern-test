const fs = require("fs");
const Employee = require("../models").employee;
const expressAsyncHandler = require("express-async-handler");
const { validateEmployeeBody } = require("../utils/schemaValidator");
const {
  NOT_FOUND,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR
} = require("../constants");

/**
 * @desc Save an employee
 * @route POST /api/v1/employee
 */
const saveEmployee = expressAsyncHandler(async (req, res) => {
  console.log(req?.body);
  console.log(req?.file);
  const payload = req?.body;
  const validationError = validateEmployeeBody(payload);

  if (validationError.error) {
    res.status(BAD_REQUEST.code);
    res.statusMessage = BAD_REQUEST.title;
    throw new Error(validationError.error.details[0].message);
  }

  const employee = await Employee.create(payload);

  if (employee) {
    const filePath = `./public/uploads/${req.body?.f_Image}`;

    fs.writeFile(filePath, req.file?.buffer, err => {
      if (err) {
        console.log(err);
        Employee.destroy({ where: { f_Id: employee?.f_Id } });
        throw err;
      } else {
        return res.status(201).json({
          "message": "A new employee created",
          "employee": employee
        });
      }
    });
  }
});

/**
 * @desc Get all employees
 * @route GET /api/v1/employee
 */
const findAllEmployees = expressAsyncHandler(async (req, res) => {
  const employees = await Employee.findAll({});

  if (employees.length === 0) {
    res.status(NOT_FOUND.code);
    res.statusMessage = NOT_FOUND.title;
    throw new Error("No employee found");
  }

  return res.status(200).json({
    "employees": employees
  });
});

/**
 * @desc Get an employee by id
 * @route GET /api/v1/employee/:id
 */
const findEmployeeById = expressAsyncHandler(async (req, res) => {
  const id = req.params?.id;
  const employee = await Employee.findOne({ where: { f_Id: id } });

  if (employee) {
    return res.status(200).json({
      "employee": employee
    });
  } else {
    res.status(NOT_FOUND.code);
    res.statusMessage = NOT_FOUND.title;
    throw new Error(`Employee with id ${id} not found`);
  }
});

/**
 * @desc Update an employee by id
 * @route PUT /api/v1/employee/:id
 */
const updateEmployeeById = expressAsyncHandler(async (req, res) => {
  const id = req.params?.id;
  const payload = req?.body;
  const validationError = validateEmployeeBody(payload);

  if (validationError.error) {
    res.status(BAD_REQUEST.code);
    res.statusMessage = BAD_REQUEST.title;
    throw new Error(validationError.error.details[0].message);
  }

  const employee = await Employee.findOne({ where: { f_Id: id } });

  if (employee) {
    if (req.file?.buffer) {
      console.log("UPDATE: New Image Buffer:", req.file?.buffer);
      const filePath = `./public/uploads/${employee?.f_Image}`;

      fs.writeFile(filePath, req.file?.buffer, async err => {
        if (err) {
          throw err;
        }
      });
    }

    const status = await Employee.update(req.body, { where: { f_Id: id } });

    if (status[0] === 1) {
      return res.status(200).json({
        "message": `Employee with id ${id} updated successfully`
      });
    } else {
      res.status(INTERNAL_SERVER_ERROR.code);
      res.statusMessage = INTERNAL_SERVER_ERROR.title;
      throw new Error(`Employee with id ${id} couldn't be updated`);
    }
  } else {
    res.status(NOT_FOUND.code);
    res.statusMessage = NOT_FOUND.title;
    throw new Error(`Employee with id ${id} not found`);
  }
});

/**
 * @desc Delete an employee by id
 * @route DELETE /api/v1/employee/:id
 */
const deleteEmployeeById = expressAsyncHandler(async (req, res) => {
  const id = req.params?.id;
  const employee = await Employee.findOne({ where: { f_Id: id } });

  if (employee) {
    const filePath = `./public/uploads/${employee?.f_Image}`;

    fs.unlink(filePath, async err => {
      if (err) {
        throw err;
      } else {
        const status = await Employee.destroy({ where: { f_Id: id } });

        if (status === 1) {
          return res.status(200).json({
            "message": `Employee with id ${id} deleted successfully`
          });
        } else {
          res.status(INTERNAL_SERVER_ERROR.code);
          res.statusMessage = INTERNAL_SERVER_ERROR.title;
          throw new Error(`Employee with id ${id} couldn't be deleted`);
        }
      }
    });
  } else {
    res.status(NOT_FOUND.code);
    res.statusMessage = NOT_FOUND.title;
    throw new Error(`Employee with id ${id} not found`);
  }
});

module.exports = {
  saveEmployee,
  findAllEmployees,
  findEmployeeById,
  updateEmployeeById,
  deleteEmployeeById
};
