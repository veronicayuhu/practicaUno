import mongoose from "../connection/connect.js";
import modelenum from "../utils/enumModel.js";

class UserModel {
  constructor() {
    this.Schema = mongoose.Schema;
    this.UserSchema = new this.Schema({
      foto:String,
      nombre:String,
      email: {
        type: String,
      },
      password: String,
    });
    if (modelenum["users"] == null) {
      this.mymodel = mongoose.model("users", this.UserSchema);
      modelenum["users"] = this.mymodel;
    } else {
      this.mymodel = modelenum["users"];
    }
  }

  createUser(foto, nombre, email, password) {
    var user = {
      foto,
      nombre,
      email,
      password
    };
    var newuser = new this.mymodel(user);
 
    var error = newuser.validateSync();
    return new Promise((resolve, reject) => {
      if (error) {
        resolve(error);
        return;
      }
      newuser.save().then((docs) => {
        console.log("Usuario registrado");
        resolve(docs);
      });
    });
  }

  getUsers(filterdata) {
    var filter = {};
    if (filterdata != null) {
      filter = filterdata;
    }
    return new Promise((resolve, reject) => {
      this.mymodel.find(filter, (err, docs) => {
        if (err) {
          console.log(err);
          resolve(err);
          return;
        }
        resolve(docs);
      });
    });
  }

  updateUser(id, userUpdate) {
    return new Promise((resolve, reject) => {
      this.mymodel.update({ _id: id }, { $set: userUpdate }, (err, docs) => {
        if (err) {
          console.log(err);
          resolve(err);
          return;
        }
        resolve(docs);
      });
    });
  }

  deleteUser(id) {
    return new Promise((resolve, reject) => {
      this.mymodel.remove({ _id: id }).then((err, docs) => {
        if (err) {
          console.log(err);
          resolve(err);
          return;
        }
        resolve(docs);
      });
    });
  }
  getModel() {
    return this.mymodel;
  }
  getSchema() {
    return this.UserSchema;
  }
}
export default UserModel;
