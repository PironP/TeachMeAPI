module.exports = function(sequelize, DataTypes){
	const horaire = sequelize.define("horaire",{
		Id_horaire:{
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		Monday: {
			type: DataTypes.STRING,
			allowNull: false
		},
		Tuesday: {
			type: DataTypes.STRING,
			allowNull: false
		},
		Wednesday: {
			type: DataTypes.STRING,
			allowNull: true
		},
		Thursday: {
			type: DataTypes.STRING,
			allowNull: true
		},
		Friday: {
			type: DataTypes.STRING,
			allowNull: true
		},
		Saturday: {
			type: DataTypes.STRING,
			allowNull: true
		},
		Sunday: {
			type: DataTypes.STRING,
			allowNull: true
		},
		Id_deposit: {
			type: DataTypes.INTEGER,
			allowNull: true
		}
	}, {
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	return horaire;
}