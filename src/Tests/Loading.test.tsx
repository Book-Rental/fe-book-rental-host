import { render, screen } from '@testing-library/react';
import Loading from '../Component/Loading';

describe('Loading Component', () => {
  it('renders the loading text context successfully', () => {
    render(<Loading/>);
    
    // Check if the primary loading text is visible in the document
    const textElement = screen.getByText('Loading Content');
    expect(textElement).toBeInTheDocument();
  });

  it('contains the correct Tailwind animation classes for visual spinner feedback', () => {
    const { container } = render(<Loading />);

    // Query elements inside the component container by their Tailwind animation selectors
    const pulseRing = container.querySelector('.animate-ping');
    const spinRing = container.querySelector('.animate-spin');
    const pulseText = container.querySelector('.animate-pulse');

    // Assert that all structural layout animation frames are applied correctly
    expect(pulseRing).toBeInTheDocument();
    expect(spinRing).toBeInTheDocument();
    expect(pulseText).toBeInTheDocument();
  });

  it('applies the appropriate min-height and spacing container layouts', () => {
    const { container } = render(<Loading />);
    
    // The outermost wrapper element should contain the utility stretch parameters
    const outerWrapper = container.firstChild as HTMLElement;
    
    expect(outerWrapper).toHaveClass('min-h-[400px]');
    expect(outerWrapper).toHaveClass('w-full');
    expect(outerWrapper).toHaveClass('flex-col');
  });
});
