module.exports = function(sequelize, DataTypes){
	const product = sequelize.define("product",{
		Id_Product:{
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		Photo: {
			type: DataTypes.STRING,
			allowNull: false
		},
		Description: {
			type: DataTypes.STRING,
			allowNull: false
		},
		Id_Categorie: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		Id_Stockage: {
			type: DataTypes.INTEGER,
			allowNull: true
		}
	}, {
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	return product;
}