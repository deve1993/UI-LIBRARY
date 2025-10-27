#!/bin/bash

# Generate stories, tests, and examples for all components

COMPONENTS=("FeaturesSection" "BenefitsSection" "PricingSection" "RoadmapSection" "TestimonialsSection" "ClientLogosSection" "ContactSection" "Footer")

for COMP in "${COMPONENTS[@]}"; do
    echo "Generating files for $COMP..."
    
    # Generate stories file
    cat > "$COMP/$COMP.stories.tsx" << 'EOFSTORIES'
import type { Meta, StoryObj } from '@storybook/react';
import { COMP_NAME } from './COMP_NAME';

const meta: Meta<typeof COMP_NAME> = {
  title: 'Sections/COMP_NAME',
  component: COMP_NAME,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof COMP_NAME>;

export const Default: Story = {
  args: {
    // TODO: Add default props
  },
};
EOFSTORIES
    
    # Replace placeholders
    sed -i "s/COMP_NAME/$COMP/g" "$COMP/$COMP.stories.tsx"
    
    # Generate test file
    cat > "$COMP/$COMP.test.tsx" << 'EOFTEST'
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { COMP_NAME } from './COMP_NAME';

describe('COMP_NAME', () => {
  it('dovrebbe renderizzare correttamente', () => {
    // TODO: Add test implementation
    expect(true).toBe(true);
  });
});
EOFTEST
    
    sed -i "s/COMP_NAME/$COMP/g" "$COMP/$COMP.test.tsx"
    
    # Generate basic example
    cat > "$COMP/examples/basic.tsx" << 'EOFBASIC'
import React from 'react';
import { COMP_NAME } from '../COMP_NAME';

export const BasicExample: React.FC = () => {
  return (
    <COMP_NAME
      // TODO: Add basic props
    />
  );
};

export default BasicExample;
EOFBASIC
    
    sed -i "s/COMP_NAME/$COMP/g" "$COMP/examples/basic.tsx"
    
    # Generate advanced example
    cat > "$COMP/examples/advanced.tsx" << 'EOFADVANCED'
import React from 'react';
import { COMP_NAME } from '../COMP_NAME';

export const AdvancedExample: React.FC = () => {
  return (
    <COMP_NAME
      // TODO: Add advanced props
    />
  );
};

export default AdvancedExample;
EOFADVANCED
    
    sed -i "s/COMP_NAME/$COMP/g" "$COMP/examples/advanced.tsx"
    
    echo "✓ Generated all files for $COMP"
done

echo ""
echo "All files generated successfully!"
