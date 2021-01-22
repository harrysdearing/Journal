// const { Sequelize } = require("sequelize/types");

// email store string -- don't allow it to be null (null=false)
// password store string -- don't allow it to be null (null=false)

//EXAMPLE IN SEQUELIZE DOCUMENTATION

// const User = sequelize.define('user', {
//     //attributes
//     firstName: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     lastName: {
//         type: Sequelize.STRING
//     }
// })

module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define('user', { //this is the name of the table
        email: { //this is the data within the table
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return User
}