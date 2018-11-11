const pug = require("pug");

class Element {
    constructor(type, data) {
        this.type = type;
        this.data = data;
        this.template = '';

        this.createTemplate();
    }

    createTemplate() {
        this.template += (`${this.type}(`);

        for (let elem in this.data) {
            if (this.data.hasOwnProperty(elem)) {
                this.template += `${elem}="${this.data[elem]}", `;
            }
        }

        this.template += `) #{value}`;
    }

    render(value) {
        return pug.render(this.template, {
            value
        });
    }

}

console.log(new Element('p', {
    style: 'color: red',
    float: 'left'
}).render('testValue'));

console.log(new Element('span', {
    style: 'color: green; border: 1px solid red',
    float: 'right'
}).render('anotherTestValue'));

module.exports = Element;