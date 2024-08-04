import { getAllUsers, updateUser } from '../services/user.service';

export const doGetListAllUsers = async (request: any, response: any) => {
    getAllUsers()
        .then((userRecord: any) => {
            if(userRecord) {
                return response.status(200).json({isError: false, users: userRecord?.data });
            }
            return response.status(204).json({});
        })
        .catch((error) => {
            console.error(error);
            return response.status(500).json({ isError: true, error: error });
        });
};

export const doUpdateUser = async (request: any, response: any) => {
    try {
        const { id } = request.params
        const { displayName, phoneNumber, email, status } = request.body;
        if (!id || !displayName || !email) {
            return response.status(400).send({ message: 'Missing fields' });
        }
        updateUser({
            uid: id,
            displayName,
            phoneNumber,
            email,
            disabled: status
        }).then((res) => {
            if (!res.isError) {
                return response.status(200).json({isError: false, data: res.data });
            } else {
                response.status(500).json(res);
            }
        })
    } catch(ex) {
        console.error(ex);
        return response.status(500).json({ isError: true, error: ex });
    }
};