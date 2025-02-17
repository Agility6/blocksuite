import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import { ZERO_WIDTH_SPACE } from '../constant.js';
import type { BaseArrtiubtes, DeltaInsert } from '../types.js';
import { VirgoUnitText } from './virgo-unit-text.js';

function virgoTextStyles(props: BaseArrtiubtes): ReturnType<typeof styleMap> {
  let textDecorations = '';
  if (props.underline) {
    textDecorations += 'underline';
  }
  if (props.strikethrough) {
    textDecorations += ' line-through';
  }

  return styleMap({
    'white-space': 'break-spaces',
    'font-weight': props.bold ? 'bold' : 'normal',
    'font-style': props.italic ? 'italic' : 'normal',
    'text-decoration': textDecorations.length > 0 ? textDecorations : 'none',
  });
}

@customElement('v-text')
export class BaseText extends LitElement {
  @property({ type: Object })
  delta: DeltaInsert<BaseArrtiubtes> = {
    insert: ZERO_WIDTH_SPACE,
    attributes: {
      type: 'base',
    },
  };

  render() {
    const unitText = new VirgoUnitText();
    unitText.delta = this.delta;

    // we need to avoid \n appearing before and after the span element, which will
    // cause the unexpected space
    return html`<span
      data-virgo-element="true"
      style=${virgoTextStyles(this.delta.attributes)}
      >${unitText}</span
    >`;
  }

  createRenderRoot() {
    return this;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'v-text': BaseText;
  }
}
