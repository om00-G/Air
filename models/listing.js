const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js")

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image:{
        // type: String,
        // default: "https://images.unsplash.com/photo-1732058824460-d89cb7b4a38f?q=80&w=1772&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        // set: function (v) {
        //     return v === "" ? this.defaultImage : v;
        // },
        url:String,
        filename:String,
    },
    price: Number,
    location: String,
    country: String,

    reviews:[{
        type:Schema.Types.ObjectId,
        ref:"Review",
    }],
    owner:{
          type:Schema.Types.ObjectId,
        ref:"User",
    },

 geometry: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true,
    }},
});

listingSchema.post("findByIdAndDelete", async(listing)=>{
    if(listing){
    await Review.deleteMany({_id :{$in: listing.reviews}})
    }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
