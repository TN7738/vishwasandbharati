const mongoose = require('mongoose');
const collect = mongoose.model('Collect');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const CLIENT_ID = '808185717470-it8sg714erlji14ea6kejvb5v2ldfln7.apps.googleusercontent.com';
const CLEINT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04tNaqvN_TZUfCgYIARAAGAQSNwF-L9Irp_guMnIPhT8WgLeQ7RB2tovxXLHUsdpLgKDiiJsnQI3QVYPbgajQUNMF5W9F7xDLFOI';

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLEINT_SECRET,
    REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const mailOptions = {
    from: 'Vishwas\' Haldi & Sangeet <vishwaswedsbharati@gmail.com>',
    subject: 'Vishwas\' Haldi & Sangeet',
    text: 'You\'re cordially invited to Vishwas\' Haldi and Sangeet ceremony.'
};

async function sendMail() {
    try {
        const accessToken = await oAuth2Client.getAccessToken();
        
        const transport = nodemailer.createTransport({
            pool: true,
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                type: 'OAuth2',
                user: 'vishwaswedsbharati@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLEINT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });
        
        const result = await transport.sendMail(mailOptions);
        return result;
    } catch (error) {
        return error;
    }
}
    
    const sendJSONResponse = (res, status, content) => {
        res.status(status);
        res.json(content);
    };
    
    const collectListAll = (req, res) => {
        collect
        .find()
        .exec((err, collectdata) => {
            if (err) {
                sendJSONResponse(res, 404, err);
                return;
            } else if (collectdata.length <= 0) {
                sendJSONResponse(res, 404, { 'message': 'collect list empty' });
                return;
            } else {
                sendJSONResponse(res, 200, collectdata);
            }
        });
    };
    
    const collectListCreate = (req, res) => {
        collect
        .create({
            name: req.body.name,
            restrictions: req.body.restrictions,
            msg: req.body.msg,
            guests: req.body.guests,
            email: req.body.email
        }, (err, collectdata) => {
            if (err) {
                sendJSONResponse(res, 400, err);
            } else {
                sendJSONResponse(res, 200, collectdata);
                const arr = req.body.name.split(" ");
                for (let i = 0; i < arr.length; i++) {
                    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
                }
                const fullName = arr.join(" ");
                mailOptions.to = req.body.email;
                mailOptions.html = '<h3>Hi ' + fullName +',</h3><img src="https://i.imgur.com/L66mn45.jpg" alt="Sangeet-Haldi-Invite" width="100%" height="100%" /><p><h3>Sangeet:</h3> <span>Fri, Sep 22</span><h4>Venue: <a href="https://goo.gl/maps/43Td6oAMKFzVBRJQA">Rangla Punjab, Manpada, Thane</a></h4><h4>Time: <span>6:00 PM onwards</span></h4></p><br/><p><h3>Haldi:</h3> <span>Sat, Sep 23</span><h4>Venue: <a href="https://goo.gl/maps/sN2rC7B9BAVo6dZN8">Blue Roof Club, Owale, Thane</a></h4><h4>Time: <span>7:00 PM onwards</span></h4></p>'
                sendMail()
                    .then((result) => {})
                    .catch((error) => console.log(error.message));
            }
        });
    };
    
    const collectListReadOne = (req, res) => {
        if (req.params && req.params.collectid) {
            collect
            .findById(req.params.collectid)
            .exec((err, collectdata) => {
                if (!collectdata) {
                    sendJSONResponse(res, 404, { 'message': 'collectid not found' });
                    return;
                } else if (err) {
                    sendJSONResponse(res, 404, err);
                    return;
                } else {
                    sendJSONResponse(res, 200, collectdata);
                }
            });
        } else {
            sendJSONResponse(res, 404, { 'message': 'No collectid in request' });
        }
    };
    
    const collectListUpdateOne = (req, res) => {
        console.log(req);
        if (!req.params.collectid) {
            sendJSONResponse(res, 404, { 'message': 'collectid is required' });
            return;
        }
        collect
        .findById(req.params.collectid)
        .exec((err, collectdata) => {
            if (!collectdata) {
                sendJSONResponse(res, 404, { 'message': 'no collectdata found' });
                return;
            } else if (err) {
                sendJSONResponse(res, 400, err);
                return
            }
            collectdata.name = req.body.name;
            collectdata.restrictions = req.body.restrictions;
            collectdata.msg = req.body.msg;
            collectdata.guests = req.body.guests;
            collectdata.email = req.body.email;
            collectdata.save((err, collectdata) => {
                if (err) {
                    sendJSONResponse(res, 400, err);
                } else {
                    sendJSONResponse(res, 200, collectdata);
                }
            });
        });
    };
    
    const collectListDeleteOne = (req, res) => {
        const collectid = req.params.collectid;
        if (collectid) {
            collect
            .findByIdAndRemove(collectid)
            .exec((err, collectdata) => {
                if (err) {
                    sendJSONResponse(res, 404, err);
                    return;
                }
                sendJSONResponse(res, 204, null);
            });
        } else {
            sendJSONResponse(res, 404, { 'message': 'collectid is required' });
        }
    };
    
    module.exports = {
        collectListAll,
        collectListCreate,
        collectListReadOne,
        collectListUpdateOne,
        collectListDeleteOne
    };