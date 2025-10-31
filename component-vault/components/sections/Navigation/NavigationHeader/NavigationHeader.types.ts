/**
 * Types per il componente NavigationHeader
 */

export interface NavigationLink {
  /** Testo del link di navigazione */
  label: string;
  /** URL di destinazione */
  href: string;
  /** Label ARIA per accessibilità */
  ariaLabel?: string;
}

export interface LanguageOption {
  /** Codice lingua (es: 'it', 'en', 'fr') */
  code: string;
  /** Nome visualizzato della lingua */
  label: string;
}

export interface NavigationHeaderProps {
  /** Configurazione del logo nell'header */
  logo: {
    /** URL immagine del logo (opzionale) */
    src?: string;
    /** Testo alternativo per il logo */
    alt: string;
    /** Testo del brand da visualizzare accanto al logo (opzionale) */
    text?: string;
  };
  /** Array di link di navigazione */
  links: NavigationLink[];
  /** Configurazione del selettore di lingua (opzionale) */
  languages?: {
    /** Codice della lingua corrente */
    current: string;
    /** Array di opzioni di lingua disponibili */
    options: LanguageOption[];
    /** Callback chiamato quando l'utente cambia lingua */
    onChange?: (code: string) => void;
  };
  /** Configurazione del bottone CTA principale */
  ctaButton: {
    /** Testo del bottone */
    label: string;
    /** Callback al click del bottone */
    onClick: () => void;
  };
  /** Classi CSS aggiuntive per personalizzazione */
  className?: string;
}
