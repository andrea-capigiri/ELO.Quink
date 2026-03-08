# Design System

## 1. Logo Concept
Il pittogramma è un'evoluzione dell'icona "hamburger menu" (lista di link), riprogettato per trasmettere **velocità, efficienza e accesso rapido**. L'effetto dinamico di "corsa" in avanti è ottenuto puramente tramite l'asimmetria orizzontale, senza ricorrere a inclinazioni (skew).

## 2. Geometria e Struttura
- **Staggering (Asimmetria X):** Le 3 linee orizzontali sono sfalsate. La riga centrale scatta più a destra rispetto alle laterali, creando una sagoma aerodinamica a "freccia" implicita.
- **Proporzioni:** Linee volutamente spesse (tozze) e ravvicinate. Il gap verticale tra i tratti è minimo rispetto allo spessore della linea (`stroke-width="6"` su una canvas ridotta).
- **Forma:** Terminali perfettamente arrotondati (`stroke-linecap="round"`), che conferiscono un aspetto moderno a "pillola".

## 3. Costruzione a Livelli (Layering)
Il pittogramma è generato sovrapponendo due path SVG compressi per simulare una scia di movimento:
- **Livello Scia (Base):** Segmenti più lunghi che partono da sinistra, con opacità ridotta (40%).
- **Livello Testa (Top):** Segmenti più corti e pieni (100% opacità), le cui coordinate finali (X + lunghezza) si allineano perfettamente alla fine della "scia" sul lato destro.

## 4. Specifiche Tecniche
L'SVG è ottimizzato `zero-waste` con viewBox adattato esattamente al bounding box del pittogramma (`32x24`) per evitare il sub-pixel rendering nell'estensione.

### Sorgente SVG
```xml
<svg viewBox="0 0 32 24" xmlns="http://www.w3.org/2000/svg">
  <g stroke="#f8fafc" stroke-width="6" stroke-linecap="round">
    <!-- Scia -->
    <path d="M3 3h20 M9 12h20 M5 21h18" opacity="0.4" />
    <!-- Testa -->
    <path d="M11 3h12 M17 12h12 M13 21h10" />
  </g>
</svg>
```
