import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Card3D } from './Card3D'
import type { Card3DProps } from './Card3D.types'

expect.extend(toHaveNoViolations)

describe('Card3D', () => {
  const defaultProps: Card3DProps = {
    children: 'Test Content',
  }

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<Card3D {...defaultProps} />)
      expect(screen.getByTestId('card3d')).toBeInTheDocument()
    })

    it('renders children correctly', () => {
      const testContent = 'Test Content'
      render(<Card3D {...defaultProps}>{testContent}</Card3D>)
      expect(screen.getByText(testContent)).toBeInTheDocument()
    })
  })

  describe('Props', () => {

    it('applies className prop correctly', () => {
      const testValue = 'Test'
      render(<Card3D {...defaultProps} className={testValue} />)
      const element = screen.getByTestId('card3d')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })

    it('applies containerClassName prop correctly', () => {
      const testValue = 'Test'
      render(<Card3D {...defaultProps} containerClassName={testValue} />)
      const element = screen.getByTestId('card3d')
      expect(element).toBeInTheDocument()
      // Add specific assertion based on prop type
    })
  })

  describe('Interactions', () => {

    it('handles onMouseMove correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<Card3D {...defaultProps} onMouseMove={handler} />)

      const element = screen.getByTestId('card3d')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('handles onMouseLeave correctly', async () => {
      const handler = vi.fn()
      const user = userEvent.setup()
      render(<Card3D {...defaultProps} onMouseLeave={handler} />)

      const element = screen.getByTestId('card3d')
      await user.click(element)

      expect(handler).toHaveBeenCalledTimes(1)
    })
  })

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Card3D {...defaultProps} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup()
      render(<Card3D {...defaultProps} />)
      await user.tab()
      const focusedElement = screen.getByTestId('card3d')
      expect(document.activeElement).toBe(focusedElement)
    })

    it('has correct ARIA attributes', () => {
      render(<Card3D {...defaultProps} />)
      const element = screen.getByTestId('card3d')
      expect(element).toHaveAttribute('role')
    })
  })

  describe('Visual Regression', () => {
    it('matches snapshot', () => {
      const { container } = render(<Card3D {...defaultProps} />)
      expect(container.firstChild).toMatchSnapshot()
    })
  })
})
