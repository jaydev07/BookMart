const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name: { type:String, trim:true, required:true, maxlength:32},

    email: { type:String, trim:true, required:true, unique:32},

    password: { type:String, required:true},

    about: { type:String, trim:true},

    // For user:0 & admin:1
    role: { type:Number, default:0 },

    // To show the history of products purchased by the user
    history: { type:Array, default:[]}

},{ timestamps:true});

// userSchema.methods = {
//     encryptPassword: (password) => {
//         if(!password)
//             return ''
//         try{
//             return crypto
//                 .createHmac("sha1", this.salt)
//                 .update(password)
//                 .digest("hex");
//         }catch(err){
//             return "";
//         }
//     }
// }

// // This virtual will take the password from body and convert it into hashedpassword
// userSchema.virtual('password')
// .set((password) => {
//     this._password = password;
//     this.salt = uuid.v4();
//     this._hashed_password = this.encryptPassword(password);
// })
// .get(() => {
//     return this._password
// })


module.exports = mongoose.model("User", userSchema);