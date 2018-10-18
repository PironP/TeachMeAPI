module.exports = {


  friendlyName: 'deposit',


  description: 'dump object.',

  input: {
    coX: {
      type: 'number',
      required: true,
      description: 'coordonnées X'
    },
    coY: {
      type: 'number',
      required: true,
      description: 'coordonnées Y'
    }
  },
  exits: {

    success: {
      viewTemplatePath: 'pages/deposit/deposit',
      description: 'The product is successfully saved.'
    },
    BadCom: {
      description: 'The product is not saved.'
    },

  },

  fn: async function (inputs, exits) {
    var depoPoints = Deposit.find({
      CoordX : {
        $lt: inputs.coX + 500,
        $gt: inputs.coX - 500,
      },
      CoordY : {
        $lt: inputs.coY + 500,
        $gt: inputs.coY - 500,
      }
    });
    return depoPoints.length == 0
      ? exits.BadCom()
      : exits.success();
  }
};
