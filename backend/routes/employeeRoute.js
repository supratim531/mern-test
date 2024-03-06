const router = require("express").Router();
const { uploadImage } = require("../helper/imageUploader");
const { handleToken } = require("../middlewares/tokenHandler");
const {
  saveEmployee,
  findAllEmployees,
  findEmployeeById,
  updateEmployeeById,
  deleteEmployeeById
} = require("../controllers/employeeController");

router.route('').get(handleToken, findAllEmployees);
router.route("/:id").get(handleToken, findEmployeeById);
router.route("/:id").delete(handleToken, deleteEmployeeById);
router.route('').post(uploadImage.single("image"), handleToken, saveEmployee);
router.route("/:id").put(uploadImage.single("image"), handleToken, updateEmployeeById);

module.exports = router;
