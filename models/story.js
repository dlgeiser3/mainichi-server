module.exports = (sequelize, DataTypes) => {
  const Story = sequelize.define('story', {
   text: {
      type: DataTypes.STRING,
      allowNull : false
    },
    likes: {
      type: DataTypes.INTEGER
    },
    studied: {
      type: DataTypes.BOOLEAN
    },
    owner: {
      type: DataTypes.STRING
    }
  })
  return Story;
}