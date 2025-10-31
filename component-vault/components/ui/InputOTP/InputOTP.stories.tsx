import type { Meta, StoryObj } from '@storybook/react';
import { InputOTP } from './InputOTP';

const meta: Meta<typeof InputOTP> = { title: 'UI/InputOTP', component: InputOTP, tags: ['autodocs'], parameters: { layout: 'centered' } };
export default meta;
type Story = StoryObj<typeof InputOTP>;

export const Default: Story = { args: { length: 6, onComplete: (otp) => console.log('OTP:', otp) } };
export const FourDigits: Story = { args: { length: 4 } };
