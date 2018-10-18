module.exports = function(sequelize, DataTypes){
	const user = sequelize.define("user",{
		Id_User:{
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		LastName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		FirstName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		Email: {
			type: DataTypes.STRING,
			allowNull: false
		},
		Password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		Tel: {
			type: DataTypes.STRING,
			allowNull: false
		},
		Admin: {
			type: DataTypes.TINYINT,
			allowNull: true
		}
	}, {
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	return user;
}