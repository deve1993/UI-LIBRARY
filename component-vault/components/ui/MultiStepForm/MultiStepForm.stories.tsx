import type { Meta, StoryObj } from '@storybook/react';
import { MultiStepForm } from './MultiStepForm';

const steps = [
  { title: 'Informazioni Personali', content: <div><input placeholder="Nome" className="w-full p-2 border rounded mb-2" /><input placeholder="Email" className="w-full p-2 border rounded" /></div> },
  { title: 'Indirizzo', content: <div><input placeholder="Via" className="w-full p-2 border rounded mb-2" /><input placeholder="Città" className="w-full p-2 border rounded" /></div> },
  { title: 'Conferma', content: <div className="text-center"><p>Rivedi e conferma i tuoi dati</p></div> },
];

const meta: Meta<typeof MultiStepForm> = { title: 'UI/MultiStepForm', component: MultiStepForm, tags: ['autodocs'], parameters: { layout: 'centered' } };
export default meta;
type Story = StoryObj<typeof MultiStepForm>;

export const Default: Story = { args: { steps } };
