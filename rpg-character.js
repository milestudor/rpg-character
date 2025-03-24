/**
 * Copyright 2025 milestudor
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import '@haxtheweb/rpg-character/rpg-character.js';

/**
 * `rpg-character`
 * 
 * @demo index.html
 * @element rpg-character
 */
export class RpgCharacter extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "rpg-character";
  }

  constructor() {
    super();
    this.org = 'haxtheweb';
    this.repo = 'webcomponents';
    this.title = '';
    this.items = [];
    this.limit = 10;
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/rpg-character.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      org: { type: String },
      repo: { type: String },
      title: { type: String },
      items: { type: Array },
      limit: { type: Number },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      .wrapper {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
      }
      h3 span {
        font-size: var(--rpg-character-label-font-size, var(--ddd-font-size-s));
      }
      .rpg-wrapper {
        display: flex;
        align-items: center;
        text-align: center;
      }
    `];
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('org') || changedProperties.has('repo') || changedProperties.has('limit')) {
      this.getData();
    }
  }

  getData() {
    const url = fetch(`https://api.github.com/repos/${this.org}/${this.repo}/contributors`);
    try {
      fetch(url).then(d => d.ok ? data.json(): {}).then(data => {
        if (data) {
          this.items = [];
          this.items = data;
        }
      });
    } catch (error) {
      console.error("Hello");
    }
  }
  // Lit render the HTML
  render() {
    return html`
    <h2>
      Contributors for
      <a href="https://github.com/${this.org}/${this.repo}" target="_blank">${this.org}/${this.repo}</a>
    </h2>
    <div class="wrapper">
      ${this.items.map(contributor => html`
        <div class="rpg-wrapper">
          <a href="{item.html_url}" target="_blank">
            <rpg-character seed="${item.login}"></rpg-character>
          </a>
        </div>;
      `)}
    </div>
  `;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(RpgCharacter.tag, RpgCharacter);