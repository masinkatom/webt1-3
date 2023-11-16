class RangeSlider extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: "open"});

        this.minimal = this.getAttribute("minimal");
        this.maximal = this.getAttribute("maximal");
        this.value = this.getAttribute("value");

        this.contain = document.createElement("div");
        this.contain.className = "contain";

        this.inputTypeNumber = document.createElement("input");
        this.inputTypeNumber.id = "in-number";
        this.inputTypeNumber.type = "number";
        this.inputTypeNumber.step = "0.1";
        this.inputTypeNumber.setAttribute("min", this.minimal);
        this.inputTypeNumber.setAttribute("max", this.maximal);

        this.inputTypeNumber.addEventListener('input', () => {
            this.inputTypeRange.value = this.inputTypeNumber.value;
        });

        this.inputTypeRange = document.createElement("input");
        this.inputTypeRange.id = "slider";
        this.inputTypeRange.className = "slider";
        this.inputTypeRange.type = "range";
        this.inputTypeRange.step = "0.1";
        this.inputTypeRange.setAttribute("min", this.minimal);
        this.inputTypeRange.setAttribute("max", this.maximal);
        this.inputTypeRange.setAttribute("value", this.value);

        this.inputTypeNumber.value = this.inputTypeRange.value;

        this.inputTypeRange.addEventListener('input', () => {
            this.inputTypeNumber.value = this.inputTypeRange.value;
        });

        const style = document.createElement("style");
        style.innerHTML = `
        .contain {
            display: flex;
            flex-direction: column;
            width: 100%;
            border-radius: 5px;
            padding: 1rem;
        }
        #in-number {
            outline: 1px solid #f2f3f5;
        }

        #slider {
            -webkit-appearance: none;
            width: 100%;
            height: 10px;
            background: #ffffff;
            outline: 1px solid #dcdee0;
            -webkit-transition: .2s;
            transition: opacity .2s;
            z-index: 5;
            position: relative;
            margin-bottom: 1.5rem;
            border-radius: 1px;

        }
        #slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 30px;
            height: 20px;
            background: #dcdee0;
            cursor: pointer;
            border-radius: 1px;
        }

        #slider::-moz-range-thumb {
            width: 30px;
            height: 20px;
            background: #dcdee0;
            cursor: pointer;
            border-radius: 3px;
        }
        `;
        
        this.contain.appendChild(this.inputTypeRange);
        this.contain.appendChild(this.inputTypeNumber);
        this.shadowRoot.appendChild(this.contain);
        this.shadowRoot.appendChild(style);

    }
}

customElements.define("range-slider", RangeSlider);