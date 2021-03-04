import UserModel from "../models/userModel.js";

var User = new UserModel();

class UserController {

    constructor(){}

    async createUser(request, response){
        
        var data = request.body;
       
        var result = await User.createUser(
            data.foto,
            data.nombre,
            data.email,
            data.password
        );

        response.status(200).json({result});
    }

    async deleteUser(request, response) {

        var id = request.params.id;

        var result = await User.deleteUser(id);
        response.status(200).json(result);
    }

    async updateUser(request, response) {
        
        var id = request.params.id;
        var updatedata = request.body;

        var result = await User.updateUser(id, updatedata);
        response.status(200).json(result);
    }

    async getUsers(request, response) {
        var result = await User.getUsers();
        response.status(200).json(result);
    }
    
}

export default UserController;