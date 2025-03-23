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
    this.org = '';
    this.repo = '';
    this.title = '';
    this.items = [];
    this.limit = 15;
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
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      h3 span {
        font-size: var(--rpg-character-label-font-size, var(--ddd-font-size-s));
      }
      .rpg-wrapper {
        display: flex;
        align-items: center;
        margin: var(--ddd-spacing-2);
      }
    `];
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('org') || changedProperties.has('repo')) {
      this.getData();
    }
  }

  getData() {
    const url = `https://api.github.com/repos/${this.org}/${this.repo}/contributors`;
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
    <div class="wrapper">
      <h3>GitHub Repo: <a href="https://github.com/${this.org}/${this.repo}">${this.org}/${this.repo}</a></h3>
    </div>;
    <slot></slot>
    ${this.items.filter((item, index) => index < this.limit).map((item) => 
      html`
      <div class="rpg-wrapper">
      <rpg-character  seed="${item.login}"></rpg-character>
        <div class="contributions">
        <a href=https://github.com/${item.login}>${item.login}</a>
        Contributions: ${item.contributions}
        </div>
      </div>
     `)}
  </div>`;
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