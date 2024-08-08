import mongoose from 'mongoose';
import { string } from 'yup';

const OrderSchema = new mongoose.Schema({  // new mongoose.Schema define a estrutura do seu documento. que sera convertido em mongodb
  user: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  products: [
    {
      id: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  status: {
    type: String,
    required: true,
  },
},
{
  timestamps: true,
}
);

const Order = mongoose.model('Order', OrderSchema); 

export default Order;
