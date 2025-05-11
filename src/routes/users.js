import { Router } from "express"
const router = Router();

// Mock database
const users = [
  {
    first_name: 'Nico',
    last_name: 'Migiliarino',
    email: 'nmigliarino@example.com',
  },
  {
    first_name: 'Marcos',
    last_name: 'Pomeranietz',
    email: 'mpomeranietz@example.com',
  },
];

// Getting the list of users from the mock database
router.get('/', (req, res) => {
    res.send(users);
})


export default router