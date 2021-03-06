export default (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Users.associate = (models) => {
    Users.hasMany(models.Recipes, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Users.hasMany(models.Reviews, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Users.hasMany(models.favoriteRecipes, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Users.hasMany(models.Votes, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return Users;
};
