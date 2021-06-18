import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

const DialogBox = (props) => {
const [open, setOpen] = React.useState(true);

const handleClose = () => {
	setOpen(false);
};

const copyText = () => {
	navigator.clipboard.writeText(props.roomName);
	setOpen(false);
};
console.log(props.roomName);
return (
	<div>
	<Dialog open={open} onClose={handleClose}>
		<DialogTitle>
			Invite people to join you
		</DialogTitle>
		<DialogContent>
		<DialogContentText>
			Copy and share the roomname to invite someone
		</DialogContentText>
		</DialogContent>
		<DialogActions>
		<Button onClick={copyText} color="primary" autoFocus>
			Copy room name
		</Button>
		<Button onClick={handleClose} color="primary">
			Close
		</Button>
		</DialogActions>
	</Dialog>
	</div>
);
}

export default DialogBox;
