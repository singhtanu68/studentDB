const { Student, ObjectId } = require('../../models/student');
const { sendCustomError, sendSuccess } = require('../../helper/response');

const create = async (req, res) => {
  let {name,rollNo,className,address}= req.body;
  
//   name=name.toUpperCase();
  let requestData={name,rollNo,className,address};

  let newStudent = new Student(requestData);
  newStudent.save(async (err, data) => {

    if(err){
        if(err.code==11000){
            return sendCustomError({}, res, err.code, 'Student already exists.')
        }else{
             return sendCustomError({}, res, err.code, 'Error in adding Student.')
        }
       
    }else{
     return sendSuccess(data, res, 200, "Student created successfully.");
    }

   })

}




const listAll = async (req, res) => {
     let query={};
    let current_page= parseInt((req.query.current_page)?req.query.current_page:1);
    let search_text= (req.query.search_text)?req.query.search_text:"";
    let field_name= (req.query.order_by)?req.query.order_by:"";
    let order= (req.query.order)?req.query.order:"";
    let order_by={};
    if(field_name.length>0 && order.length>0 ){
    order_by[field_name]=order;
    }else{
            order_by['_id']=-1;
    }
    let per_page= parseInt((req.query.per_page)?req.query.per_page:20);
    let offset=parseInt((current_page-1)*per_page);
    let conditions={};

    if(search_text.length>0){

        conditions={ name: { $regex: '.*' + search_text + '.*' }};

    }
    let total_records= await Student.countDocuments(conditions);

    let total_pages=Math.ceil(total_records/per_page);
    let meta={
        current_page:current_page,
        per_page:per_page,
        total_pages:total_pages,
        total_records:total_records
    }

    Student.find(conditions,{}, { skip: offset, limit: per_page,sort:order_by }, function(err, results) {
        let data={
            'results':results,
            'meta':meta
        }
        return sendSuccess(data, res, 200, "Students list.");
       
    });

    
}



module.exports = {
    create,
    listAll,
   
};