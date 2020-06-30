const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'seller',
  },
  title: {
    type: String,
    required: true,
  },
  category: {
    type: [String],
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  images: {
    type: [String],
  },
  price: {
    type: Number,
    required: true,
  },
  instock: {
    type: Boolean,
    default: true,
  },
  outofstock: {
    type: [String],
  },
  sizechart: {
    type: [String],
  },
  sizes: [
    {
      size: {
        type: String,
        required: true,
      },
      chest: {
        from: {
          type: Number,
          required: true,
        },
        to: {
          type: Number,
          required: true,
        },
      },
      bodylength: {
        from: {
          type: Number,
          required: true,
        },
        to: {
          type: Number,
          required: true,
        },
      },
      waist: {
        from: {
          type: Number,
          required: true,
        },
        to: {
          type: Number,
          required: true,
        },
      },
      hip: {
        from: {
          type: Number,
          required: true,
        },
        to: {
          type: Number,
          required: true,
        },
      },
      totallength: {
        from: {
          type: Number,
          required: true,
        },
        to: {
          type: Number,
          required: true,
        },
      },
      bust: {
        from: {
          type: Number,
          required: true,
        },
        to: {
          type: Number,
          required: true,
        },
      },
      skirtlength: {
        from: {
          type: Number,
          required: true,
        },
        to: {
          type: Number,
          required: true,
        },
      },
    },
  ],
});

module.exports = Item = new mongoose.model('item', ItemSchema);
