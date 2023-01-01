const data = {
    employees :  require("../data/data.json"),
    setEmploy : function(data) {this.employees = data}
}


const getAllemploys = (req,res)=>{
    res.json(data.employees)
}

const createNewemploy = (req,res)=>{
    const newemployee = {
        id : data.employees[data.employees.length-1].id +1 || 1,
        firstname : req.body.firstname ,
        lastname : req.body.lastname , 
    }

    if(!newemployee.firstname || !newemployee.lastname){
        return res.status(400).json({'message' : "성이나 이름을 입력해주세요."});
    }
    console.log(newemployee)
    data.setEmploy([...data.employees , newemployee]);
    console.log(data.employees)
    res.json(data.employees);
}
const updateEmploy = (req,res)=>{
    const employee = data.employees.find((item)=>{return item.id === parseInt(req.body.id)});
    if(!employee){
        res.json({'message':"유저를 못 찾았습니다."});
    }
    
    if(req.body.firstname) employee.firstname = req.body.firstname
    if(req.body.lastname) employee.lastname = req.body.lastname
    const filterArray = data.employees.filter((item)=>{return item.id !== employee.id});
    const unsortArray = [...filterArray , employee];
    
    data.setEmploy(unsortArray.sort((a,b)=>{
        return a.id - b.id
    }));
    console.log(data.employees)
    res.json(data.employees)

}

const deleteemploy = (req,res)=>{
    const employ = data.employees.find((item)=>{
        return item.id == req.body.id
    });

    if(!employ){
        res.json({"message":"유저 못 찾았습니다."})
    }
    const filteremploy = data.employees.filter((item)=>{
        return item.id !== req.body.id
    });
    data.setEmploy([...filteremploy]);
    console.log(data.employees)
    res.json(data.employees)
    

    
}

const getemploy = (req,res)=>{
    const employee = data.employees.find((item)=>{
        return item.id == req.params.id
    });
    if(!employee){
        res.json({"message":"유저 없음"});
    }
    console.log("유저를 가져옴");
    res.json({"id" : employee});
}

module.exports = {
    getAllemploys,
    createNewemploy,
    updateEmploy,
    getemploy,
    deleteemploy,
}