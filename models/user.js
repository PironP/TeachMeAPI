module.exports = function(sequelize, DataTypes){
	const user = sequelize.define("user",{
		Id_User:{
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		LastName: {
			type: DataTypes.VARCHAR,
			allowNull: false
		},
		FirstName: {
			type: DataTypes.VARCHAR,
			allowNull: false
		},
		Email: {
			type: DataTypes.VARCHAR,
			allowNull: false
		},
		Password: {
			type: DataTypes.VARCHAR,
			allowNull: false
		},
		Tel: {
			type: DataTypes.VARCHAR,
			allowNull: false
		}
	}, {
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	return user;
}