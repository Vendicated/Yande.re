export interface SettingsModalState {
	showModal: boolean;
	iconHovered: boolean;
	showSnackbar: boolean;
}

export interface SettingsFormProps {
	handleClose: () => void;
	showSnackbar: () => void;
}

export interface SettingsFormState {
	nsfwSwitch: boolean;
}
