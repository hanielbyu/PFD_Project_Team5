export{ sendSMS }

// import Twilio from "twilio/lib/rest/Twilio"


const sendSMS = async (body) => {
    const accountSid = 'AC08684d8f4db8b42ce1308619191a54de'
    const authToken = '068b127a2471d45395276b61f40bc390'
    const client = new Twilio(accountSid,authToken);

    let msgOptions = {
        from: '+16592214697',
        to: '+6592323204',
        body: '',
    }   
    try{
        const message = await client.messages.create(msgOptions);
        console.log(message)
    }catch(error){
        console.error(error);
    
    }

}

// sendSMS("Hello from Node js")