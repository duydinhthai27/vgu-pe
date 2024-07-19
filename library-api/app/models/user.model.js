module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    username: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    fname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    role: {
      type: Sequelize.STRING,
      defaultValue: 'user',
      validate: {
        isIn: [['user', 'admin']]
      },
      allowNull: false
    },
    isVerified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    balance: {
      type: Sequelize.INTEGER
    },
    club_id: {
      type: Sequelize.INTEGER
    },
    address: {
      type: Sequelize.STRING
    },
    recent_search: {
      type: Sequelize.STRING
    },
    phone_number: {
      type: Sequelize.INTEGER
    }
  });

  return User;
};
