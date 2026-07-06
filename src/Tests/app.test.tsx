import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import App from '../App';         // Update this to point to your real App file
import { store } from '../store/store';

describe('App Component', () => {
  it('renders the application safely without crashing', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Verify it renders by checking for an element, like your navigation or a button
    // Example: expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });
});
