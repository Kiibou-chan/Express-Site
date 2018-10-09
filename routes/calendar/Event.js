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
                    required: rowData.required,
                    name: rowData.name
                });
            case 'details':
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
                    required: rowData.required,
                    name: rowData.name
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
                name: 'name',
                elemType: 'input',
                placeholder: 'Event Name',
                required: true
            },
            {
                descriptor: 'Time Start',
                value: values.timeStart || '',
                name: 'timeStart',
                elemType: 'input',
                type: 'time',
                placeholder: 'Time Start',
                required: true
            },
            {
                descriptor: 'Time End',
                value: values.timeEnd || '',
                name: 'timeEnd',
                elemType: 'input',
                type: 'time',
                placeholder: 'Time End'
            },
            {
                descriptor: 'Date Start',
                value: values.dateStart || '',
                name: 'dateStart',
                elemType: 'input',
                type: 'date',
                placeholder: 'Date Start',
                required: true
            },
            {
                descriptor: 'Date End',
                value: values.dateEnd || '',
                name: 'dateEnd',
                elemType: 'input',
                type: 'date',
                placeholder: 'Date End'
            },
            {
                descriptor: 'Details',
                value: values.details || '',
                name: 'details',
                elemType: 'textarea',
                placeholder: 'Event Details'
            },
        ]
    }
}

module.exports = Event;
