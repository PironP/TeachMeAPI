module.exports = function(sequelize, DataTypes){
	const deposit = sequelize.define("deposit",{
		Id_deposit:{
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		Name: {
			type: DataTypes.VARCHAR,
			allowNull: false
		},
		Adresse: {
			type: DataTypes.VARCHAR,
			allowNull: false
		},
		CoordX: {
			type: DataTypes.FLOAT,
			allowNull: true
		},
		CoordY: {
			type: DataTypes.FLOAT,
			allowNull: true
		},
		Tel: {
			type: DataTypes.VARCHAR,
			allowNull: true
		},
		IsAssos: {
			type: DataTypes.TINYINT,
			allowNull: true
		},
		admin: {
			type: DataTypes.INTEGER,
			allowNull: true
		}
	}, {
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	return deposit;
}