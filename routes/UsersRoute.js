import express from "express"
import { 
    setUsers,
    loginUsers,
    getAllUsers,
    getUsersById,
    searchUsers,
    removeUsers,
    removeAllUsers
} from "../controllers/UsersControllers.js"

const router = express.Router()

router.post('/users/set', setUsers)
router.post('/users/login', loginUsers)
router.get('/users', getAllUsers)
router.get('/users/:userid', getUsersById)
router.get('/users/search/:keyword', searchUsers)
router.delete('/users/remove/:userid', removeUsers)
router.delete('/users/remove-all', removeAllUsers)

export default router;