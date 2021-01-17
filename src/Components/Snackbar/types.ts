export interface SnackbarProps {
	autoHideAfter?: number;
	variant?: 'success' | 'error' | 'warning' | 'info';
	text: string;
}

export interface SnackbarState {
	show: boolean;
}
