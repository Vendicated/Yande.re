import React, { FormEvent, ChangeEvent, Component } from 'react';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

import './style.scss';
import { SettingsModalState, SettingsFormProps, SettingsFormState } from './types';
import { CenterView, Snackbar } from '..';

class Settings extends Component<SettingsFormProps, SettingsFormState> {
	constructor(props: SettingsFormProps) {
		super(props);

		this.state = {
			nsfwSwitch: JSON.parse(localStorage.getItem('showNsfw') || 'false')
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleNSFWToggle = this.handleNSFWToggle.bind(this);
	}

	handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		localStorage.setItem('showNsfw', JSON.stringify(this.state.nsfwSwitch));
		this.props.showSnackbar();
	}

	handleNSFWToggle(event: ChangeEvent<HTMLInputElement>) {
		this.setState({ nsfwSwitch: event.target.checked });
	}

	render() {
		return (
			<>
				<Form onSubmit={this.handleSubmit}>
					<Form.Switch id="nsfw-switch" label="Include NSFW results" checked={this.state.nsfwSwitch} onChange={this.handleNSFWToggle} />
					<hr />
					<CenterView>
						<ButtonGroup style={{ marginLeft: 'auto', marginRight: 'auto' }}>
							<Button variant="secondary" onClick={this.props.handleClose}>
								Cancel
							</Button>
							<Button type="submit" variant="primary" onClick={this.props.handleClose}>
								Save Changes
							</Button>
						</ButtonGroup>
					</CenterView>
				</Form>
			</>
		);
	}
}

export default class SettingsModal extends Component<unknown, SettingsModalState> {
	constructor(props: unknown) {
		super(props);
		this.state = {
			showModal: false,
			showSnackbar: false,
			iconHovered: false
		};
		this.handleClose = this.handleClose.bind(this);
		this.handleShow = this.handleShow.bind(this);
		this.handleHover = this.handleHover.bind(this);
		this.showSnackbar = this.showSnackbar.bind(this);
	}

	handleClose() {
		this.setState({ showModal: false });
	}

	handleShow() {
		this.setState({ showModal: true });
	}

	handleHover() {
		this.setState(state => ({ iconHovered: !state.iconHovered }));
	}

	showSnackbar() {
		this.setState({ showSnackbar: true });
		setTimeout(() => this.setState({ showSnackbar: false }), 3000);
	}

	render() {
		return (
			<>
				<FontAwesomeIcon
					icon={faCog}
					color="gray"
					className="cog"
					{...(this.state.iconHovered ? { spin: true } : {})}
					onClick={this.handleShow}
					onMouseEnter={this.handleHover}
					onMouseLeave={this.handleHover}
				/>
				<Modal show={this.state.showModal}>
					<Modal.Header closeButton>
						<Modal.Title>Settings</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Settings handleClose={this.handleClose} showSnackbar={this.showSnackbar} />
					</Modal.Body>
				</Modal>
				{this.state.showSnackbar && <Snackbar variant="success" text="Successfully updated settings! " />}
			</>
		);
	}
}
