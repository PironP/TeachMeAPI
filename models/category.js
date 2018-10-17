module.exports = function(sequelize, DataTypes){
	const category = sequelize.define("category",{
		Id_category:{
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		nom: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	return category;
}