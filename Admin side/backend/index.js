const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 5000;
const JWT_SECRET = "ADMIN_LOGIN_12345";

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

const upload = multer();

const PakageStorage = multer.diskStorage
({
  destination: function (req, file, cb) 
  {
    cb(null, "uploads/pakage");
  },
  filename: function (req, file, cb) 
  {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const uploadPakage = multer({ storage: PakageStorage });

//====================================================================================

const View_Image_Storage = multer.diskStorage
({
  destination: function (req, file, cb) 
  {
    cb(null, "uploads/Tour_Images");
  },
  filename: function (req, file, cb) 
  {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const Upload_View_Images = multer({ storage: View_Image_Storage });

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


//============================================= TBL_ADMIN ====================================================

app.post("/adminLogin", upload.none(), (req, res) => 
{
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM tbl_admin WHERE email = ? AND password = ?", [email, password],(err, results) => 
    {

      if (results.length === 0) 
      {
        return res.status(401).json({ message: "Login Failed" });
      }

      const token = jwt.sign({ email: email }, JWT_SECRET , { expiresIn: "1h" });

      res.json({status: "success",token: token});
    }
  );
});



//=================================================== TBL_BOOKING =============================================
//VIEW BOOKING GET API

app.get("/viewbooking", (req, res) => 
{
    db.query("SELECT * FROM tbl_booking", (err, bookings) => 
    {
        if (err) return res.status(500).json({ error: err });

        db.query("SELECT * FROM tbl_tour_passanger", (err, passengers) => 
        {
            if (err) return res.status(500).json({ error: err });

            db.query("SELECT * FROM tbl_payment", (err, payments) => 
            {
                if (err) return res.status(500).json({ error: err });

                const finalData = bookings.map(booking => 
                {
                    return {
                        ...booking,

                        passengers: passengers.filter(p => 
                            p.booking_id === booking.booking_id
                        ),

                        payments: payments.filter(pay => 
                            pay.booking_id === booking.booking_id
                        )
                    };
                });

                res.json(finalData);
            });
        });
    });
});

app.get("/view_pending_booking", (req, res) => 
{
  db.query("SELECT * FROM tbl_booking where booking_status='Pending'", (err, results) => 
  {
    if (err)
    {
       return res.status(500).json({ error: err }); 
    } 
    res.json(results);
  });
});

app.get("/view_confirm_booking", (req, res) => 
{
  db.query("SELECT * FROM tbl_booking where booking_status='Confirm'", (err, results) => 
  {
    if (err)
    {
       return res.status(500).json({ error: err }); 
    } 
    res.json(results);
  });
});

app.get("/view_cancle_booking", (req, res) => 
{
  db.query("SELECT * FROM tbl_booking where booking_status='Cancelled'", (err, results) => 
  {
    if (err)
    {
       return res.status(500).json({ error: err }); 
    } 
    res.json(results);
  });
});

app.get("/totalCancleBooking", (req, res) => 
  {
    db.query("SELECT COUNT(*) as TotalCancle FROM tbl_booking where booking_status='Cancelled'", (err, results) => 
    {
      if (err)  
      {
        return res.status(500).json({ error: err });
      }
      res.json
      ({ 
        status:"success",
        count: results[0].TotalCancle 
      });
  });
});

app.get("/totalConfirmBooking", (req, res) => 
  {
    db.query("SELECT COUNT(*) as TotalConfirm FROM tbl_booking where booking_status='Confirm'", (err, results) => 
    {
      if (err)  
      {
        return res.status(500).json({ error: err });
      }
      res.json
      ({ 
        status:"success",
        count: results[0].TotalConfirm 
      });
  });
});

app.get("/totalPendingBooking", (req, res) => 
  {
    db.query("SELECT COUNT(*) as TotalPending FROM tbl_booking where booking_status='Pending'", (err, results) => 
    {
      if (err)  
      {
        return res.status(500).json({ error: err });
      }
      res.json
      ({ 
        status:"success",
        count: results[0].TotalPending 
      });
  });
});

app.get("/totalBooking", (req, res) => 
  {
    db.query("SELECT COUNT(*) as TotalBooking FROM tbl_booking", (err, results) => 
    {
      if (err)  
      {
        return res.status(500).json({ error: err });
      }
      res.json
      ({ 
        status:"success",
        count: results[0].TotalBooking 
      });
  });
});

app.get("/totalIncome", (req, res) => 
  {
    db.query("SELECT SUM(active_amount + cancellation_charge) AS revenue FROM tbl_booking WHERE booking_status = 'Confirm' || booking_status = 'Cancelled'", (err, results) => 
    {
      if (err)  
      {
        return res.status(500).json({ error: err });
      }
      res.json
      ({ 
        status:"success",
        count: results[0].revenue 
      });
  });
});

app.put("/cancle_book_status/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    "UPDATE tbl_booking SET booking_status='Cancelled' Where booking_id = ? ", [id], (err, results) => 
    {
      if (err)
      {
        return res.status(500).json({ error: err });
      } 
      res.json({
        status:"success",
        message: "Booking Cancle successfully!"
      });
    }
  );
});
//=================================================== TBL_TOUR_PASSANGER =============================================

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

app.get("/view_indiviual_booking/:id", (req, res) => 
  {
    const id = req.params.id;
    db.query("SELECT * FROM tbl_booking where booking_id = ?", [id], (err, results) => 
    {
      if (err)  
      {
        return res.status(500).json({ error: err });
      }
      res.json(results);
  });
});

app.get("/view_indiviual_payment/:id", (req, res) => 
  {
    const id = req.params.id;
    db.query("SELECT * FROM tbl_payment where booking_id = ?", [id], (err, results) => 
    {
      if (err)  
      {
        return res.status(500).json({ error: err });
      }
      res.json(results);
  });
});

app.get("/view_indiviual_package_summary/:id", (req, res) => 
  {
    const id = req.params.id;
    db.query("SELECT COUNT(booking_id) AS total_bookings, SUM(CASE WHEN booking_status='Pending' THEN 1 ELSE 0 END) AS total_pending_bookings, SUM(CASE WHEN booking_status='Confirm' THEN 1 ELSE 0 END) AS total_confirm_bookings, SUM(CASE WHEN booking_status='Cancelled' THEN 1 ELSE 0 END) AS total_cancelled_bookings, SUM(persons) AS total_persons, SUM(active_person) AS total_active_person, SUM(cancelled_person) AS total_cancelled_person, SUM(paid_amount) AS total_paid_amount, SUM(active_amount) AS total_active_amount, SUM(refund_amount) AS total_refund_amount, SUM(cancellation_charge) AS total_cancellation_charge, SUM(due_amount) AS total_due_amount FROM tbl_booking WHERE tour_id = ?;" , [id], (err, results) => 
    {
      if (err)  
      {
        return res.status(500).json({ error: err });
      }
      res.json(results);
  });
});

app.get("/view_package_bookings/:id", (req, res) => 
  {
    const id = req.params.id;
    db.query("SELECT * FROM tbl_booking where tour_id = ?", [id], (err, results) => 
    {
      if (err)  
      {
        return res.status(500).json({ error: err });
      }
      res.json(results);
  });
});





app.get("/view_all_passanger", (req, res) => 
  {
    db.query("SELECT * FROM tbl_tour_passanger", (err, results) => 
    {
      if (err)  
      {
        return res.status(500).json({ error: err });
      }
      res.json(results);
  });
});

app.get("/view_all_active_passanger", (req, res) => 
  {
    db.query("SELECT * FROM tbl_tour_passanger where passanger_status = 'Active'", (err, results) => 
    {
      if (err)  
      {
        return res.status(500).json({ error: err });
      }
      res.json(results);
  });
});

app.get("/view_all_cancelled_passanger", (req, res) => 
  {
    db.query("SELECT * FROM tbl_tour_passanger where passanger_status = 'Cancelled'", (err, results) => 
    {
      if (err)  
      {
        return res.status(500).json({ error: err });
      }
      res.json(results);
  });
});

//=================================================== TBL_PAYMENT =============================================


app.get("/view_all_payment", (req, res) => 
  {
    db.query("SELECT tbl_payment.*, tbl_user.username FROM tbl_payment INNER JOIN tbl_user ON tbl_payment.user_id = tbl_user.user_id;" , (err, results) => 
    {
      if (err)  
      {
        return res.status(500).json({ error: err });
      }
      res.json(results);
  });
});



//=================================================== TBL_ENQUIRIES =============================================
//VIEW ENQUIRY GET API

app.get("/viewenquiry", (req, res) => 
{
  db.query("SELECT * FROM tbl_enquiries", (err, results) => 
  {
    if (err)
    {
       return res.status(500).json({ error: err }); 
    } 
    res.json(results);
  });
});

app.get("/view_replied_enquiry", (req, res) => 
{
  db.query("SELECT * FROM tbl_enquiries WHERE enquiry_status = 'Replied'", (err, results) => 
  {
    if (err)
    {
       return res.status(500).json({ error: err }); 
    } 
    res.json(results);
  });
});

app.get("/view_pending_enquiry", (req, res) => 
{
  db.query("SELECT * FROM tbl_enquiries WHERE enquiry_status = 'Pending'", (err, results) => 
  {
    if (err)
    {
       return res.status(500).json({ error: err }); 
    } 
    res.json(results);
  });
});


app.get("/Individual_enquiry/:id", (req, res) => 
{
  const id = req.params.id
  db.query("SELECT * FROM tbl_enquiries where enquiry_id = ? ", [id] , (err, results) => 
  {
    if (err)
    {
       return res.status(500).json({ error: err }); 
    } 
    res.json(results);
  });
});

app.put("/update_enquiry/:id" , upload.none() , (req,res) => 
{
  const id = req.params.id
  const {enq_reply} = req.body

  const sql = `UPDATE tbl_enquiries SET enquiry_status = 'Replied' , reply_message = ? Where enquiry_id = ? `
  db.query(sql, [enq_reply , id] , (err,result) => 
  {
    if(err)
    {
      return res.status(500).json({error : err});
    }
    res.json({
        status : "success",
        message : "Replied Succeesfully"
    })
  })
})

app.get("/totalEnquiry", (req, res) => 
  {
    db.query("SELECT COUNT(*) as TotalEnquiry FROM tbl_enquiries", (err, results) => 
    {
      if (err)  
      {
        return res.status(500).json({ error: err });
      }
      res.json
      ({ 
        status:"success",
        count: results[0].TotalEnquiry 
      });
  });
});

//=================================================== TBL_REVIEW =============================================
//VIEW REVIEW GET API

app.get("/viewreview", (req, res) => 
{
  db.query("SELECT * FROM tbl_review", (err, results) => 
  {
    if (err)
    {
       return res.status(500).json({ error: err }); 
    } 
    res.json(results);
  });
});

app.delete("/deletereview/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    "Delete From tbl_review where review_id = ?", [id], (err, results) => 
    {
      if (err)
      {
        return res.status(500).json({ error: err });
      } 
      res.json({
        status:"success",
        message: "Tour Review Deleted successfully!"
      });
    }
  );
});

//=================================================== TBL_PACKGES =============================================
// ADD PACKAGES POST API

app.post("/addpackages", uploadPakage.single("tourimg"), (req, res) => 
{
  const {tourtitle , tourdescription , tourlocation , tourduration , tourprice ,discount, max_person} = req.body;
  const tourimg = req.file.filename;
  let startDates = req.body.start_dates; 

  if (!Array.isArray(startDates)) 
  {
    startDates = [startDates];
  }

  const sql = "INSERT INTO tbl_tours (title , description , location , duration , price ,discount,  main_image) VALUES (?, ?, ?, ?, ?,?, ?)";
  db.query(sql, [tourtitle , tourdescription , tourlocation , tourduration , tourprice ,discount, tourimg ], (err, result) => 
    {
      if (err)
      {
        return res.status(500).json({ error: err });
      } 

      const tourId = result.insertId;

      const dateSql = `INSERT INTO tbl_tour_dates (tour_id, start_date, max_seats , confirm_seats , available_seats , package_seats_status) VALUES ?`;
      const dateValues = startDates.map(date => [tourId, date, max_person, 0 , max_person,"Available"]);

      db.query(dateSql, [dateValues], (err2) => 
      {
        if (err2) 
        {
          return res.status(500).json(err2);
        }

      
        res.json
        ({
          status: "success",
          message: "Tour Package added successfully!",
          id: tourId
         });
        });
      });
    });

// VIEW PACKAGES GET API  

app.get("/viewpackages", (req, res) => 
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

// counting

app.get("/totalpackages", (req, res) => 
  {
    db.query("SELECT COUNT(*) as TotalTours FROM tbl_tours", (err, results) => 
    {
      if (err)  
      {
        return res.status(500).json({ error: err });
      }
      res.json
      ({ 
        status:"success",
        count: results[0].TotalTours 
      });
  });
});

//INFORMATION ABOUT SPECIFIC TOUR / GET API 

app.get("/Editpackages/:id", (req, res) => 
  {
    const id = req.params.id;
    db.query("SELECT * FROM tbl_tours where tour_id = ?", [id], (err, results) => 
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

app.get("/pacakges_seat_update/:id", (req, res) => 
{
  const id = req.params.id
  db.query("SELECT * FROM tbl_tour_dates where date_id = ? ", [id] , (err, results) => 
  {
    if (err)
    {
       return res.status(500).json({ error: err }); 
    } 
    res.json(results);
  });
});

app.put("/Editpackages/:id", uploadPakage.single("tourimg"), (req, res) => {

  const id = req.params.id;
  const { tourtitle , tourdescription , tourlocation , tourduration , tourprice , discount } = req.body;
  const tourimg = req.file ? req.file.filename : null;

  let startDates = req.body.start_dates;


  // if (!Array.isArray(startDates)) 
  // {
  //   startDates = [startDates];
  // }

  const updateSql = `UPDATE tbl_tours SET title = ?, description = ?, location = ?, duration = ?, price = ?, discount=? , main_image = IFNULL(?, main_image) WHERE tour_id = ?`;
  db.query(updateSql,[tourtitle, tourdescription, tourlocation, tourduration, tourprice, discount , tourimg, id], (err) => 
  {
      if (err) 
      {
        return res.status(500).json({ error: err });
      }

      if (!startDates) 
      {
        return res.json({
          status: "success",
          message: "Tour updated (dates unchanged)"
        });
      }

      if (!Array.isArray(startDates)) {
        startDates = [startDates];
      }

    const deleteSql = `DELETE FROM tbl_tour_dates WHERE tour_id = ?`;
    db.query(deleteSql, [id], (err2) => 
    {
      if (err2) 
      { 
        return res.status(500).json({ error: err2 });
      }

      const dateValues = startDates.map(date => [id, date]);

      const insertSql = `INSERT INTO tbl_tour_dates (tour_id, start_date) VALUES ?`;
      db.query(insertSql, [dateValues], (err3) => 
      {
        if (err3) 
        {
          return res.status(500).json({ error: err3 });
        }

        res.json
        ({
          status: "success",
          message: "Tour Package Updated Successfully"
        });
      });
    });
  });
});

app.put("/update-max-person/:id", (req, res) => 
{
  const packageId = req.params.id;
  const { max_person } = req.body;

  const maxSeats = parseInt(max_person);

  if (isNaN(maxSeats) || maxSeats < 0) 
  {
    return res.status(400).json({ message: "Invalid max person value" });
  }

  const getSql = `SELECT confirm_seats FROM tbl_tour_dates WHERE date_id = ?`;

  db.query(getSql, [packageId], (err, result) => 
  {

    if (err) return res.status(500).json(err);

    if (result.length === 0) 
    {
      return res.status(404).json({ message: "Package not found in seats table" });
    }

    const confirmSeats = result[0].confirm_seats;
    // confirmSeats = 5

    const availableSeats = maxSeats - confirmSeats;
    // AvaialbleSeats = 35 - 5 = 30
    // AvialbleSeats = 30 

    const status = availableSeats <= 0 ? "Package Full" : "Available";
  
    const updateSql = `UPDATE tbl_tour_dates SET max_seats = ? , available_seats = ? , package_seats_status = ? WHERE date_id = ? `;

    db.query(updateSql, [maxSeats, availableSeats, status, packageId], (err2) => 
    {
      if (err2) return res.status(500).json(err2);

      res.json
      ({
        status: "success",
        message: "Max seats updated successfully"
      });
    });
  });
});


app.delete("/viewpackages/:id", (req, res) => {
  const id = req.params.id;

  db.query( "SELECT COUNT(*) AS total_booking FROM tbl_booking WHERE tour_id = ?", [id], (err, countResult) => 
    {
      if (err) 
      {
        return res.status(500).json({ error: err });
      }

      if (countResult[0].total_booking > 0) 
      {
        return res.json({
          status: "failed",
          message: "Package Cannot Be Deleted Because Booking Is Already Exists"
        });
      }

      db.query("DELETE FROM tbl_tours WHERE tour_id = ?", [id], (err, results) => {
      if (err) 
      {
        return res.status(500).json({ error: err });
      }
      res.json({
        status: "success",
        message: "Tour Package Deleted Successfully!"
      });
    });
  });
});


// =========================================== TBL_TOUR_IMAGES ===========================================
//ADD TOUR IMAGES POST API

app.post("/addtourimage", Upload_View_Images.array("tourimg", 10), (req, res) => 
{
  const { tourid } = req.body;
  const images = req.files.map(file => [tourid, file.filename]);


  const sql = "INSERT INTO tbl_tour_images (tour_id, image) VALUES ?";
  db.query(sql, [images], (err, result) => 
    {
      if (err) 
      {
        return res.status(500).json({ error: err });
      }
      res.json
      ({ 
        status:"success",
        message: "Tour Image added successfully!", 
        id: result.insertId 
      });
    });
  });

// VIEW TOUR IMAGES GET API

app.get("/viewtourimage", (req, res) => 
{
  db.query("SELECT * FROM tbl_tour_images order by img_id", (err, results) => 
  {
    if (err)
    {
       return res.status(500).json({ error: err }); 
    } 
    res.json(results);
  });
});

app.delete("/view-image/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    "Delete From tbl_tour_images where img_id = ?", [id], (err, results) => 
    {
      if (err)
      {
        return res.status(500).json({ error: err });
      } 
      res.json({
        status:"success",
        message: "Image Deleted successfully!"
      });
    }
  );
});

// =========================================== TBL_USER =====================================================
app.get("/viewusers", (req, res) => 
{
  db.query("SELECT * FROM tbl_user", (err, results) => 
  {
    if (err)
    {
       return res.status(500).json({ error: err }); 
    } 
    res.json(results);
  });
});

app.get("/totalusers", (req, res) => 
  {
    db.query("SELECT COUNT(*) as TotalUsers FROM tbl_user", (err, results) => 
    {
      if (err)  
      {
        return res.status(500).json({ error: err });
      }
      res.json
      ({ 
        status:"success",
        count: results[0].TotalUsers 
      });
  });
});

app.delete("/deleteuser/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    "Delete From tbl_user where user_id = ?", [id], (err, results) => 
    {
      if (err)
      {
        return res.status(500).json({ error: err });
      } 
      res.json({
        status:"success",
        message: "User Deleted successfully!"
      });
    }
  );
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



app.get("/packageseatsdetails/:id", (req, res) => 
{
  const id = req.params.id;

  db.query(
    "SELECT * FROM tour_seats WHERE package_id = ?", [id], (err, results) => 
    {
      if (err)
      {
        return res.status(500).json({ error: err });
      } 
      res.json(results[0]);
    }
  );
});

app.post("/approve_refund/:id", (req, res) =>
{
  const booking_id = req.params.id;

  const getSql = "SELECT * FROM tbl_booking WHERE booking_id = ? AND refund_status = 'Pending'";

  db.query(getSql, [booking_id], (err, result) =>
  {
    if (err) return res.status(500).json({ error: err });

    if (!result || result.length === 0) 
    {
      return res.status(404).json({ message: "Booking not found or already processed" });
    }

    const booking = result[0];

    const seatSql = "SELECT available_seats FROM tbl_tour_dates WHERE date_id = ?";

    db.query(seatSql, [booking.date_id], (errSeat, seatResult) => 
    {
      if (errSeat) return res.status(500).json({ error: errSeat });

      const available_seats = seatResult[0]?.available_seats || 0;
      const isSeatFull = available_seats === 0;


    const ids = booking.cancle_passanger_id.split(",");
    const cancelCount = ids.length;

    const paid_amount = Number(booking.paid_amount);
    const persons = Number(booking.persons);
    const active_person = Number(booking.active_person);
    const cancelled_person = Number(booking.cancelled_person || 0);
    const already_refunded = Number(booking.refund_amount || 0);

    const per_person_price = persons > 0 ? paid_amount / persons : 0;

    let refund_per_person = 0;
    let charge_per_person = 0;

    if (booking.payment_status !== "Paid") 
    {
        // Partial payment case
        if (isSeatFull) 
        {
            // 🔥 100% refund
            refund_per_person = per_person_price * 0.80;
            charge_per_person = per_person_price * 0.20;
        } 
        else 
        {
            // 80% refund
            refund_per_person = per_person_price * 0.80;
            charge_per_person = per_person_price * 0.20;
        }
    } 
    else 
    {
        // Full payment
        refund_per_person = per_person_price * 0.80;
        charge_per_person = per_person_price * 0.20;
    }
    const new_total_cancelled = cancelled_person + cancelCount;

    const remainingPersons = active_person - cancelCount;

    const total_refund_should_be = refund_per_person * new_total_cancelled;

    const this_time_refund = total_refund_should_be - already_refunded;

    const new_active_amount = per_person_price * remainingPersons;

    const total_cancellation_charge = charge_per_person * new_total_cancelled;

    const bookingStatus = remainingPersons === 0 ? "Cancelled" : "Confirm";
    const paymentStatus = remainingPersons === 0 ? "Full Refund Approved" : "Paid";

    const placeholders = ids.map(() => "?").join(",");

    const updatePassengerSql = ` UPDATE tbl_tour_passanger SET passanger_status = 'Cancelled', refund_status = "Approved" , cancle_date = NOW() WHERE passanger_id IN (${placeholders}) `;

    db.query(updatePassengerSql, ids, (err2) =>
    {
      if (err2)
      {
        return res.status(500).json({ error: err2 });
      }

      const updateBookingSql = `UPDATE tbl_booking SET due_amount= 0 , active_person = ?, cancelled_person = ?,active_amount = ?,refund_amount = ?, cancellation_charge = ? ,  refund_status = 'Approved', booking_status = ? , payment_status = ?, cancle_passanger_id = NULL WHERE booking_id = ? `;

      db.query(updateBookingSql, [ remainingPersons, new_total_cancelled, new_active_amount, total_refund_should_be, total_cancellation_charge, bookingStatus, paymentStatus,  booking_id ], (err3) =>
      {
        if (err3)
        {
          return res.status(500).json({ error: err3 });
        }  
        if (booking.payment_status === "Paid") 
        {

          const updateSeatSql = ` UPDATE tbl_tour_dates SET available_seats = available_seats + ?, confirm_seats = confirm_seats - ? WHERE tour_id = ? AND date_id = ? `;

          db.query(updateSeatSql, [ cancelCount, cancelCount, booking.tour_id , booking.date_id], (err4) =>
          {
            if (err4)
            {
              return res.status(500).json({ error: err4 });
            }
            
            res.json
            ({
              status: "success",
              refund_given_this_time: this_time_refund,
              total_refund: total_refund_should_be,
              remaining_persons: remainingPersons
            });
          });
        }
        else 
        {
          return res.json({
            status: "success",
            refund_given_this_time: this_time_refund,
            total_refund: total_refund_should_be,
            remaining_persons: remainingPersons
          });
        }
      });
    });
  });
});
});

app.post("/reject_refund/:id", (req, res) => {

  const booking_id = req.params.id;

  const checkSql = `SELECT * FROM tbl_booking WHERE booking_id = ?`;

  db.query(checkSql, [booking_id], (err, result) => 
  {

    if (err) 
    {
      return res.status(500).json({ error: err }); 
    }

    const booking = result[0];

    const ids = booking.cancle_passanger_id.split(",");
    const placeholders = ids.map(() => "?").join(",");

    const updatePassengerSql = `UPDATE tbl_tour_passanger SET passanger_status = 'Active',refund_status = "Rejected", cancle_date = Now() WHERE passanger_id IN (${placeholders})`;

    db.query(updatePassengerSql, ids, (err2) => 
    {
      if (err2) return res.status(500).json({ error: err2 });

      const rejectSql = ` UPDATE tbl_booking SET refund_status = 'Rejected', cancle_passanger_id = NULL WHERE booking_id = ? `;

      db.query(rejectSql, [booking_id], (err3) => 
      {

      if (err3) 
      {
        return res.status(500).json({ error: err3 });
      }
        res.json
        ({
          status: "success",
          message: "Refund request rejected and passengers restored."
        });
      });
    });
  });
});
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));