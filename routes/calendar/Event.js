const EventRow = require('./EventRow');

class Event {
    constructor(id, type, rowValues) {
        this._id = id;

        this.rows = this.createRows(type, this.rowsData(rowValues));
    }

    createRows(type, rowsData) {
        let rows = [];

        for (let rowData of rowsData) {
            rows.push(this.createRow(type, rowData));
        }

        return rows;
    }

    createRow(type, rowData) {
        switch (type) {
            case 'create':
                return new EventRow(rowData.descriptor, {
                    elemType: rowData.elemType,
                    type: rowData.type,
                    placeholder: rowData.placeholder,
                    required: rowData.require
                });
            case 'details':
            console.log('test');
                return new EventRow(rowData.descriptor, {
                    elemType: 'p',
                    value: rowData.value
                });
            case 'edit':
                return new EventRow(rowData.descriptor, {
                    elemType: rowData.elemType,
                    value: rowData.value,
                    type: rowData.type,
                    placeholder: rowData.placeholder,
                    required: rowData.required
                });
            case 'delete':
                return new EventRow(rowData.descriptor, {
                    elemType: 'p',
                    value: rowData.value
                });
        }
    }
    
    rowsData(values) {
        return [{
                descriptor: 'Name',
                value: values.name || '',
                elemType: 'input',
                placeholder: 'Event Name',
                required: true
            },
            {
                descriptor: 'Time',
                value: values.time || '',
                elemType: 'input',
                type: 'time',
                placeholder: 'Time',
                required: true
            },
            {
                descriptor: 'Details',
                value: values.details || '',
                elemType: 'textarea',
                placeholder: 'Event Details'
            },
        ]
    }
}

module.exports = Event;
