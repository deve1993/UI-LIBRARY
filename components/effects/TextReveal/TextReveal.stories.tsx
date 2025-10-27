import type { Meta, StoryObj } from '@storybook/react';
import { TextReveal } from './TextReveal';

const meta: Meta<typeof TextReveal> = {
  title: 'Effects/TextReveal',
  component: TextReveal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof TextReveal>;

const storyText =
  'Scrolla verso il basso per vedere questo testo rivelarsi parola per parola in modo fluido e coinvolgente';

const longText =
  'Nel mondo digitale moderno, l\'esperienza utente è tutto. Ogni interazione, ogni animazione, ogni dettaglio contribuisce a creare un\'esperienza memorabile. Questo è il potere del design pensato con cura.';

export const Default: Story = {
  render: () => (
    <div className="bg-slate-950">
      <div className="h-screen flex items-center justify-center">
        <h2 className="text-4xl font-bold text-white text-center">
          Inizia a Scrollare ↓
        </h2>
      </div>
      <TextReveal text={storyText} />
      <div className="h-screen"></div>
    </div>
  ),
};

export const LongForm: Story = {
  render: () => (
    <div className="bg-slate-950">
      <div className="h-screen flex items-center justify-center">
        <h2 className="text-4xl font-bold text-white text-center px-4">
          La Storia del Design
        </h2>
      </div>
      <TextReveal text={longText} />
      <div className="h-screen"></div>
    </div>
  ),
};

export const BlueTheme: Story = {
  render: () => (
    <div className="bg-slate-950">
      <div className="h-screen flex items-center justify-center">
        <h2 className="text-4xl font-bold text-blue-400 text-center">
          Tema Blu
        </h2>
      </div>
      <TextReveal
        text="Questo testo si rivela con un bellissimo colore blu mentre scorri"
        revealedTextColor="text-blue-400"
        hiddenTextColor="text-slate-800"
      />
      <div className="h-screen"></div>
    </div>
  ),
};

export const PurpleTheme: Story = {
  render: () => (
    <div className="bg-black">
      <div className="h-screen flex items-center justify-center">
        <h2 className="text-4xl font-bold text-purple-400 text-center">
          Tema Viola
        </h2>
      </div>
      <TextReveal
        text="Un effetto elegante con colori viola che si rivelano gradualmente"
        revealedTextColor="text-purple-400"
        hiddenTextColor="text-gray-800"
      />
      <div className="h-screen"></div>
    </div>
  ),
};
