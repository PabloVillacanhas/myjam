import { Session } from "../types/types"
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

export { postSession };
