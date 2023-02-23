const { Router } = require('express');
const router = Router();
const RoleController=require('../../../controllers/student/student.controller');

router.get('/',RoleController.listAll);
router.post('/',RoleController.create);

module.exports = router;