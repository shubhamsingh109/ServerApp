    let supertest =require( 'supertest');
    let express  =require( 'express');
    let sinon =require( 'sinon');
    let chai =require( 'chai');
    let expect = require('chai').expect;
    let assert = require('chai').assert;
    let should = require('chai').should();

    let app  =require( '../app').default;
    let card =require( '../routes/card');
    let expenseSchema =require( '../model/Schema');
    let findStub = sinon.stub(expenseSchema,'find');
    let findOneStub = sinon.stub(expenseSchema,'findOne');
    let updateStub=sinon.stub(expenseSchema,'update');
    let regStub=sinon.stub(expenseSchema.prototype,'save');
    let updateOneStub=sinon.stub(expenseSchema.prototype,'updateOne');
    let server = supertest(app);
    let modelstubDelete =sinon.stub(expenseSchema,'remove');
    let config=require('../config/appTest.config');
    /*===================used to generate token====================*/
    let jwtToken;

    function loginUser()
    {
     // console.log("login user",config.testConf.tokenTest)
      findOneStub.yields(null, config.testConf.tokenTest);
      return function(done)
      {
       server
       .post('/login')
       .send({"email":"nishantjaiswal49@gmail.com","password":"12345"})
       .end(function(err, res) {
         should.not.exist(err);
         jwtToken = res.body.token;
        // console.log("token",jwtToken);
         done();
       });
     };
   }
   before(loginUser());

   /*=========================Test Cases for registration========================*/

  //  describe('Register method is tested here',()=>{

  //   beforeEach(()=>{
  //     findStub.yields(null,[]);
  //     regStub.yields(null,[config.testConf.registerTest])
  //   });

  //   it('Registration must be a success',(done)=>{
  //     server
  //     .post('/register')
  //     .set('Authorization',jwtToken)
  //     .expect('Content-Type', /json/)
  //     .expect(200)
  //     .send(config.testConf.registerTest)
  //     .end((err,res)=>{
  //       if(err){
  //        console.log(err)
  //      }
  //      else{
  //       res.body[0].email.should.be.equal(config.testConf.registerTest.email);
  //       done();
  //     }
  //   });
  //   });

  //   it('Registration must be a success',(done)=>{
  //     server
  //     .post('/register')
  //     .set('Authorization',jwtToken)
  //     .expect('Content-Type', /json/)
  //     .expect(200)
  //     .send(config.testConf.registerTest)
  //     .end((err,res)=>{
  //       if(err){
  //        console.log(err)
  //      }
  //      else{
  //       res.body[0].email.should.not.be.equal(config.testConf.registerTest.emailNegative);
  //       done();
  //     }
  //   });
  //   });
  // });


  //  /*=========================Test Cases for add card========================*/


  //  describe('Add card method is tested here',()=>{
  //   let userData=config.testConf.registerTest;
  //   beforeEach(()=>{
  //     findStub.yields(null,[userData]);
  //     updateStub.yields(null,[userData]);
  //   });

  //   it('add card email test',(done)=>{
  //     server
  //     .post('/card/addcard')
  //     .expect('Content-Type', /json/)
  //     .expect(200)
  //     .send(userData)
  //     .end((err,res)=>{
  //       if(err){
  //        console.log(err)
  //      }else{
  //       assert.equal(res.body[0].email,config.testConf.registerTest.email);
  //       done();
  //     }
  //   });
  //   });

  //   it('add card email test',(done)=>{
  //     server
  //     .post('/card/addcard')
  //     .expect('Content-Type', /json/)
  //     .expect(200)
  //     .send(userData)
  //     .end((err,res)=>{
  //       if(err){
  //        console.log(err)
  //      }else{
  //       res.body[0].email.should.not.be.equal(config.testConf.registerTest.emailNegative);
  //       done();
  //     }
  //   });
  //   });

  // });

  //  /*=========================Test Cases for add flag========================*/

  //  describe('Add flag method is tested here',()=>{
  //   let userData=config.testConf.flagTest;
  //   beforeEach(()=>{
  //     updateOneStub.yields(null,[userData]);
  //   });
  //   it('get card must be a success',(done)=>{
  //     console.log("It is here............");
  //     server
  //     .post('/card/addflag')
  //     .expect('Content-Type', /json/)
  //     .expect(200)
  //     .send(userData)
  //     .end((err,res)=>{
  //       if(err){
  //        console.log(err)
  //      }else{
  //        assert.equal(res.body.flag,1);
  //        done();
  //      }
  //    });
  //   });
  //   it('get card must be a success',(done)=>{
  //     console.log("It is here............");
  //     server
  //     .post('/card/addflag')
  //     .expect('Content-Type', /json/)
  //     .expect(200)
  //     .send(userData)
  //     .end((err,res)=>{
  //       if(err){
  //        console.log(err)
  //      }else{
  //        res.body.flag.should.not.be.equal(0);
  //        done();
  //      }
  //    });
  //   });

  // });

  //  /*=========================Test Cases for login========================*/

  //  describe('User Login authentication ',(done) =>{

  //   beforeEach(() => {
  //     findOneStub.yields(null, config.testConf.tokenTest);
  //   });
  //   it("login user ",(done) => {
  //     server
  //     .post('/login')
  //     .send(config.testConf.loginTest)
  //     .end((err, res) => {
  //       if (err){
  //         console.log(err);
  //       }
  //       else{
  //         expect(res.body.success).to.equal(true);
  //         done();          
  //       }
  //     });
  //   });

  //   it("login user",(done) => {
  //     server
  //     .post('/login')
  //     .send(config.testConf.tokenTest)
  //     .end((err, res) => {
  //       if (err){
  //         console.log(err);
  //       }
  //       else{
  //         expect(res.body.success).to.equal(false);
  //         done();          
  //       }
  //     });
  //   });

  //   it("login user",(done) => {
  //     server
  //     .post('/login')
  //     .send(config.testConf.tokenTest)
  //     .end((err, res) => {
  //       if (err){
  //         console.log(err);
  //       }
  //       else{
  //         expect(res.body.message).to.equal(config.testConf.loginMessage.error);
  //         done();          
  //       }
  //     });
  //   });
  // });


  //  /*====================test cases for delete user================*/

  //  before(loginUser());

   describe('Delete user test cases ',(done) =>{
    beforeEach(() => {
      modelstubDelete.yields(null, {ok:1, n:1,err:config.testConf.deleteError.error});
      console.log(config.testConf.deleteError.error);
    });

    it('Delete user test case successful',(done) => {
      console.log(config.testConf.deleteTest);
      console.log(jwtToken);
      server
      .post('/deleteuser')

      .set('Authorization',jwtToken)
      .send(config.testConf.deleteTest)
     // .expect('Content-Type',/json/)
          //.expect(200)
          .end((err, res) => {
            if (err)
              {console.log(err);
              }
              else   {
                console.log(res.body);
                expect(res.body.n).to.equal(1);
                expect(res.body.ok).to.equal(1);
                done();          
              }
            });
        });

    // it('Delete user test case if error occurs',(done) => {
    //   server
    //   .post('/deleteuser')
    //   .set('Authorization',jwtToken)
    //   .send({})
    //       //.expect(200)
    //       .end((err, res) => {
    //         if (err){
    //           console.log(err);
    //         }

    //         else{
    //           expect(res.body.err).to.equal(config.testConf.deleteError.error);
    //           done();          
    //         }
    //       });
    //     });
  });

  //  /*================test cases for get category================*/

  //  before(loginUser());

  //  describe('Get category test ',() =>{

  //   beforeEach(() => {
  //     findStub.yields(null, [config.testConf.getCategory]);
  //   });

  //   it("get category",(done) => {
  //     server
  //     .post('/category/getcategory')
  //     .set('Authorization',jwtToken)
  //     .send(config.testConf.tokenTest.email)
  //     .expect(200)
  //     .end((err, res) => {
  //       if (err)
  //       {
  //         console.log(err);
  //       }
  //       else   {
  //         expect(res.text).to.equal(config.testConf.getCategory.category);
  //         done();          
  //       }
  //     });
  //   });

  //   it("get category",(done) => {
  //     server
  //     .post('/category/getcategory')
  //     .set('Authorization',jwtToken)
  //     .send(config.testConf.tokenTest.email)
  //     .expect(200)
  //     .end((err, res) => {
  //       if (err)
  //       {
  //         console.log(err);
  //       }
  //       else{
  //         expect(res.status).to.equal(200);
  //         done();          
  //       }
  //     });
  //   });
  // });

  //  /*================Test cases for forget password================*/

  //  before(loginUser());

  //  describe('Forget password test cases ',(done) =>{
  //   beforeEach(() => {
  //     findStub.yields(null, config.testConf.forgetError);
  //   });
  //   it('Forget password test case unsuccessful',(done) => {
  //     server
  //     .post('/forget')
  //     .set('Authorization',jwtToken)
  //     .send(config.testConf.forgetTest)
  //     .end((err, res) => {
  //       if (err){
  //         console.log(err);
  //       }
  //       else{
  //         expect(res.body.Message).to.equal(config.testConf.forgetError.Message);
  //         done();          
  //       }
  //     });
  //   });
  //   it('Forget password test case successful',(done) => {
  //     server
  //     .post('/forget')
  //     .set('Authorization',jwtToken)
  //     .send({})
  //     .end((err, res) => {
        
  //       if (err){
  //         console.log(err);
  //       }

  //       else{
  //         expect(res.body.email).to.equal(config.testConf.tokenTest.email);
  //         done();          
  //       }
  //     });
  //   });
  // });

  //  describe('forget  user password ',() =>{
  //    beforeEach(() => {
  //      findStub.yields(null, config.testConf.tokenTest);
  //      updateStub.yields(null, {ok:1,n:1,nModified:1});
  //    });
  //    it("set new password negative test case",(done) => {
  //      server
  //      .put('/forget')
  //      .set('Authorization',jwtToken)
  //      .send(config.testConf.setPassword)
  //        //.expect(200)
  //        .end((err, res) => {
  //          if (err)
  //          {
  //            console.log(err);
  //          }
  //          else   {
  //            expect(res.body.nModified).should.not.be.eql("0");
  //            expect(res.body.ok).should.not.be.eql("0");
  //            expect(res.body.n).should.not.be.eql("0");
  //            done();          
  //          }
  //        });
  //      });

  //    it("set new password",(done) => {
  //      server
  //      .put('/forget')
  //      .set('Authorization',jwtToken)
  //      .send(config.testConf.setPassword)
  //      .end((err, res) => {
  //        if (err)
  //        {
  //          console.log(err);
  //        }
  //        else   {
  //          expect(res.body.nModified).to.equal(1);
  //          expect(res.body.ok).to.equal(1);
  //          expect(res.body.n).to.equal(1);
  //          done();          
  //        }
  //      });
  //    });

  //  });



  //  /*===================Test cases for removing  category==================*/

  //  before(loginUser());

  //  describe('Delete Category corresponding to the email id ',() =>{
  //   beforeEach(() => {
  //     updateStub.yields(null, {ok:1, n:1,nModified:1,categoryId:123});
  //   });

  //   it('Delete data',(done) => {
  //     server
  //     .put('/category/deletecategory/123')
  //     .set('Authorization',jwtToken)
  //     .send(config.testConf.tokenTest.email)
  //     .expect(200)
  //     .end((err, res) => {
  //       if (err){
  //         console.log(err);
  //       }
  //       else{
  //         expect(res.body.n).to.equal(1);
  //         done();          
  //       }
  //     });
  //   });

  //   it('Delete data',(done) => {
  //     server
  //     .put('/category/deletecategory/123')
  //     .set('Authorization',jwtToken)
  //     .send(config.testConf.deleteData)
  //     .expect(200)
  //     .end((err, res) => {
  //       if (err){
  //         console.log(err);
  //       }
  //       else   {
  //         expect(res.body.ok).to.equal(1);
  //         done();          
  //       }
  //     });
  //   });
  // });

  //  /*===============adding new category==========================*/
  //  before(loginUser());
  //  describe(' Add category ',() =>{

  //   beforeEach(() => {
  //     findStub.yields(null, []);
  //     updateStub.yields(null, {ok:1, n:1,nModified:1});
  //   });

  //   it('adding new category',(done) => {
  //     server
  //     .post('/category/addcategory')
  //     .set('Authorization',jwtToken)
  //     .send(config.testConf.deleteData)
  //     .expect(200)
  //     .end((err, res) => {
  //       if (err)
  //       {
  //         console.log(err);
  //       }
  //       else{
  //         expect(res.body.n).to.equal(1);
  //         expect(res.body.ok).to.equal(1);
  //         expect(res.body.nModified).to.equal(1);
  //         done();          
  //       }
  //     });
  //   });
  //   it('if category name already exists',(done) => {
  //     findStub.yields(null, [config.testConf.deleteData]);
  //     updateStub.yields(null, {ok:1, n:1,nModified:1});
  //     server
  //     .post('/category/addcategory')
  //     .set('Authorization',jwtToken)
  //     .send(config.testConf.deleteData)
  //     .expect(200)
  //     .end((err, res) => {
  //       if (err)
  //       {
  //         console.log(err);
  //       }
  //       else{
  //         expect(res.body.name).to.equal(config.testConf.addCategory.message);
  //         done();          
  //       }
  //     });
  //   });

  //   it('if error occurs in adding category',(done) => {
  //     server
  //     .post('/category/addcategory')
  //     .set('Authorization',jwtToken)
  //     .send(config.testConf.deleteData)
  //     .expect(200)
  //     .end((err, res) => {
  //       if (err)
  //       {
  //         console.log(err);
  //       }
  //       else{
  //         expect(res.body.ok).to.equal(1);
  //         done();          
  //       }
  //     });
  //   });
  // });

  //  /*=====================Test cases reset Password=====================*/

  //  describe('reset  user password ',() =>{
  //   beforeEach(() => {
  //     findStub.yields(null, config.testConf.tokenTest.email);
  //     updateStub.yields(null, config.testConf.tokenTest);
  //   });
  //   it("login user",(done) => {
  //     server
  //     .post('/resetpassword')
  //     .set('Authorization',jwtToken)
  //     .send(config.testConf.reset)
  //     .expect(200)
  //     .end((err, res) => {
  //       if (err)
  //       {
  //         console.log(err);
  //       }
  //       else   {
  //         expect(res.body.email).to.equal(config.testConf.reset.email);
  //         done();          
  //       }
  //     });
  //   });

  //   it("login user",(done) => {
  //     server
  //     .post('/resetpassword')
  //     .set('Authorization',jwtToken)
  //     .send(config.testConf.reset)
  //     .expect(200)
  //     .end((err, res) => {
  //       if (err)
  //       {
  //         console.log(err);
  //       }
  //       else   {
  //         res.body.email.should.not.be.eql(config.testConf.tokenTest.emailNegative);
  //         done();          
  //       }
  //     });
  //   });

  // });

  //  /*========================Test cases for update category====================*/

  //  describe('Update Category test cases ',(done) =>{

  //   beforeEach(() => {
  //     updateStub.yields(null, {
  //       "ok": 1,
  //       "nModified": 1,
  //       "n": 1
  //     });
  //   });
  //   it('should Update Category : ok response',(done)=>{
  //     server
  //     .put('/category/updatecategory/520691')
  //     .set('Authorization',jwtToken)
  //     .send(config.testConf.updateCategory)
  //     .expect(200)
  //     .end((err,res)=>{
  //      if(err){
  //        console.log(err);
  //      }
  //      else{
  //        expect(res.body.ok).to.equal(1);
  //        done();
  //      }
  //    })
  //   })

  //   describe('Update Category test cases ',(done) =>{

  //     beforeEach(() => {
  //       updateStub.yields(null, config.testConf.tokenTest);
  //     });
  //     it('should pass', ()=>{
  //       server
  //       .put('/')
  //     });

  //   });


  //   it('should Update Category',(done)=>{
  //     server
  //     .put('/category/updatecategory/520691')
  //     .set('Authorization',jwtToken)
  //     .send(config.testConf.updateCategory)
  //     .expect(200)
  //     .end((err,res)=>{
  //      if(err){
  //        console.log(err);
  //      }
  //      else{
  //        expect(res.body.nModified).to.equal(1);
  //        done();
  //      }
  //    })
  //   })
  // });

  //  /*=================Test cases for get transaction====================*/

  //  before(loginUser());

  //  describe('Transaction',()=>{
  //   beforeEach(()=>{
  //    findStub.yields(null,[config.testConf.getTransaction]);
  //  })

  //   it('Get Transaction Ok',(done)=>{
  //   //console.log("Inside the It of add transaction");
  //   server
  //   .post('/transaction')
  //   .set('Authorization',jwtToken)
  //   .expect('Content-Type', /json/)
  //   .expect(200)
  //   .send(config.testConf.getTransaction.email)
  //   .end((err,res)=>{
  //     if(err){
  //      console.log(err)
  //    }
  //    else{
  //     expect(res.body[0].dob).to.equal(config.testConf.getTransaction.dob);
  //     expect(res.body[0].contact).to.equal(config.testConf.getTransaction.contact);
  //     done();          
  //   }
  // })
  // });


  //   it('Negative get Transaction',(done)=>{
  //     server
  //     .post('/transaction')
  //     .set('Authorization',jwtToken)
  //     .expect('Content-Type', /json/)
  //     .expect(200)
  //     .send(config.testConf.getTransaction.email)
  //     .end((err,res)=>{
  //       if(err){
  //        console.log(err)
  //      }
  //      else{
  //       expect(res.body[0].dob).not.to.equal(config.testConf.getTransactionNegative.negativedob);
  //       expect(res.body[0].contact).not.to.equal(config.testConf.getTransactionNegative.negativeContact);
  //       done();          
  //     }
  //   })
  //   })
  // });

  //  /*==================Test cases for delete transaction====================*/

  //  describe('Delete Category test cases ',(done) =>{

  //   beforeEach(() => {
  //     updateStub.yields(null, config.testConf.deleteTransaction);
  //   });

  //   it('Delete transaction',(done)=>{
  //     server
  //     .put('/transaction/69334228')
  //     .set('Authorization',jwtToken)
  //     .expect('Content-Type', /json/)
  //     .expect(200)
  //     .send(config.testConf.tokenTest.email)
  //     .end((err,res)=>{
  //       if(err){
  //         console.log("IF");
  //         console.log(err)
  //       }
  //       else{
  //         expect(res.body.ok).to.equal(1);
  //         expect(res.body.nModified).to.equal(1);
  //         expect(res.body.ok).to.equal(1);
  //         done();          
  //       }
  //     })
  //   });

  //   it(' Negative Delete transaction',(done)=>{
  //     server
  //     .put('/transaction/69334228')
  //     .set('Authorization',jwtToken)
  //     .expect('Content-Type', /json/)
  //     .expect(200)
  //     .send(config.testConf.getTransaction.email)
  //     .end((err,res)=>{
  //       if(err){
  //         console.log("IF");
  //         console.log(err)
  //       }
  //       else{
  //         expect(res.body.ok).not.to.equal(0);
  //         expect(res.body.nModified).not.to.equal(0);
  //         expect(res.body.n).not.to.equal(0);
  //         done();          
  //       }
  //     })
  //   });

  //   /*=========================Test cases for update transaction======================*/
  //   it('Update Transaction',(done)=>{
  //     server
  //     .put('/transaction/update/updatetransaction/344884218')
  //     .set('Authorization',jwtToken)
  //     .expect('Content-Type', /json/)
  //     .expect(200)
  //     .send(config.testConf.updateTransaction)
  //     .end((err,res)=>{
  //       if(err){
  //         console.log("IF");
  //         console.log(err)
  //       }
  //       else{
  //      // console.log("This is get response",res.body);
  //      expect(res.body.ok).to.equal(1);
  //      expect(res.body.nModified).to.equal(1);
  //      expect(res.body.n).to.equal(1);
  //      done();          
  //    }
  //  })
  //   })


  //   it(' Negative Update Transaction',(done)=>{
  //     server
  //     .put('/transaction/update/updatetransaction/344884218')
  //     .set('Authorization',jwtToken)
  //     .expect('Content-Type', /json/)
  //     .expect(200)
  //     .send(config.testConf.updateTransaction)
  //     .end((err,res)=>{
  //       if(err){
  //         console.log("IF");
  //         console.log(err)
  //       }
  //       else{
  //         expect(res.body.ok).not.to.equal(0);
  //         expect(res.body.nModified).not.to.equal(0);
  //         expect(res.body.n).not.to.equal(0);
  //         done();          
  //       }
  //     })
  //   })

  // });

  //  /*===========================Test cases for Mail otp==========================*/
  //  describe('Send OTP in email', function () {
  //   this.timeout(6000);
  //   let object = config.testConf.otpMail
  //   it('it should send an overshoot email', (done) => {
  //     supertest(app)
  //     .post('/mailer')
  //     .send(object)
  //     .end((err, res) => {
  //      expect(res.body.message).to.equal(config.testConf.otpMailMessage.message)      ///////////Need to use timer, as nodemailer takes ime to send an email
  //      expect(res.status).to.equal(200);
  //      done();
  //    });
  //   });


  //   it('it should not send an overshoot mail, invalid email', (done) => {
  //     supertest(app)
  //     .post('/mailer')      
  //     .send()
  //     .end((err, res) => {
  //      expect(res.body.message).to.equal(config.testConf.otpMailMessage.negativeMessage);
  //      expect(res.status).to.equal(200);
  //      done();
  //    });
  //   });
  // });

  //  /*=========================Test cases for overshoot mailer=====================*/

  //  describe('Send OTP in email', function () {
  //   this.timeout(6000);
  //   let object = config.testConf.mail

  //   it('it should send an emal with OTP', (done) => {
  //     supertest(app)
  //     .post('/verify/send')
  //     .send(object)
  //     .end((err, res) => {
  //      expect(res.text).to.equal(config.testConf.mailMessage.message)      //Need to use timer, as nodemailer takes ime to send an email
  //      expect(res.status).to.equal(200);
  //      done();
  //    });
  //   });

  //   it('it should not send an email to an invalid email', (done) => {
  //     supertest(app)
  //     .post('/verify/send')      
  //     .send({"email":""})
  //     .end((err, res) => {
  //      expect(res.text).to.equal(config.testConf.mailMessage.negativeMessage)
  //      expect(res.status).to.equal(200);
  //      done();
  //    });
  //   });

  //   it('it should return a boolean check', (done) => {
  //     supertest(app)
  //     .post('/verify/get')      
  //     .send({"token":""})
  //     .end((err, res) => {
  //      assert.isBoolean(res.body.message, config.testConf.mailMessage.boolean);
  //      expect(res.status).to.equal(200);
  //      done();
  //    });
  //   });
  // });