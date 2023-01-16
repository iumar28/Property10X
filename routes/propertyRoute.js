const express = require("express");
const router = express.Router();
const Property = require('../models/propertyModel')
const Apifeatures = require('../utils/Apifeatures')


//working fine
router.get('/all',async(req,res)=>{
    // res.send(`working fine`)
    const allproperty = await Property.find();
    res.send(allproperty);
});

//get using query
router.get('/getq', async(req,res)=>{
    const apiFeatures = new Apifeatures(Property.find(),req.query)
    .search()
    // .filter();
    const product = await apiFeatures.query;
    res.send(product);
})

//working fine
router.post('/addprop',async(req,res)=>{
    // res.send(`post route is working fine`)
    const addprop =  new Property(req.body);
    try {
        await addprop.save();
        res.send(addprop);
    }
    catch(error) {
        res.status(400).send(error);
    }
})

//working fine
//to count the number of cities
router.get('/count/:city',(req, res) => {
    Property.find({city: req.params.city}).count()
        .then(docs => {
            res.json(docs);
        })
        .catch(err => {
            res.json(err);
        })
});

//using this, you can count cities, location, 
router.get('/count/for/:for',(req, res) => {
    // res.send(`working fine`)
    Property.find({location: req.params.for}).count()
        .then(docs => {
            res.json(docs);
        })
        .catch(err => {
            res.json(err);
        })
});

//this is for the search operation
router.get('/jobs', (req, res) => {
    const { skills, experience } = req.query;
    
    // Find all job postings that match the provided skills and experience level
    job.JobPosting.find({ skills: { $in: skills }, experience: { $lte: experience } })
      .then(jobs => res.json(jobs))
      .catch(err => res.status(400).json('Error: ' + err));
 });

router.post('/contact',(req, res)=>{

    nodemailer.createTestAccount((err, account) => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: account.user, // generated ethereal user
                pass: account.pass // generated ethereal password
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: `${req.body.email}`, // sender address
            to: `${req.body.reciever}`, // list of receivers
            subject: 'Hello ✔', // Subject line
            text: `${req.body.message}`, // plain text body
            html: `<br/><p>Please Contact on</p><br/><span>Number: ${req.body.contactNumber} Email: ${req.body.email}</span>` // html body
        };
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            res.status(200).json({message:'Email Sent Successfully'});

        });
    });
});

//working fine
//this is to find out the email address
router.get('/my/:email', (req, res)=>{
    Property.find({email: req.params.email})
        .then(docs => res.json(docs))
        .catch(err => res.status(400).json({failed: 'Error While Getting your Properties'}));

});

router.delete('/my/delete/:id',(req, res)=>{
    Property.findOneAndDelete(req.params.id)
        .then(docs => res.json(docs))
        .catch( err => res.status(400).json({failed:'Error While Deleting'}));
});




module.exports = router;