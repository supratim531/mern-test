module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define("t_Employee", {
    f_Id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV1
    },
    f_Image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    f_Name: {
      type: DataTypes.STRING,
      validate: {
        is: /^[a-zA-Z\s]+$/,
        len: [4, 255]
      }
    },
    f_Email: {
      type: DataTypes.STRING,
      unique: {
        msg: "Duplicate Email - This email is already registered"
      },
    },
    f_Mobile: {
      type: DataTypes.STRING,
      validate: {
        is: /^\d{10}$/
      }
    },
    f_Designation: {
      type: DataTypes.STRING,
      validate: {
        isIn: [["HR", "Manager", "sales"]]
      }
    },
    f_gender: {
      type: DataTypes.STRING,
      validate: {
        isIn: [['M', 'F']]
      }
    },
    f_Course: {
      type: DataTypes.STRING,
      validate: {
        isIn: [["MCA", "BCA", "BSC"]]
      }
    },
    f_Createdate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  });

  return Employee;
};
