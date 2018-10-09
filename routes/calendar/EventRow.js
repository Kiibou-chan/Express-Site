class EventRow {
    constructor(descriptor, args) {
        this.pre = {
            elemType: 'span',
            value: `${descriptor}:`
        };

        switch (args.elemType) {
            case 'span':
                this.value = {
                    elemType: 'span',
                    value: args.value || ''
                }
                break;
            case 'p':
                this.value = {
                    elemType: 'p',
                    value: args.value || ''
                }
                break;
            case 'input':
                this.value = {
                    elemType: 'input',
                    type: args.type,
                    placeholder: args.placeholder || descriptor,
                    name: args.name || descriptor.toLowerCase(),
                    value: args.value || '',
                    required: args.required || false
                }
                break;
            case 'textarea':
                this.value = {
                    elemType: 'textarea',
                    cols: args.cols || '30',
                    rows: args.rows || '1',
                    placeholder: args.placeholder || descriptor,
                    name: args.name || descriptor.toLowerCase(),
                    value: args.value || '',
                    required: args.required || false
                }
                break;
            default:
                this.value = {
                    elemType: 'span',
                    value: 'error'
                }
                break;
        }
    }
}

module.exports = EventRow;