import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ResultList from './ResultList';

it('shows no result', () => {
	const results  = [];
	const query = "no result";
	render(<ResultList results={results} query={query}/>);
	expect(screen.getByText(query, {exact: false})).toBeInTheDocument();
})

it('displays all 3 results', () => {
	const results  = [
		{
			page_title: "Result 1",
			text: "Text for result 1"
		},
		{
			page_title: "Result 2",
			text: "Text for result 2"
		},
		{
			page_title: "Result 3",
			text: "Text for result 3"
		}

	];
	const query = "3 result";
	render(<ResultList results={results} query={query}/>, { wrapper: MemoryRouter });

	expect(screen.getAllByRole("listitem")).toHaveLength(3);
});
