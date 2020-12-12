import { Session } from "../typings/types"
import Parse from "parse"

Parse.serverURL = 'https://parseapi.back4app.com';
Parse.initialize('nHcnN2cYNyMeGyOi7Sja1TkRZrK9HcNebJG5niOx', 'yJoXLWYHsxIntFMOnhX7Dh31U7JFZ49GiUg4pIGd', 'g3PWDjwXB6hnZYcHdTkEKyjhJvVpXMpTXxWfsQD0');

const postSession = (session: Session) => {
	const Session = Parse.Object.extend('Session');
	const myNewObject = new Session();

	myNewObject.set('code', session.code);

	myNewObject.save().then(
		(result) => {
			if (typeof document !== 'undefined') document.write(`Session created: ${JSON.stringify(result)}`);
			console.log('Session created', result);
		},
		(error) => {
			if (typeof document !== 'undefined') document.write(`Error while creating Session: ${JSON.stringify(error)}`);
			console.error('Error while creating Session: ', error);
		}
	);
	;
};

const getSession = (code: string) => {
	const Session = Parse.Object.extend('Session');
	const query = new Parse.Query(Session);
	query.equalTo("code", code);
	query.find().then((results) => {
		// You can use the "get" method to get the value of an attribute
		// Ex: response.get("<ATTRIBUTE_NAME>")
		if (typeof document !== 'undefined') document.write(`Session found: ${JSON.stringify(results)}`);
		console.log('Session found', results);
	}, (error) => {
		if (typeof document !== 'undefined') document.write(`Error while fetching Session: ${JSON.stringify(error)}`);
		console.error('Error while fetching Session', error);
	});
};

export { postSession, getSession };
