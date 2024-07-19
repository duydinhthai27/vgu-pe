module.exports = (sequelize, DataTypes) => {
    const RoomBooking = sequelize.define("RoomBooking", {
      ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      ID_Room: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Rooms', // This should match the table name of `Room`
          key: 'ID_Room',
        }
      },
      ID_User: {
        type: DataTypes.INTEGER,
      },
      StartTime: {
        type: DataTypes.DATE, //Date_Time => StartTime
      },
      EndTime: {
        type: DataTypes.DATE, //duration => EndTime
      },
      Payment_method: {
        type: DataTypes.STRING, //maybe can change to description
      },
    });
  
    // Define the relationships
    RoomBooking.associate = function(models) {
      RoomBooking.belongsTo(models.Room, { foreignKey: 'ID_Room' });
    };
  
    return RoomBooking;
  };
  