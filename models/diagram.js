const {Schema,model} = require('mongoose');

const diagramSchema= Schema({
   diagram:{
       type: String
   }
})

module.exports= model('Diagram',diagramSchema);