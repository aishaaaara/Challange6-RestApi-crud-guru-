const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const db = require("./config") 
const { response } = require("express")

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

//end-point akses data guru
app.get("/guru", (req,res) => {
  
    let sql = "select * from guru"
    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message : error.message //pesan error
            }
        }else{
            response = {
                count : result.length, //jumlah data
                guru : result
            }
        }
        res.json(response) //send response
    })
})

//end-point akses data guru berdasarkan id_guru tertentu
app.get("/guru/:id", (req,res) => {
    let data = {
        id_guru : req.params.id
    }
    let sql = "select * from guru where ?"
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message : error.message 
            }
        }else{
            response = {
                count : result.length,
                guru : result
            }
        }
        res.json(response)
    })
})

// end-point menyimpan data guru
app.post("/guru", (req,res) => {
    let data = {
        nip : req.body.nip,
        nama_guru  : req.body.nama_guru,
        tgl_lahir : req.body.tgl_lahir,
        alamat : req.body.alamat
    }

    let sql = "insert into guru set ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message : error.message
            }
        }else{
            response = {
                message : result.affectedRows + "data inserted"
            }
        }
        res.json(response)
    })
})
//end point mengubah data guru
app.put("/:id", (req,res) => {

    let data = [

        {
            nip: req.body.nip,
            nama_guru: req.body.nama_guru,
            tgl_lahir: req.body.tgl_lahir,
            alamat : req.body.alamat

        },

        {
            id_guru: req.params.id
        }
    ]
    
    let sql = "update guru set ? where ?"
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + "data updated"
            }
        }
        
        res.json(response)
      })
    })
//end point mengubah data guru
app.delete("/guru/:id", (req,res) => {

    let data = [

        {
            id_guru: req.params.id
        }
    ]
    
    let sql = "delete from guru  where ?"
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + "data deleted"
            }
        }
        
        res.json(response)
      })
    })
//membuat web server dengan port 8000
app.listen(8000, () => {
    console.log("server run on port 8000")
})