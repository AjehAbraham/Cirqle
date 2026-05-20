
import "dotenv/config";

const provider = process.env.SMS_PROVIDER;

export const sendSMS = async({to, message}) => {
	try{
	  if(provider === 'twilio'){
		  const twilio = (await import('twilio').default);
		  const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
		  const msg = await client.messages.create({
			  body: message,
			  from: process.env.TWILIO_FROM,
			  to: `${to}`
		  });
		  return {success: true, sid: msg.sid};
	  }
		
	if(provider === 'vonage'){
		const {Vonage} = await import("@vonage/server-sdk");
		const vonage = new Vonage({
			apiKey: process.env.VONAGE_KEY,
			apiSecret: process.env.VONAGE_SECRET
		});
		const res= await vonage.sms.send({
			to: to.replace('+', ''),
			from: process.env.VONAGE_FROM,
			text: message
		});
		return {success: res.messages[0].status === '0',
		data: res};
	}
	if(provider === 'termii'){
		const res = await fetch('https://api.ng.termii.com/api/sms/send', {
			method: "POST",
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				to: to,
				sms: message,
				type: 'plain',
				channel: 'dnd',
				api_key: process.env.TERMII_API_KEY,
				from: process.env.TERMII_SENDER_ID
			})
		});
		
		const data = await res.json();
		return { success: data.code === 'ok', data};
	}
		throw new Error("Unknown SMS provider");
	}catch(err){
		return {
			success: false,
			error: err.message
		};
	}
	
	
}


