import React, { Component } from 'react';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faExclamationTriangle, faCheckCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import { SnackbarProps, SnackbarState } from './types';
import './style.css';

export default class Snackbar extends Component<SnackbarProps, SnackbarState> {
	private iconProps: FontAwesomeIconProps;

	constructor(props: SnackbarProps) {
		super(props);
		this.state = {
			show: true
		};

		if (props.autoHideAfter) setTimeout(() => this.setState({ show: false }), 3000);

		this.iconProps = {
			className: 'icon',
			icon:
				this.props.variant === 'success'
					? faCheckCircle
					: this.props.variant === 'warning'
					? faExclamationTriangle
					: this.props.variant === 'error'
					? faExclamationCircle
					: faInfoCircle
		};
	}

	render() {
		const className = (this.props.variant || 'info') + (this.state.show ? ' show' : '');
		return (
			<>
				<div id="snackbar" className={className}>
					<FontAwesomeIcon {...this.iconProps} />
					{this.props.text}
				</div>
			</>
		);
	}
}
