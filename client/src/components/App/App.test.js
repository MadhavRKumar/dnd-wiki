import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

it('renders home page', () => {
	render(<App />);

	// Search Bar
	expect(screen.getByRole('searchbox')).toBeInTheDocument();

	// Logo
	expect(screen.getByRole('banner')).toBeInTheDocument();

	// Link to create article
	expect(screen.getByRole('link')).toBeInTheDocument();
});
