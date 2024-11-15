const carSchema = new mongoose.Schema({
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    tags: [
      {
        type: String,
      },
    ],
    images: [
      {
        url: {
          type: String,
          required: true,
        },
      },
    ],
  }, { timestamps: true });
  
  module.exports = mongoose.model('Car', carSchema);
  