import { render, screen } from "@testing-library/react";
import Main from './Main';

test('Renders the Main form heading', () => {
    render(<Main />);
    const headingElement = screen.getByText("Book a Table");
    expect(headingElement).toBeInTheDocument();
})