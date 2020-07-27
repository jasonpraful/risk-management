import React, { Component } from "react";
import ReactTable from "react-table-6";
import '../../node_modules/react-table-6/react-table.css'

class Table extends Component {
  render() {
    

    return (
      <div>
        <ReactTable
          data={this.props.data}
          columns={this.props.columns}
          pageSizeOptions={[5, 30, 50]}
          filterable={true}
          onFilteredChange={(filtered) => this.setState({ filtered })}
          defaultPageSize={5}
          className="-striped "
        />
      </div>
    );
  }
}
export default Table;
