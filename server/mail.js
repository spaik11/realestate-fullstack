const mailer = require("nodemailer");
const infoRequest = require("./infoRequest");


const getEmailData = (nameFrom, emailFrom, property) => {
    data = {
        from: "Truzillow Admin <truzillow@gmail.com>",
        to: "paul.garay@codeimmersives.com",
        subject: property,
        html: `${nameFrom} would like more information on ${property}. Please reply to ${emailFrom}`
    }
    return data;
}

const sendEmail = (nameFrom, emailFrom, property) => {
    const smtpTransport = mailer.createTransport({
        service: "Gmail",
        auth: {
            user: "truzillow@gmail.com",
            pass: "abcD123!"
        }
    });

    let mail = {
        from: "Truzillow Admin <truzillow@gmail.com>",
        to: "paul.garay@codeimmersives.com",
        subject: property,
        html: `${nameFrom} would like more information on ${property}. Please reply to ${emailFrom}`
    }

    // let mail = getEmailData(nameFrom, emailFrom, property);

    smtpTransport.sendMail(mail, function (error, response){
        if(error){
            console.log(error)
        } else {
            console.log("Email sent")
        };
        smtpTransport.close();
    })
};

module.exports = sendEmail;