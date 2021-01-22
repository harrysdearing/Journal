module.exports = function(sequelize, DataTypes) {
    const Journal = sequelize.define('journal', { //this is the name of the table
        title: { //this is the data within the table
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false
        },
        entry: {
            type: DataTypes.STRING,
            allowNull: false
        },
        owner: {
            type: DataTypes.INTEGER
        }
    })
    return Journal;
};