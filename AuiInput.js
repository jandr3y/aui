((Aui) => {

    class AuiInput extends Aui {
        constructor(){
            super({
                template: `
                    <style>
                        :host > div > input {
                            padding: 10px;   
                        }
                    </style>
                    <div>
                    <
                        <input id="input" />
                    </div>
                `
            })
        }

        static get observedAttributes() {
            return ['placeholder', 'visible'];
        }

        onChangeVisible(valor){
            

            if ( this.get('visible') === 'false' ) {
                input.type = 'password';
            }else{
                input.type = 'text';
            }
        }

        onLoad(){
            var { input } = this.elements;

            input.placeholder = this.get('placeholder');

            if ( this.get('visible') === 'false' ) {
                input.type = 'password';
            }

        }
    }

    Aui.register('aui-input', AuiInput);

})(Aui);