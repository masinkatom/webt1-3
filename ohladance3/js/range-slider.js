class RangeSlider extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: "open"});

        this.minimal = this.getAttribute("minimal");
        this.maximal = this.getAttribute("maximal");

        this.contain = document.createElement("div");
        this.contain.className = "contain";

        this.inputTypeNumber = document.createElement("input");
        this.inputTypeNumber.type = "number";
        this.inputTypeNumber.setAttribute("min", this.minimal);
        this.inputTypeNumber.setAttribute("max", this.maximal);

        this.inputTypeRange = document.createElement("input");
        this.inputTypeRange.type = "range";

        const style = document.createElement("style");
        style.innerHTML = `.contain 
        {width: 15rem;border-radius: 5px;padding: 1rem;}`;
        this.contain.appendChild(this.inputTypeNumber);
        this.contain.appendChild(this.inputTypeRange);
        this.shadowRoot.appendChild(this.contain);
        this.shadowRoot.appendChild(style);

    }
}

customElements.define("range-slider", RangeSlider);