const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 4000;
const JWT_SECRET = "ADMIN_LOGIN_12345";

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const upload = multer();

// MySQL Connection
const db = mysql.createConnection
({
  host: "localhost",
  user: "root",
  password: "",
  database: "travel_agency_db", // change to your database name
    dateStrings: true   // 🔥 ADD THIS

});

db.connect((err) => 
{
  if (err)
  {
    throw err;
  } 
  console.log("✅ MySQL Connected!");
});


//=========================================== TBL_USER (Registration.jsx) =====================================================
//ADD USERS POST API

app.post("/addusers" , upload.none() , (req,res) => 
{
  const { username , useremail , usermobile , userpassword } = req.body;

  const sql = "INSERT INTO tbl_user(username,email,contact_no,password) VALUES (?,?,?,?)"
  db.query(sql, [username ,useremail , usermobile ,userpassword] , (err,result) => 
  {
    if(err)
    {
      return res.status(500).json({error : err});
    }
    res.json({
        status : "suucess",
        message : "Registration Succeesful"
    })
  })
}) 

app.post("/userLogin", upload.none(), (req, res) => 
{
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM tbl_user WHERE email = ? AND password = ?", [email, password],(err, results) => 
    {
      if (results.length === 0) 
      {
        return res.status(401).json({ message: "Login Failed" });
      }
            
      const user = results[0];

      const token_1 = jwt.sign({user_id: results[0].user_id, user_name: results[0].username, email: results[0].email}, JWT_SECRET, { expiresIn: "1h" });
      res.status(200)
      res.json({ status: "success",token: token_1, user_id:user.user_id, email:user.email , NameofUser:user.username});    
    }
  );
});

const verifyToken = (req, res, next) => 
{
  const authHeader = req.headers.authorization;

  if (!authHeader) 
  {
    return res.status(401).json({ message: "Token missing" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, JWT_SECRET, (err, decoded) => 
  {
    if (err) 
    {
      return res.status(403).json({ message: "Invalid token" });
    }

    req.user = decoded;   // 👈 USER ID yahin aa gayi
    next();
  });
};

//=========================================== tbl_booking & tbl_passanger =====================================================

app.post("/addbooking/:id" , upload.none(),verifyToken ,(req,res) =>
{
  const id = req.params.id
  const u_id = req.user.user_id
  const status = "Pending"
  const {date_id ,person,total_amount} = req.body
  const passanger = JSON.parse(req.body.passanger);
  const due_amount = total_amount
  const paid_amount = 0
  const active_person = person
  const cancelled_person = 0
  const active_amount = paid_amount 

  const sql = "INSERT INTO tbl_booking(user_id , tour_id , date_id , persons , active_person , cancelled_person ,  total_amount , paid_amount , active_amount , due_amount , booking_status , payment_status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)"
  db.query(sql,[u_id , id , date_id , person , active_person , cancelled_person , total_amount , paid_amount , active_amount , due_amount , status , status],(err,results) =>
  {
    if(err)
    {
      return res.status(500).json({error:err})
    }

    const book_id = results.insertId;

    const sql = "INSERT INTO tbl_tour_passanger(booking_id,name,age,gender,passanger_status,cancle_date) Values ?"
    const values = passanger.map(row => [book_id , row.name , row.age , row.gender,"Active",""])
    db.query(sql,[values] , (err2) => 
    {
      if(err2)
      {
        return res.status(500).json({error:err2})
      }
      res.json({
        status : "success",
        message : "Booking Submitted Succeesfully"
      }) 
    })
  })
})


//Show Individual Booking Data
app.get("/view_my_booking/:id", verifyToken, (req, res) => 
{
  const book_id = req.params.id;
  const u_id = req.user.user_id;

  db.query(`SELECT b.*, d.available_seats FROM tbl_booking b JOIN tbl_tour_dates d ON b.date_id = d.date_id WHERE b.booking_id = ? AND b.user_id = ? ORDER BY b.booking_id DESC`,
    [book_id, u_id], (err, results) => 
    {
      if (err) 
      {
        return res.status(500).json({ error: err });
      } 
      res.json(results);
    }
  );
});
app.get("/view_my_booking_1", verifyToken, (req, res) => {

  const userId = req.user.user_id; 

  const sql = `SELECT b.*, d.start_date FROM tbl_booking b INNER JOIN tbl_tour_dates d ON b.date_id = d.date_id WHERE b.user_id = ? Order by booking_id Desc; `;

  db.query(sql, [userId], (err, result) => {

    if (err) 
    {
      console.log(err);
      return res.status(500).json(err);
    }

    res.json(result);
  });
});
//=========================================== tbl_enquiries (Contact_Us.jsx) =====================================================
//tbl_enquiries POST API

app.post("/addenquiries" , upload.none() ,verifyToken, (req,res) => 
{
  const { username , useremail , userphone , usermessage } = req.body;
  const tour_user_id = req.user.user_id
  const enq_status = "Pending"
  const enq_reply = ""

  const sql = "INSERT INTO tbl_enquiries(user_id , name, email, phone_no, message , enquiry_status , reply_message) VALUES (?,?,?,?,?,?,?)"
  db.query(sql, [tour_user_id,username ,useremail , userphone ,usermessage , enq_status , enq_reply] , (err,result) => 
  {
    if(err)
    {
      return res.status(500).json({error : err});
    }
    res.json({
        status : "success",
        message : "Enquiry Submitted Succeesfully"
    })
  })
}) 

app.get("/view_replied_enquiry_userside",verifyToken, (req, res) => 
{
  
  u_id = req.user.user_id

  db.query("SELECT * FROM tbl_enquiries where user_id = ? ",[u_id] , (err, results) => 
  {
    if (err)
    {
       return res.status(500).json({ error: err }); 
    } 
    res.json(results);
  });
});

//===========================  tbl_review ========================================================================
app.post("/addreview" , upload.none() , verifyToken ,  (req,res) => 
{
  const { tourid , tour_rating , tour_review_message } = req.body;
  const tour_user_id = req.user.user_id
  const tour_username = req.user.user_name

  const sql = "INSERT INTO tbl_review(tour_id, user_id, username , rating , review_text) VALUES (?,?,?,?,?)"
  db.query(sql, [tourid ,tour_user_id ,tour_username, tour_rating ,tour_review_message] , (err,result) => 
  {
    if(err)
    {
      return res.status(500).json({error : err});
    }
    res.json({
        status : "success",
        message : "Review Submitted Succeesfully"
    })
  })
}) 

//===========================  tbl_tours (SHOW_PACKGES.JSX) ======================================================

app.get("/viewpackages",verifyToken, (req, res) => 
{
  db.query("SELECT * FROM tbl_tours", (err, results) => 
  {
    if (err)  
    {
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
});


//=================================== tbl_tour_dates , tbl_tours , tbl_tour_images , tbl_reviews (VIEW_MORE.JSX PAGE API) ===================================================

app.get("/packageseatsdetails/:package_id/:date_id", (req, res) => 
{
  const { package_id, date_id } = req.params;

  const sql = ` SELECT available_seats, confirm_seats, max_seats FROM tbl_tour_dates WHERE tour_id = ? AND date_id = ? `;

  db.query(sql, [package_id, date_id], (err, results) => 
  {
      res.status(200).json(results[0]);
  });
});


app.get("/packagedetails/:id", (req, res) => 
{
  const id = req.params.id;

  db.query(
    "SELECT * FROM tbl_tours WHERE tour_id = ?", [id], (err, results) => 
    {
      if (err)
      {
        return res.status(500).json({ error: err });
      } 
      res.json(results[0]);
    }
  );
});

app.get("/packageImages/:id", (req, res) => 
{
  const id = req.params.id;

  db.query(
    "SELECT * FROM tbl_tour_images WHERE tour_id = ?", [id], (err, results) => 
    {
      if (err)
      {
        return res.status(500).json({ error: err });
      } 
      res.json(results);
    }
  );
});

app.get("/packageReview/:id", (req, res) => 
{
  const id = req.params.id;

  db.query(
    "SELECT * FROM tbl_review WHERE tour_id = ? order by review_id", [id], (err, results) => 
    {
      if (err)
      {
        return res.status(500).json({ error: err });
      } 
      res.json(results);
    }
  );
});

app.get("/tourrating/:id", (req, res) => 
{
  const Id = req.params.id;

  const sql = `SELECT ROUND(AVG(rating),1) AS avg_rating, COUNT(*) AS total_reviews FROM tbl_review WHERE tour_id = ?`;

  db.query(sql, [Id], (err, result) => 
  {
    if (err) 
    {
      return res.status(500).json(err);
    }
    res.json({total_reviews:result[0].total_reviews , avg_rating:result[0].avg_rating });
  });
});

app.get("/singlePackageCard/:id", (req, res) => 
{
  const id = req.params.id
  db.query("SELECT * FROM tbl_tours where tour_id = ? ", [id] , (err, results) => 
  {
    if (err)  
    {
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
});

app.get("/package_dates/:id", (req, res) => 
{
  const id = req.params.id;
  db.query("SELECT * FROM tbl_tour_dates where tour_id = ?", [id], (err, results) => 
  {
    if (err)  
    {
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
});

app.get("/pacakges_seats/:id", (req, res) => 
{
  const id = req.params.id
  db.query("SELECT * FROM tbl_tour_dates where tour_id = ? ", [id] , (err, results) => 
  {
    if (err)
    {
       return res.status(500).json({ error: err }); 
    } 
    res.json(results);
  });
});


app.get("/dateSeats/:id", (req, res) => {

    const sql = `SELECT available_seats FROM tbl_tour_dates WHERE date_id = ?`;

    db.query(sql, [req.params.date_id], (err, result) => {

        if (err || result.length === 0) {
            return res.status(500).json({ error: "Date not found" });
        }

        res.json(result[0]);
    });
});

//========================================Payment Table========================

app.post("/pay_payment/:id" , upload.none() , verifyToken ,  (req,res) =>
{
    const book_id = req.params.id
    const user_id = req.user.user_id
    const {payment_mode ,  payment_amount} = req.body

  const getBooking = "SELECT tour_id, date_id , persons FROM tbl_booking WHERE booking_id = ?";
  db.query(getBooking, [book_id], (err0, bookingData) =>
  {
    if (err0 || bookingData.length === 0)
    {
      return res.status(500).json({ error: err0 || "Booking not found" });
    }

    const package_id = bookingData[0].tour_id;
    const date_id = bookingData[0].date_id;
    const persons = bookingData[0].persons;

    const sql="insert into tbl_payment(booking_id,user_id,payment_mode,amount) Values (?,?,?,?)"
    db.query(sql , [ book_id, user_id ,payment_mode , payment_amount ] , (err,results) =>
    {
      if(err)
      {
        return res.status(500).json({error:err})
      }
    
      const sql2= "update tbl_booking set paid_amount = paid_amount + ? where booking_id = ?"
      db.query(sql2 , [ payment_amount , book_id ] , (err,results) =>
      {
        if(err)
        {
          return res.status(500).json({error:err})
        }
      
      const sql12= "update tbl_booking set active_amount = paid_amount where booking_id = ?"
      db.query(sql12 , [ book_id ] , (err,results) =>
      {
        if(err)
        {
          return res.status(500).json({error:err})
        }

      const sql3= "update tbl_booking set due_amount = total_amount - paid_amount  where booking_id = ?"
      db.query(sql3 , [ book_id ] , (err3,results) =>
      {
        if(err3)
        {
          return res.status(500).json({error:err3})
        }
      
      const sql4= "update tbl_booking set payment_status = 'Paid' where booking_id = ? AND due_amount = 0"
      db.query(sql4 , [ book_id ] , (err4,results4) =>
      {
        if(err4)
        {
          return res.status(500).json({error:err4})
        }

      const sql5= "update tbl_booking set booking_status = 'Confirm' where booking_id = ? AND payment_status = 'Paid'"
      db.query(sql5 , [ book_id ] , (err5,results5) =>
      {
        if(err5)
        {
          return res.status(500).json({error:err5})
        }

        if(results4.affectedRows > 0)
        {
            const sql7 = `UPDATE tbl_tour_dates SET available_seats = available_seats - ?,confirm_seats = confirm_seats + ? WHERE tour_id = ? AND date_id = ? AND available_seats >= ?`;            
            db.query(sql7 , [ persons , persons, package_id , date_id , persons ] , (err7,results7) =>
            {
              if(err7)
              {
                return res.status(500).json({error:err7})
              }

              if (results7.affectedRows === 0) 
              {
                  return res.json({
                  status: "failed",
                  message: `You have booked ${persons} passenger(s), but currently only limited seats are available. Therefore, you cannot proceed with the payment. If you have already made a payment, you may request an 80% refund.`
                });
              }

              const sql8= "update tbl_tour_dates set package_seats_status = 'Package Full' Where available_seats = 0 AND tour_id = ? AND date_id = ?"
              db.query(sql8 , [ package_id , date_id] , (err8) =>
              {
                if(err8)
                {
                  return res.status(500).json({error:err8})
                }

                res.json
                ({
                  status:"success",
                  message:"Full Payment Successful & Booking Confirmed"
                })
              })
            })
        }
        else
        {
          res.json
          ({
            status:"success",
            message:"Partial Payment Successful"
          })
        }
      })
    })
  })
})
})
})
})
})

app.get("/view_my_payment_history/:id",verifyToken, (req, res) => 
{
  const u_id = req.user.user_id
  const book_id = req.params.id

  db.query("SELECT * FROM tbl_payment where booking_id = ? AND user_id = ? ",[book_id,u_id] , (err, results) => 
  {
    if (err)
    {
       return res.status(500).json({ error: err }); 
    } 
    res.json(results);
  });
});

app.get("/view_my_all_payment_history",verifyToken, (req, res) => 
{
  const u_id = req.user.user_id

  db.query("SELECT * FROM tbl_payment where user_id = ? ",[u_id] , (err, results) => 
  {
    if (err)
    {
       return res.status(500).json({ error: err }); 
    } 
    res.json(results);
  });
});

//============================================== TBL_PASSANGERS ==================================================
app.get("/view_passanger/:id", (req, res) => 
  {
    const id = req.params.id;
    db.query("SELECT * FROM tbl_tour_passanger where booking_id = ?", [id], (err, results) => 
    {
      if (err)  
      {
        return res.status(500).json({ error: err });
      }
      res.json(results);
  });
});


//============================================== REFUND APIs ==================================================

app.post("/send_refund_request/:id", verifyToken, (req, res) => 
{
  const id = req.params.id
  const {passenger_ids  } = req.body;

  const ids_string = passenger_ids.join(",");

  const sql = `UPDATE tbl_booking SET refund_status = ?, cancle_passanger_id = ? WHERE booking_id = ? `;
  db.query(sql, ['Pending', ids_string, id], (err, result) => {

    if (err) 
    {
      return res.status(500).json({ error: err });
    }
  const sql = `UPDATE tbl_tour_passanger SET refund_status = ? WHERE passanger_id IN (?) `;
  db.query(sql, ['Pending', passenger_ids], (err, result) => {

    if (err) 
    {
      return res.status(500).json({ error: err });
    }

    res.json
    ({
      status: "success",
      message: "Refund Request Sent To Admin"
    });
    });
  });
});


app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));