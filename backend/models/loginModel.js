module.exports = (sequelize, DataTypes) => {
  const Login = sequelize.define("t_Login", {
    f_Uid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV1
    },
    f_userName: {
      type: DataTypes.STRING,
      unique: {
        msg: "Duplicate Username - This username is already registered"
      },
      validate: {
        isAlphanumeric: true,
        len: [6, 60]
      }
    },
    f_Pwd: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Login;
};
