module.exports = (sequelize, DataTypes) => {
    const Room = sequelize.define("Room", {
        ID_Room: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        Location: DataTypes.STRING,
        Availability: DataTypes.STRING //to show if the room is available or not in interface
    }, {
        tableName: 'Rooms' // If you want to specify the table name explicitly
    });

    return Room;
};
