((Aui) => {

  const template = Aui.html`
    <style>
      :host button {
          background: #ececec;
          padding: 10px 20px;
          border: none;
      }

      :host .primary {
        background-color: #42a5f5;
        color: white;
      }

      :host .accent {
        background-color: ${Aui.theme.accentColor};
      }
    </style>
    <button id="button">
      <i id="iconLeft" class="fa"></i><slot></slot>
    </button>
  `;

  class AuiButton extends Aui {

    constructor() {
        super({
          template: template,
          debug: true
        });
    }

    static get observedAttributes() {
      return ['disabled', 'color', 'icon'];
    }

    onLoad(){
      const { button, iconLeft } = this.elements;
      button.classList.add(this.get('color'));
      iconLeft.classList.add('fa-' + this.get('icon'))
      button.disabled = this.getAttribute('disabled');
    }
  }

  Aui.register('aui-button', AuiButton);
})(Aui);
