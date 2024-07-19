module.exports =  (sequelize, DataTypes) => {
  const Rent = sequelize.define('Rent', {
    ID_Rent: {
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: false,
      allowNull: false
    },
    ID_Book: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Books', // name of the target table
        key: 'id' // key in the target table
      }
    },
    Issue_Date: {
      type: DataTypes.DATE
    },
    Return_Date: {
      type: DataTypes.DATE
    },
    ID_User: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users', // name of the target table
        key: 'id' // key in the target table
      }
    },
    late_fee: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'returned' // Default status is 'returned'
    }
  });

  return Rent;
};
